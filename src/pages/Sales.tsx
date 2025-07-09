
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
import { Plus, Search, ShoppingCart, Calendar, DollarSign, Receipt, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaleItem {
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Sale {
  id: number;
  saleNumber: string;
  customerName: string;
  customerPhone: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "Cash" | "Card" | "Insurance";
  saleDate: string;
  saleTime: string;
  prescriptionNumber?: string;
  status: "Completed" | "Pending" | "Refunded";
}

const Sales = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      saleNumber: "SAL001",
      customerName: "John Doe",
      customerPhone: "+1 (555) 123-4567",
      items: [
        { medicineId: 1, medicineName: "Paracetamol 500mg", quantity: 2, unitPrice: 12.50, total: 25.00 },
        { medicineId: 2, medicineName: "Amoxicillin 250mg", quantity: 1, unitPrice: 25.00, total: 25.00 }
      ],
      subtotal: 50.00,
      tax: 4.00,
      discount: 0,
      total: 54.00,
      paymentMethod: "Card",
      saleDate: "2024-01-15",
      saleTime: "10:30 AM",
      prescriptionNumber: "RX001234",
      status: "Completed"
    },
    {
      id: 2,
      saleNumber: "SAL002",
      customerName: "Jane Smith",
      customerPhone: "+1 (555) 234-5678",
      items: [
        { medicineId: 3, medicineName: "Lisinopril 10mg", quantity: 3, unitPrice: 18.75, total: 56.25 }
      ],
      subtotal: 56.25,
      tax: 4.50,
      discount: 5.00,
      total: 55.75,
      paymentMethod: "Insurance",
      saleDate: "2024-01-16",
      saleTime: "2:15 PM",
      status: "Completed"
    }
  ]);

  const [newSale, setNewSale] = useState<Partial<Sale>>({
    saleNumber: `SAL${String(sales.length + 1).padStart(3, '0')}`,
    customerName: "",
    customerPhone: "",
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    paymentMethod: "Cash",
    prescriptionNumber: "",
    status: "Completed"
  });

  const [currentItem, setCurrentItem] = useState({
    medicineName: "",
    quantity: 1,
    unitPrice: 0
  });

  // Sample medicines for selection
  const availableMedicines = [
    { id: 1, name: "Paracetamol 500mg", price: 12.50, stock: 150 },
    { id: 2, name: "Amoxicillin 250mg", price: 25.00, stock: 5 },
    { id: 3, name: "Lisinopril 10mg", price: 18.75, stock: 80 },
    { id: 4, name: "Metformin 500mg", price: 15.00, stock: 120 },
    { id: 5, name: "Atorvastatin 20mg", price: 22.50, stock: 90 }
  ];

  const filteredSales = sales.filter(sale =>
    sale.saleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerPhone.includes(searchTerm)
  );

  const addItemToSale = () => {
    if (!currentItem.medicineName || currentItem.quantity <= 0 || currentItem.unitPrice <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all item details",
        variant: "destructive",
      });
      return;
    }

    const newItem: SaleItem = {
      medicineId: Date.now(), // Temporary ID
      medicineName: currentItem.medicineName,
      quantity: currentItem.quantity,
      unitPrice: currentItem.unitPrice,
      total: currentItem.quantity * currentItem.unitPrice
    };

    const updatedItems = [...(newSale.items || []), newItem];
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax - (newSale.discount || 0);

    setNewSale({
      ...newSale,
      items: updatedItems,
      subtotal,
      tax,
      total
    });

    setCurrentItem({
      medicineName: "",
      quantity: 1,
      unitPrice: 0
    });
  };

  const removeItemFromSale = (index: number) => {
    const updatedItems = newSale.items?.filter((_, i) => i !== index) || [];
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax - (newSale.discount || 0);

    setNewSale({
      ...newSale,
      items: updatedItems,
      subtotal,
      tax,
      total
    });
  };

  const handleCreateSale = () => {
    if (!newSale.customerName || !newSale.items || newSale.items.length === 0) {
      toast({
        title: "Error",
        description: "Please add customer details and at least one item",
        variant: "destructive",
      });
      return;
    }

    const sale: Sale = {
      id: sales.length + 1,
      ...newSale as Sale,
      saleDate: new Date().toISOString().split('T')[0],
      saleTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSales([...sales, sale]);
    setNewSale({
      saleNumber: `SAL${String(sales.length + 2).padStart(3, '0')}`,
      customerName: "",
      customerPhone: "",
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      paymentMethod: "Cash",
      prescriptionNumber: "",
      status: "Completed"
    });
    setIsNewSaleDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Sale completed successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "Pending": return "secondary";
      case "Refunded": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
        <Dialog open={isNewSaleDialogOpen} onOpenChange={setIsNewSaleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Sale</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="saleNumber">Sale Number</Label>
                  <Input
                    id="saleNumber"
                    value={newSale.saleNumber}
                    onChange={(e) => setNewSale({...newSale, saleNumber: e.target.value})}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={newSale.customerName}
                    onChange={(e) => setNewSale({...newSale, customerName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Customer Phone</Label>
                  <Input
                    id="customerPhone"
                    value={newSale.customerPhone}
                    onChange={(e) => setNewSale({...newSale, customerPhone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prescriptionNumber">Prescription Number (Optional)</Label>
                  <Input
                    id="prescriptionNumber"
                    value={newSale.prescriptionNumber}
                    onChange={(e) => setNewSale({...newSale, prescriptionNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select
                    id="paymentMethod"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newSale.paymentMethod}
                    onChange={(e) => setNewSale({...newSale, paymentMethod: e.target.value as any})}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
              </div>

              {/* Add Items Section */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Add Items</h3>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={currentItem.medicineName}
                    onChange={(e) => {
                      const selectedMed = availableMedicines.find(med => med.name === e.target.value);
                      setCurrentItem({
                        ...currentItem,
                        medicineName: e.target.value,
                        unitPrice: selectedMed?.price || 0
                      });
                    }}
                  >
                    <option value="">Select Medicine</option>
                    {availableMedicines.map((med) => (
                      <option key={med.id} value={med.name}>
                        {med.name} (Stock: {med.stock})
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Unit Price"
                    value={currentItem.unitPrice}
                    onChange={(e) => setCurrentItem({...currentItem, unitPrice: parseFloat(e.target.value) || 0})}
                  />
                  <Button onClick={addItemToSale}>Add Item</Button>
                </div>
              </div>

              {/* Items List */}
              {newSale.items && newSale.items.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Items in Sale</h3>
                  <div className="space-y-2">
                    {newSale.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex-1">
                          <span className="font-medium">{item.medicineName}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            Qty: {item.quantity} × ${item.unitPrice.toFixed(2)} = ${item.total.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeItemFromSale(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totals */}
              {newSale.items && newSale.items.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${(newSale.subtotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (8%):</span>
                        <span>${(newSale.tax || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={newSale.discount}
                          onChange={(e) => {
                            const discount = parseFloat(e.target.value) || 0;
                            const total = (newSale.subtotal || 0) + (newSale.tax || 0) - discount;
                            setNewSale({...newSale, discount, total});
                          }}
                          className="w-20 text-right"
                        />
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${(newSale.total || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsNewSaleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSale}>Complete Sale</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Sales Records
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search sales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSales.map((sale) => (
              <Card key={sale.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">#{sale.saleNumber}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{sale.customerName}</span>
                        <span>{sale.customerPhone}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {sale.saleDate} at {sale.saleTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(sale.status) as any}>
                        {sale.status}
                      </Badge>
                      <span className="font-semibold text-green-600 text-lg">
                        ${sale.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Items Sold:</h4>
                      <div className="space-y-1">
                        {sale.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                            <span>{item.medicineName}</span>
                            <span>{item.quantity} × ${item.unitPrice.toFixed(2)} = ${item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>Payment: {sale.paymentMethod}</span>
                        {sale.prescriptionNumber && (
                          <span>Prescription: {sale.prescriptionNumber}</span>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <div>Subtotal: ${sale.subtotal.toFixed(2)}</div>
                        <div>Tax: ${sale.tax.toFixed(2)}</div>
                        {sale.discount > 0 && <div>Discount: -${sale.discount.toFixed(2)}</div>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Receipt className="h-3 w-3 mr-1" />
                      Print Receipt
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {sale.status === "Completed" && (
                      <Button size="sm" variant="outline">
                        Process Refund
                      </Button>
                    )}
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

export default Sales;
