
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Building, DollarSign, Bell, Mail, Smartphone, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [pharmacySettings, setPharmacySettings] = useState({
    name: "PharmaCare Pharmacy",
    address: "123 Medical Street, Healthcare City, HC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@pharmacare.com",
    license: "PH-2024-001",
    logo: ""
  });

  const [currencySettings, setCurrencySettings] = useState({
    currency: "USD",
    taxRate: 8.5,
    discountLimit: 10,
    roundingMethod: "nearest"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    expiryAlert: true,
    emailNotifications: true,
    smsNotifications: false,
    monthlyReports: true,
    lowStockThreshold: 10,
    expiryAlertDays: 30
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    invoicePrefix: "INV",
    receiptPrefix: "REC",
    showLogo: true,
    showBarcode: true,
    printFooter: "Thank you for choosing PharmaCare!",
    autoGenerateReceipt: true
  });

  const [systemSettings, setSystemSettings] = useState({
    backupFrequency: "daily",
    sessionTimeout: 30,
    enableAuditLog: true,
    requirePasswordChange: false,
    passwordExpiryDays: 90
  });

  const handleSavePharmacySettings = () => {
    toast({
      title: "Success",
      description: "Pharmacy settings saved successfully",
    });
  };

  const handleSaveCurrencySettings = () => {
    toast({
      title: "Success",
      description: "Currency and tax settings saved successfully",
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Success",
      description: "Notification settings saved successfully",
    });
  };

  const handleSaveInvoiceSettings = () => {
    toast({
      title: "Success",
      description: "Invoice settings saved successfully",
    });
  };

  const handleSaveSystemSettings = () => {
    toast({
      title: "Success",
      description: "System settings saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pharmacy Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Pharmacy Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pharmacyName">Pharmacy Name</Label>
              <Input
                id="pharmacyName"
                value={pharmacySettings.name}
                onChange={(e) => setPharmacySettings({...pharmacySettings, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={pharmacySettings.address}
                onChange={(e) => setPharmacySettings({...pharmacySettings, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={pharmacySettings.phone}
                onChange={(e) => setPharmacySettings({...pharmacySettings, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={pharmacySettings.email}
                onChange={(e) => setPharmacySettings({...pharmacySettings, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                value={pharmacySettings.license}
                onChange={(e) => setPharmacySettings({...pharmacySettings, license: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-2">
                <Input id="logo" type="file" accept="image/*" />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button onClick={handleSavePharmacySettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Pharmacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Currency & Tax Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Currency & Tax Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currencySettings.currency}
                onChange={(e) => setCurrencySettings({...currencySettings, currency: e.target.value})}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.1"
                value={currencySettings.taxRate}
                onChange={(e) => setCurrencySettings({...currencySettings, taxRate: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="discountLimit">Maximum Discount (%)</Label>
              <Input
                id="discountLimit"
                type="number"
                value={currencySettings.discountLimit}
                onChange={(e) => setCurrencySettings({...currencySettings, discountLimit: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="roundingMethod">Rounding Method</Label>
              <select
                id="roundingMethod"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currencySettings.roundingMethod}
                onChange={(e) => setCurrencySettings({...currencySettings, roundingMethod: e.target.value})}
              >
                <option value="nearest">Nearest</option>
                <option value="up">Round Up</option>
                <option value="down">Round Down</option>
              </select>
            </div>
            <Button onClick={handleSaveCurrencySettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Currency Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lowStockAlert">Low Stock Alerts</Label>
              <Switch
                id="lowStockAlert"
                checked={notificationSettings.lowStockAlert}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockAlert: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="expiryAlert">Expiry Alerts</Label>
              <Switch
                id="expiryAlert"
                checked={notificationSettings.expiryAlert}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, expiryAlert: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
              />
            </div>
            <div>
              <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                value={notificationSettings.lowStockThreshold}
                onChange={(e) => setNotificationSettings({...notificationSettings, lowStockThreshold: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="expiryAlertDays">Expiry Alert Days</Label>
              <Input
                id="expiryAlertDays"
                type="number"
                value={notificationSettings.expiryAlertDays}
                onChange={(e) => setNotificationSettings({...notificationSettings, expiryAlertDays: parseInt(e.target.value)})}
              />
            </div>
            <Button onClick={handleSaveNotificationSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Invoice & Receipt Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
              <Input
                id="invoicePrefix"
                value={invoiceSettings.invoicePrefix}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, invoicePrefix: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="receiptPrefix">Receipt Prefix</Label>
              <Input
                id="receiptPrefix"
                value={invoiceSettings.receiptPrefix}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, receiptPrefix: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showLogo">Show Logo on Receipts</Label>
              <Switch
                id="showLogo"
                checked={invoiceSettings.showLogo}
                onCheckedChange={(checked) => setInvoiceSettings({...invoiceSettings, showLogo: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showBarcode">Show Barcode</Label>
              <Switch
                id="showBarcode"
                checked={invoiceSettings.showBarcode}
                onCheckedChange={(checked) => setInvoiceSettings({...invoiceSettings, showBarcode: checked})}
              />
            </div>
            <div>
              <Label htmlFor="printFooter">Print Footer</Label>
              <Input
                id="printFooter"
                value={invoiceSettings.printFooter}
                onChange={(e) => setInvoiceSettings({...invoiceSettings, printFooter: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoGenerateReceipt">Auto Generate Receipt</Label>
              <Switch
                id="autoGenerateReceipt"
                checked={invoiceSettings.autoGenerateReceipt}
                onCheckedChange={(checked) => setInvoiceSettings({...invoiceSettings, autoGenerateReceipt: checked})}
              />
            </div>
            <Button onClick={handleSaveInvoiceSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Invoice Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select
                id="backupFrequency"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={systemSettings.backupFrequency}
                onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="passwordExpiryDays">Password Expiry (days)</Label>
              <Input
                id="passwordExpiryDays"
                type="number"
                value={systemSettings.passwordExpiryDays}
                onChange={(e) => setSystemSettings({...systemSettings, passwordExpiryDays: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableAuditLog">Enable Audit Log</Label>
              <Switch
                id="enableAuditLog"
                checked={systemSettings.enableAuditLog}
                onCheckedChange={(checked) => setSystemSettings({...systemSettings, enableAuditLog: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requirePasswordChange">Require Regular Password Change</Label>
              <Switch
                id="requirePasswordChange"
                checked={systemSettings.requirePasswordChange}
                onCheckedChange={(checked) => setSystemSettings({...systemSettings, requirePasswordChange: checked})}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveSystemSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
