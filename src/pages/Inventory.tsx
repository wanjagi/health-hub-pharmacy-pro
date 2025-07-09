
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: number;
  name: string;
  category: string;
  manufacturer: string;
  price: number;
  stock: number;
  minStock: number;
  expiryDate: string;
  batchNumber: string;
  description: string;
}

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      manufacturer: "PharmaCorp",
      price: 12.50,
      stock: 150,
      minStock: 20,
      expiryDate: "2025-12-31",
      batchNumber: "PAR001",
      description: "Pain and fever relief medication"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      manufacturer: "MediLab",
      price: 25.00,
      stock: 5,
      minStock: 20,
      expiryDate: "2025-06-15",
      batchNumber: "AMX002",
      description: "Broad-spectrum antibiotic"
    },
    {
      id: 3,
      name: "Lisinopril 10mg",
      category: "Cardiovascular",
      manufacturer: "HeartCare",
      price: 18.75,
      stock: 80,
      minStock: 25,
      expiryDate: "2026-03-20",
      batchNumber: "LIS003",
      description: "ACE inhibitor for blood pressure"
    },
  ]);

  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    name: "",
    category: "",
    manufacturer: "",
    price: 0,
    stock: 0,
    minStock: 0,
    expiryDate: "",
    batchNumber: "",
    description: ""
  });

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const medicine: Medicine = {
      id: medicines.length + 1,
      ...newMedicine as Medicine
    };

    setMedicines([...medicines, medicine]);
    setNewMedicine({
      name: "",
      category: "",
      manufacturer: "",
      price: 0,
      stock: 0,
      minStock: 0,
      expiryDate: "",
      batchNumber: "",
      description: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Medicine added successfully",
    });
  };

  const handleDeleteMedicine = (id: number) => {
    setMedicines(medicines.filter(med => med.id !== id));
    toast({
      title: "Success",
      description: "Medicine deleted successfully",
    });
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) return { status: "Low Stock", color: "destructive" };
    if (stock <= minStock * 2) return { status: "Medium", color: "secondary" };
    return { status: "In Stock", color: "default" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Medicine Name *</Label>
                <Input
                  id="name"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={newMedicine.category}
                  onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  value={newMedicine.manufacturer}
                  onChange={(e) => setNewMedicine({...newMedicine, manufacturer: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newMedicine.price}
                  onChange={(e) => setNewMedicine({...newMedicine, price: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="stock">Current Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newMedicine.stock}
                  onChange={(e) => setNewMedicine({...newMedicine, stock: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="minStock">Minimum Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newMedicine.minStock}
                  onChange={(e) => setNewMedicine({...newMedicine, minStock: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input
                  id="batchNumber"
                  value={newMedicine.batchNumber}
                  onChange={(e) => setNewMedicine({...newMedicine, batchNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newMedicine.expiryDate}
                  onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMedicine.description}
                  onChange={(e) => setNewMedicine({...newMedicine, description: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMedicine}>Add Medicine</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Medicine Inventory
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedicines.map((medicine) => {
              const stockStatus = getStockStatus(medicine.stock, medicine.minStock);
              return (
                <Card key={medicine.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">{medicine.category}</p>
                      </div>
                      <Badge variant={stockStatus.color as any}>
                        {stockStatus.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Manufacturer:</span>
                        <span className="text-sm font-medium">{medicine.manufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-sm font-medium">${medicine.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Stock:</span>
                        <span className="text-sm font-medium flex items-center gap-1">
                          {medicine.stock}
                          {medicine.stock <= medicine.minStock && (
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Batch:</span>
                        <span className="text-sm font-medium">{medicine.batchNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Expires:</span>
                        <span className="text-sm font-medium">{medicine.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleDeleteMedicine(medicine.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
