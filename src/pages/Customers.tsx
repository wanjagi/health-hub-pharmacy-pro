
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Phone, Mail, MapPin, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  emergencyContact: string;
  allergies: string;
  registrationDate: string;
  totalPurchases: number;
  status: "Active" | "Inactive";
}

const Customers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      emergencyContact: "+1 (555) 987-6543",
      allergies: "Penicillin",
      registrationDate: "2023-01-15",
      totalPurchases: 1250.75,
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Somewhere, ST 67890",
      dateOfBirth: "1990-07-22",
      gender: "Female",
      emergencyContact: "+1 (555) 876-5432",
      allergies: "None",
      registrationDate: "2023-03-20",
      totalPurchases: 890.50,
      status: "Active"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Rd, Elsewhere, ST 13579",
      dateOfBirth: "1978-11-08",
      gender: "Male",
      emergencyContact: "+1 (555) 765-4321",
      allergies: "Aspirin, Shellfish",
      registrationDate: "2022-12-10",
      totalPurchases: 2150.25,
      status: "Active"
    }
  ]);

  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    allergies: "",
    status: "Active"
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const customer: Customer = {
      id: customers.length + 1,
      ...newCustomer as Customer,
      registrationDate: new Date().toISOString().split('T')[0],
      totalPurchases: 0
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      emergencyContact: "",
      allergies: "",
      status: "Active"
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Customer added successfully",
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={newCustomer.dateOfBirth}
                  onChange={(e) => setNewCustomer({...newCustomer, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newCustomer.gender}
                  onChange={(e) => setNewCustomer({...newCustomer, gender: e.target.value})}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={newCustomer.emergencyContact}
                  onChange={(e) => setNewCustomer({...newCustomer, emergencyContact: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="e.g., Penicillin, Peanuts (leave blank if none)"
                  value={newCustomer.allergies}
                  onChange={(e) => setNewCustomer({...newCustomer, allergies: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Directory
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <p className="text-sm text-gray-600">
                        {customer.dateOfBirth && `Age: ${calculateAge(customer.dateOfBirth)}`}
                        {customer.gender && ` • ${customer.gender}`}
                      </p>
                    </div>
                    <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                      {customer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-xs leading-relaxed">{customer.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Registered: {customer.registrationDate}</span>
                    </div>
                    {customer.allergies && (
                      <div className="text-sm">
                        <span className="font-medium text-red-600">Allergies:</span>
                        <span className="ml-1 text-red-700">{customer.allergies}</span>
                      </div>
                    )}
                    <div className="text-sm pt-2 border-t">
                      <span className="font-medium">Total Purchases: </span>
                      <span className="text-green-600">${customer.totalPurchases.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      View History
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
