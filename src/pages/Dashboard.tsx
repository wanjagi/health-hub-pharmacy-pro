
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Medicines",
      value: "1,247",
      change: "+5.2%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Customers",
      value: "832",
      change: "+12.1%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Prescriptions Today",
      value: "47",
      change: "+8.3%",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Daily Revenue",
      value: "$3,892",
      change: "+15.7%",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  const recentActivities = [
    { id: 1, action: "New prescription added", customer: "John Doe", time: "2 min ago" },
    { id: 2, action: "Medicine restocked", item: "Paracetamol 500mg", time: "15 min ago" },
    { id: 3, action: "Sale completed", customer: "Jane Smith", time: "1 hour ago" },
    { id: 4, action: "Low stock alert", item: "Amoxicillin", time: "2 hours ago" },
  ];

  const lowStockItems = [
    { name: "Amoxicillin 250mg", stock: 5, threshold: 20 },
    { name: "Insulin Glargine", stock: 3, threshold: 10 },
    { name: "Lisinopril 10mg", stock: 8, threshold: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.customer || activity.item}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Stock: {item.stock} (Min: {item.threshold})
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
