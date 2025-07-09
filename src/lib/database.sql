
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'pharmacist', 'cashier', 'supplier')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create medicines table
CREATE TABLE medicines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  generic_name TEXT,
  batch_number TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit_price DECIMAL(10,2) NOT NULL,
  selling_price DECIMAL(10,2) NOT NULL,
  expiry_date DATE NOT NULL,
  minimum_stock INTEGER NOT NULL DEFAULT 10,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create suppliers table
CREATE TABLE suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  payment_terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sales table
CREATE TABLE sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cashier_id UUID REFERENCES user_profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sale_items table
CREATE TABLE sale_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES medicines(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Create purchases table
CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  grn_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create purchase_items table
CREATE TABLE purchase_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES medicines(id),
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  batch_number TEXT NOT NULL,
  expiry_date DATE NOT NULL
);

-- Create expenses table
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  expense_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES user_profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_medicines_name ON medicines(name);
CREATE INDEX idx_medicines_expiry ON medicines(expiry_date);
CREATE INDEX idx_medicines_quantity ON medicines(quantity);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_customers_phone ON customers(phone);

-- Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow all authenticated users to read medicines, customers, suppliers
CREATE POLICY "Authenticated users can view medicines" ON medicines
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view customers" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view suppliers" ON suppliers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin and pharmacist can modify medicines
CREATE POLICY "Admin and pharmacist can modify medicines" ON medicines
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'pharmacist')
    )
  );

-- All staff can create sales
CREATE POLICY "Staff can create sales" ON sales
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'pharmacist', 'cashier')
    )
  );

CREATE POLICY "Staff can view sales" ON sales
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'pharmacist', 'cashier')
    )
  );

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON medicines
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically deduct stock on sale
CREATE OR REPLACE FUNCTION deduct_stock_on_sale()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE medicines 
    SET quantity = quantity - NEW.quantity
    WHERE id = NEW.medicine_id;
    
    -- Check if stock goes below minimum
    IF (SELECT quantity FROM medicines WHERE id = NEW.medicine_id) < 
       (SELECT minimum_stock FROM medicines WHERE id = NEW.medicine_id) THEN
        -- Here you could trigger a notification
        NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trigger_deduct_stock 
AFTER INSERT ON sale_items
FOR EACH ROW EXECUTE FUNCTION deduct_stock_on_sale();

-- Function to add stock on purchase
CREATE OR REPLACE FUNCTION add_stock_on_purchase()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE medicines 
    SET quantity = quantity + NEW.quantity
    WHERE id = NEW.medicine_id;
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trigger_add_stock 
AFTER INSERT ON purchase_items
FOR EACH ROW EXECUTE FUNCTION add_stock_on_purchase();
