
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
import { Plus, Search, Calendar, Package, DollarSign, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Purchase {
  id: number;
  purchaseOrderId: string;
  supplierId: number;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  status: "Pending" | "Delivered" | "Partial" | "Cancelled";
  totalAmount: number;
  items: PurchaseItem[];
}

interface PurchaseItem {
  id: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  batchNumber: string;
  expiryDate: string;
}

const Purchases = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      purchaseOrderId: "PO-2024-001",
      supplierId: 1,
      supplierName: "MedSupply Corp",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-20",
      status: "Delivered",
      totalAmount: 5250.00,
      items: [
        {
          id: 1,
          medicineName: "Paracetamol 500mg",
          quantity: 500,
          unitPrice: 2.50,
          batchNumber: "PAR001",
          expiryDate: "2025-12-31"
        },
        {
          id: 2,
          medicineName: "Amoxicillin 250mg",
          quantity: 200,
          unitPrice: 15.00,
          batchNumber: "AMX001",
          expiryDate: "2025-06-30"
        }
      ]
    },
    {
      id: 2,
      purchaseOrderId: "PO-2024-002",
      supplierId: 2,
      supplierName: "Pharma Distributors Inc",
      orderDate: "2024-01-10",
      expectedDelivery: "2024-01-15",
      status: "Pending",
      totalAmount: 3200.00,
      items: [
        {
          id: 3,
          medicineName: "Insulin Glargine",
          quantity: 50,
          unitPrice: 45.00,
          batchNumber: "INS001",
          expiryDate: "2025-08-31"
        }
      ]
    }
  ]);

  const [newPurchase, setNewPurchase] = useState<Partial<Purchase>>({
    purchaseOrderId: "",
    supplierName: "",
    orderDate: "",
    expectedDelivery: "",
    status: "Pending",
    totalAmount: 0,
    items: []
  });

  const filteredPurchases = purchases.filter(purchase =>
    purchase.purchaseOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPurchase = () => {
    if (!newPurchase.purchaseOrderId || !newPurchase.supplierName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const purchase: Purchase = {
      id: purchases.length + 1,
      ...newPurchase as Purchase,
      items: []
    };

    setPurchases([...purchases, purchase]);
    setNewPurchase({
      purchaseOrderId: "",
      supplierName: "",
      orderDate: "",
      expectedDelivery: "",
      status: "Pending",
      totalAmount: 0,
      items: []
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Purchase order created successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Partial": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate GRN
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Purchase Order</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchaseOrderId">Purchase Order ID *</Label>
                  <Input
                    id="purchaseOrderId"
                    placeholder="PO-2024-003"
                    value={newPurchase.purchaseOrderId}
                    onChange={(e) => setNewPurchase({...newPurchase, purchaseOrderId: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="supplierName">Supplier *</Label>
                  <Input
                    id="supplierName"
                    value={newPurchase.supplierName}
                    onChange={(e) => setNewPurchase({...newPurchase, supplierName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="orderDate">Order Date *</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={newPurchase.orderDate}
                    onChange={(e) => setNewPurchase({...newPurchase, orderDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={newPurchase.expectedDelivery}
                    onChange={(e) => setNewPurchase({...newPurchase, expectedDelivery: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    value={newPurchase.totalAmount}
                    onChange={(e) => setNewPurchase({...newPurchase, totalAmount: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newPurchase.status}
                    onChange={(e) => setNewPurchase({...newPurchase, status: e.target.value as Purchase["status"]})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Partial">Partial</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPurchase}>Create Purchase Order</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{purchases.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold">{purchases.filter(p => p.status === "Pending").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered Orders</p>
                <p className="text-2xl font-bold">{purchases.filter(p => p.status === "Delivered").length}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${purchases.reduce((sum, p) => sum + p.totalAmount, 0).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purchase Orders</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{purchase.purchaseOrderId}</h3>
                      <p className="text-sm text-gray-600">Supplier: {purchase.supplierName}</p>
                    </div>
                    <Badge className={getStatusColor(purchase.status)}>
                      {purchase.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{purchase.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Delivery</p>
                      <p className="font-medium">{purchase.expectedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-medium">{purchase.items.length} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium text-green-600">${purchase.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Generate GRN
                    </Button>
                    <Button size="sm" variant="outline">
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

export default Purchases;
