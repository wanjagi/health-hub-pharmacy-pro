
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  FileText,
  Calendar,
  Download
} from "lucide-react";

const Reports = () => {
  // Sample data for charts
  const salesData = [
    { month: "Jan", sales: 12000, prescriptions: 150 },
    { month: "Feb", sales: 15000, prescriptions: 180 },
    { month: "Mar", sales: 18000, prescriptions: 220 },
    { month: "Apr", sales: 14000, prescriptions: 190 },
    { month: "May", sales: 22000, prescriptions: 280 },
    { month: "Jun", sales: 25000, prescriptions: 310 },
  ];

  const categoryData = [
    { name: "Pain Relief", value: 35, sales: 8500 },
    { name: "Antibiotics", value: 25, sales: 6200 },
    { name: "Cardiovascular", value: 20, sales: 4800 },
    { name: "Diabetes", value: 12, sales: 2900 },
    { name: "Others", value: 8, sales: 1900 },
  ];

  const topMedicines = [
    { name: "Paracetamol 500mg", sales: 245, revenue: 3062.50 },
    { name: "Amoxicillin 250mg", sales: 180, revenue: 4500.00 },
    { name: "Lisinopril 10mg", sales: 165, revenue: 3093.75 },
    { name: "Metformin 500mg", sales: 142, revenue: 2130.00 },
    { name: "Atorvastatin 20mg", sales: 128, revenue: 2880.00 },
  ];

  const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea'];

  const keyMetrics = [
    {
      title: "Monthly Revenue",
      value: "$25,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Prescriptions",
      value: "310",
      change: "+18.2%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Customers",
      value: "832",
      change: "+5.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Low Stock Items",
      value: "12",
      change: "-8.3%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales & Prescription Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="sales" fill="#2563eb" name="Sales ($)" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="prescriptions" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  name="Prescriptions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Medicines */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMedicines.map((medicine, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">{medicine.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${medicine.revenue.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs">
                    Top {index + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" name="Sales ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
