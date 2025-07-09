
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
import { Plus, Search, DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: "Cash" | "Bank Transfer" | "Credit Card" | "Cheque";
  receipt: string;
  createdBy: string;
}

interface CashFlow {
  id: number;
  type: "Cash In" | "Cash Out";
  amount: number;
  description: string;
  date: string;
  reference: string;
}

const Expenses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const [isAddCashFlowDialogOpen, setIsAddCashFlowDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("expenses");

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      category: "Utilities",
      description: "Electricity Bill - January",
      amount: 450.00,
      date: "2024-01-15",
      paymentMethod: "Bank Transfer",
      receipt: "ELEC-001",
      createdBy: "Admin"
    },
    {
      id: 2,
      category: "Office Supplies",
      description: "Printer Paper and Ink",
      amount: 125.50,
      date: "2024-01-12",
      paymentMethod: "Cash",
      receipt: "OFF-002",
      createdBy: "Admin"
    },
    {
      id: 3,
      category: "Maintenance",
      description: "AC Servicing",
      amount: 200.00,
      date: "2024-01-10",
      paymentMethod: "Cash",
      receipt: "MAINT-001",
      createdBy: "Admin"
    }
  ]);

  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    {
      id: 1,
      type: "Cash In",
      amount: 5000.00,
      description: "Daily Sales Collection",
      date: "2024-01-15",
      reference: "SALE-2024-001"
    },
    {
      id: 2,
      type: "Cash Out",
      amount: 450.00,
      description: "Electricity Bill Payment",
      date: "2024-01-15",
      reference: "EXP-001"
    },
    {
      id: 3,
      type: "Cash In",
      amount: 3200.00,
      description: "Insurance Claim Settlement",
      date: "2024-01-14",
      reference: "INS-001"
    }
  ]);

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: "",
    description: "",
    amount: 0,
    date: "",
    paymentMethod: "Cash",
    receipt: "",
    createdBy: "Admin"
  });

  const [newCashFlow, setNewCashFlow] = useState<Partial<CashFlow>>({
    type: "Cash Out",
    amount: 0,
    description: "",
    date: "",
    reference: ""
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCashIn = cashFlows.filter(cf => cf.type === "Cash In").reduce((sum, cf) => sum + cf.amount, 0);
  const totalCashOut = cashFlows.filter(cf => cf.type === "Cash Out").reduce((sum, cf) => sum + cf.amount, 0);
  const netCashFlow = totalCashIn - totalCashOut;

  const filteredExpenses = expenses.filter(expense =>
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCashFlows = cashFlows.filter(cashFlow =>
    cashFlow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cashFlow.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const expense: Expense = {
      id: expenses.length + 1,
      ...newExpense as Expense
    };

    setExpenses([...expenses, expense]);
    setNewExpense({
      category: "",
      description: "",
      amount: 0,
      date: "",
      paymentMethod: "Cash",
      receipt: "",
      createdBy: "Admin"
    });
    setIsAddExpenseDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  const handleAddCashFlow = () => {
    if (!newCashFlow.description || !newCashFlow.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const cashFlow: CashFlow = {
      id: cashFlows.length + 1,
      ...newCashFlow as CashFlow
    };

    setCashFlows([...cashFlows, cashFlow]);
    setNewCashFlow({
      type: "Cash Out",
      amount: 0,
      description: "",
      date: "",
      reference: ""
    });
    setIsAddCashFlowDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Cash flow entry added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Expense & Cash Flow Management</h1>
        <div className="flex gap-2">
          <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select
                    id="paymentMethod"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newExpense.paymentMethod}
                    onChange={(e) => setNewExpense({...newExpense, paymentMethod: e.target.value as Expense["paymentMethod"]})}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="receipt">Receipt Number</Label>
                  <Input
                    id="receipt"
                    value={newExpense.receipt}
                    onChange={(e) => setNewExpense({...newExpense, receipt: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddExpenseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense}>Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCashFlowDialogOpen} onOpenChange={setIsAddCashFlowDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Cash Flow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Cash Flow Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newCashFlow.type}
                    onChange={(e) => setNewCashFlow({...newCashFlow, type: e.target.value as CashFlow["type"]})}
                  >
                    <option value="Cash In">Cash In</option>
                    <option value="Cash Out">Cash Out</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newCashFlow.amount}
                    onChange={(e) => setNewCashFlow({...newCashFlow, amount: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    value={newCashFlow.description}
                    onChange={(e) => setNewCashFlow({...newCashFlow, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newCashFlow.date}
                    onChange={(e) => setNewCashFlow({...newCashFlow, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={newCashFlow.reference}
                    onChange={(e) => setNewCashFlow({...newCashFlow, reference: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddCashFlowDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCashFlow}>Add Cash Flow</Button>
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
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash In</p>
                <p className="text-2xl font-bold text-green-600">${totalCashIn.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cash Out</p>
                <p className="text-2xl font-bold text-red-600">${totalCashOut.toFixed(2)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netCashFlow.toFixed(2)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "expenses" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "cashflow" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveTab("cashflow")}
        >
          Cash Flow
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{activeTab === "expenses" ? "Expenses" : "Cash Flow"}</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "expenses" ? (
            <div className="space-y-4">
              {filteredExpenses.map((expense) => (
                <Card key={expense.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{expense.category}</h3>
                        <p className="text-gray-600">{expense.description}</p>
                        <p className="text-sm text-gray-500">
                          {expense.date} • {expense.paymentMethod} • Receipt: {expense.receipt}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">${expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">by {expense.createdBy}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCashFlows.map((cashFlow) => (
                <Card key={cashFlow.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={cashFlow.type === "Cash In" ? "default" : "destructive"}>
                            {cashFlow.type}
                          </Badge>
                          <h3 className="font-semibold">{cashFlow.description}</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {cashFlow.date} • Ref: {cashFlow.reference}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${cashFlow.type === "Cash In" ? "text-green-600" : "text-red-600"}`}>
                          {cashFlow.type === "Cash In" ? "+" : "-"}${cashFlow.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
