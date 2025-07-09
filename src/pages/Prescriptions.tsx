
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
import { Plus, Search, FileText, User, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prescription {
  id: number;
  prescriptionNumber: string;
  patientName: string;
  doctorName: string;
  dateIssued: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
  }>;
  instructions: string;
  status: "Pending" | "Filled" | "Partially Filled" | "Cancelled";
  totalAmount: number;
  insurance?: string;
}

const Prescriptions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      prescriptionNumber: "RX001234",
      patientName: "John Doe",
      doctorName: "Dr. Sarah Wilson",
      dateIssued: "2024-01-15",
      medications: [
        {
          name: "Lisinopril 10mg",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          quantity: 30
        },
        {
          name: "Metformin 500mg",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "30 days",
          quantity: 60
        }
      ],
      instructions: "Take with food. Monitor blood pressure regularly.",
      status: "Filled",
      totalAmount: 45.50,
      insurance: "BlueCross"
    },
    {
      id: 2,
      prescriptionNumber: "RX001235",
      patientName: "Jane Smith",
      doctorName: "Dr. Michael Brown",
      dateIssued: "2024-01-16",
      medications: [
        {
          name: "Amoxicillin 250mg",
          dosage: "250mg",
          frequency: "Three times daily",
          duration: "7 days",
          quantity: 21
        }
      ],
      instructions: "Complete full course even if symptoms improve.",
      status: "Pending",
      totalAmount: 25.00
    },
    {
      id: 3,
      prescriptionNumber: "RX001236",
      patientName: "Robert Johnson",
      doctorName: "Dr. Emily Davis",
      dateIssued: "2024-01-17",
      medications: [
        {
          name: "Atorvastatin 20mg",
          dosage: "20mg",
          frequency: "Once daily at bedtime",
          duration: "90 days",
          quantity: 90
        }
      ],
      instructions: "Take in the evening. Follow up in 3 months for cholesterol check.",
      status: "Partially Filled",
      totalAmount: 75.25,
      insurance: "Aetna"
    }
  ]);

  const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({
    prescriptionNumber: "",
    patientName: "",
    doctorName: "",
    dateIssued: "",
    medications: [{ name: "", dosage: "", frequency: "", duration: "", quantity: 0 }],
    instructions: "",
    status: "Pending",
    totalAmount: 0,
    insurance: ""
  });

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrescription = () => {
    if (!newPrescription.prescriptionNumber || !newPrescription.patientName || !newPrescription.doctorName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const prescription: Prescription = {
      id: prescriptions.length + 1,
      ...newPrescription as Prescription,
      dateIssued: newPrescription.dateIssued || new Date().toISOString().split('T')[0]
    };

    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      prescriptionNumber: "",
      patientName: "",
      doctorName: "",
      dateIssued: "",
      medications: [{ name: "", dosage: "", frequency: "", duration: "", quantity: 0 }],
      instructions: "",
      status: "Pending",
      totalAmount: 0,
      insurance: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Prescription added successfully",
    });
  };

  const updatePrescriptionStatus = (id: number, newStatus: Prescription['status']) => {
    setPrescriptions(prescriptions.map(prescription =>
      prescription.id === id ? { ...prescription, status: newStatus } : prescription
    ));
    
    toast({
      title: "Success",
      description: `Prescription status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Filled": return "default";
      case "Pending": return "secondary";
      case "Partially Filled": return "outline";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const addMedicationField = () => {
    if (newPrescription.medications) {
      setNewPrescription({
        ...newPrescription,
        medications: [...newPrescription.medications, { name: "", dosage: "", frequency: "", duration: "", quantity: 0 }]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Prescription Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Prescription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="prescriptionNumber">Prescription Number *</Label>
                  <Input
                    id="prescriptionNumber"
                    value={newPrescription.prescriptionNumber}
                    onChange={(e) => setNewPrescription({...newPrescription, prescriptionNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={newPrescription.patientName}
                    onChange={(e) => setNewPrescription({...newPrescription, patientName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="doctorName">Doctor Name *</Label>
                  <Input
                    id="doctorName"
                    value={newPrescription.doctorName}
                    onChange={(e) => setNewPrescription({...newPrescription, doctorName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateIssued">Date Issued</Label>
                  <Input
                    id="dateIssued"
                    type="date"
                    value={newPrescription.dateIssued}
                    onChange={(e) => setNewPrescription({...newPrescription, dateIssued: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="insurance">Insurance</Label>
                  <Input
                    id="insurance"
                    value={newPrescription.insurance}
                    onChange={(e) => setNewPrescription({...newPrescription, insurance: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="totalAmount">Total Amount ($)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    value={newPrescription.totalAmount}
                    onChange={(e) => setNewPrescription({...newPrescription, totalAmount: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Medications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addMedicationField}>
                    Add Medication
                  </Button>
                </div>
                {newPrescription.medications?.map((medication, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 mb-2 p-3 border rounded">
                    <Input
                      placeholder="Medication name"
                      value={medication.name}
                      onChange={(e) => {
                        const updatedMeds = [...(newPrescription.medications || [])];
                        updatedMeds[index] = { ...updatedMeds[index], name: e.target.value };
                        setNewPrescription({...newPrescription, medications: updatedMeds});
                      }}
                    />
                    <Input
                      placeholder="Dosage"
                      value={medication.dosage}
                      onChange={(e) => {
                        const updatedMeds = [...(newPrescription.medications || [])];
                        updatedMeds[index] = { ...updatedMeds[index], dosage: e.target.value };
                        setNewPrescription({...newPrescription, medications: updatedMeds});
                      }}
                    />
                    <Input
                      placeholder="Frequency"
                      value={medication.frequency}
                      onChange={(e) => {
                        const updatedMeds = [...(newPrescription.medications || [])];
                        updatedMeds[index] = { ...updatedMeds[index], frequency: e.target.value };
                        setNewPrescription({...newPrescription, medications: updatedMeds});
                      }}
                    />
                    <Input
                      placeholder="Duration"
                      value={medication.duration}
                      onChange={(e) => {
                        const updatedMeds = [...(newPrescription.medications || [])];
                        updatedMeds[index] = { ...updatedMeds[index], duration: e.target.value };
                        setNewPrescription({...newPrescription, medications: updatedMeds});
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={medication.quantity}
                      onChange={(e) => {
                        const updatedMeds = [...(newPrescription.medications || [])];
                        updatedMeds[index] = { ...updatedMeds[index], quantity: parseInt(e.target.value) };
                        setNewPrescription({...newPrescription, medications: updatedMeds});
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPrescription}>Add Prescription</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Prescription Records
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">#{prescription.prescriptionNumber}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {prescription.patientName}
                        </span>
                        <span>Dr. {prescription.doctorName}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {prescription.dateIssued}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(prescription.status) as any}>
                        {prescription.status}
                      </Badge>
                      <span className="font-semibold text-green-600">
                        ${prescription.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Medications:</h4>
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="font-medium">{med.name}</div>
                            <div className="text-sm text-gray-600 grid grid-cols-2 gap-2 mt-1">
                              <span>Dosage: {med.dosage}</span>
                              <span>Frequency: {med.frequency}</span>
                              <span>Duration: {med.duration}</span>
                              <span>Quantity: {med.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {prescription.instructions && (
                      <div>
                        <h4 className="font-medium mb-1">Instructions:</h4>
                        <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                          {prescription.instructions}
                        </p>
                      </div>
                    )}
                    
                    {prescription.insurance && (
                      <div className="text-sm">
                        <span className="font-medium">Insurance:</span> {prescription.insurance}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {prescription.status === "Pending" && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => updatePrescriptionStatus(prescription.id, "Filled")}
                        >
                          Mark as Filled
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updatePrescriptionStatus(prescription.id, "Partially Filled")}
                        >
                          Partially Fill
                        </Button>
                      </>
                    )}
                    {prescription.status === "Partially Filled" && (
                      <Button 
                        size="sm" 
                        onClick={() => updatePrescriptionStatus(prescription.id, "Filled")}
                      >
                        Complete Fill
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Print
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

export default Prescriptions;
