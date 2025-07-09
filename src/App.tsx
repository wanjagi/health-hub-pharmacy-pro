
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Prescriptions from "./pages/Prescriptions";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={
                <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="customers" element={<Customers />} />
              <Route path="prescriptions" element={
                <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
                  <Prescriptions />
                </ProtectedRoute>
              } />
              <Route path="sales" element={<Sales />} />
              <Route path="suppliers" element={
                <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
                  <Suppliers />
                </ProtectedRoute>
              } />
              <Route path="purchases" element={
                <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
                  <Purchases />
                </ProtectedRoute>
              } />
              <Route path="expenses" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Expenses />
                </ProtectedRoute>
              } />
              <Route path="reports" element={
                <ProtectedRoute allowedRoles={['admin', 'pharmacist']}>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
