
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'pharmacist' | 'cashier' | 'supplier';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  { id: '1', email: 'admin@pharmacy.com', password: 'admin123', full_name: 'Admin User', role: 'admin' as const },
  { id: '2', email: 'pharmacist@pharmacy.com', password: 'pharma123', full_name: 'John Pharmacist', role: 'pharmacist' as const },
  { id: '3', email: 'cashier@pharmacy.com', password: 'cashier123', full_name: 'Jane Cashier', role: 'cashier' as const },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('pharmacy_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({ id: userData.id, email: userData.email });
      setProfile(userData);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        full_name: foundUser.full_name,
        role: foundUser.role
      };

      setUser({ id: foundUser.id, email: foundUser.email });
      setProfile(userData);
      localStorage.setItem('pharmacy_user', JSON.stringify(userData));

      toast({
        title: "Login Successful",
        description: "Welcome back to PharmaCare Management System",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: string): Promise<boolean> => {
    try {
      // In a real app, this would create a new user
      toast({
        title: "Registration Successful",
        description: "Account created successfully. Please login.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('pharmacy_user');

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
