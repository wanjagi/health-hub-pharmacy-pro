
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
import { Plus, Search, Phone, Mail, MapPin, Building, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  paymentTerms: string;
  status: "Active" | "Inactive";
  totalOrders: number;
  lastOrder: string;
}

const Suppliers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "MedSupply Corp",
      email: "orders@medsupply.com",
      phone: "+1 (555) 123-4567",
      address: "123 Medical St, Healthcare City, HC 12345",
      contactPerson: "John Medical",
      paymentTerms: "Net 30",
      status: "Active",
      totalOrders: 45,
      lastOrder: "2024-01-15"
    },
    {
      id: 2,
      name: "Pharma Distributors Inc",
      email: "contact@pharmadist.com",
      phone: "+1 (555) 234-5678",
      address: "456 Supply Ave, Distribution City, DC 67890",
      contactPerson: "Sarah Johnson",
      paymentTerms: "Net 15",
      status: "Active",
      totalOrders: 32,
      lastOrder: "2024-01-10"
    },
  ]);

  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactPerson: "",
    paymentTerms: "",
    status: "Active"
  });

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.email || !newSupplier.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const supplier: Supplier = {
      id: suppliers.length + 1,
      ...newSupplier as Supplier,
      totalOrders: 0,
      lastOrder: "Never"
    };

    setSuppliers([...suppliers, supplier]);
    setNewSupplier({
      name: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
      paymentTerms: "",
      status: "Active"
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Supplier added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={newSupplier.contactPerson}
                  onChange={(e) => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newSupplier.email}
                  onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  placeholder="e.g., Net 30"
                  value={newSupplier.paymentTerms}
                  onChange={(e) => setNewSupplier({...newSupplier, paymentTerms: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newSupplier.status}
                  onChange={(e) => setNewSupplier({...newSupplier, status: e.target.value as "Active" | "Inactive"})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSupplier}>Add Supplier</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Supplier Directory
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">Contact: {supplier.contactPerson}</p>
                    </div>
                    <Badge variant={supplier.status === "Active" ? "default" : "secondary"}>
                      {supplier.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-xs leading-relaxed">{supplier.address}</span>
                    </div>
                    <div className="text-sm pt-2 border-t">
                      <div className="flex justify-between">
                        <span>Total Orders:</span>
                        <span className="font-medium">{supplier.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Order:</span>
                        <span className="font-medium">{supplier.lastOrder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Terms:</span>
                        <span className="font-medium">{supplier.paymentTerms}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Orders
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

export default Suppliers;
