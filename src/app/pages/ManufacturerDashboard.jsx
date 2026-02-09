import DashboardLayout from "../components/DashboardLayout.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Factory, Package, TrendingUp, AlertCircle, Plus, QrCode, Calendar, MapPin } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { QRCodeDialog } from "../components/QRCodeDialog.jsx";
import { useState } from "react";

const productionData = [
  { month: "Jan", units: 12000 },
  { month: "Feb", units: 15000 },
  { month: "Mar", units: 18000 },
  { month: "Apr", units: 16000 },
  { month: "May", units: 21000 },
  { month: "Jun", units: 24000 },
];

const distributionData = [
  { name: "Distributors", value: 45 },
  { name: "Hospitals", value: 30 },
  { name: "Retailers", value: 25 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

const batches = [
  { id: "BATCH-2026-001", product: "Amoxicillin 500mg", quantity: 10000, status: "Active", mfgDate: "2026-01-15", expiry: "2028-01-15", destination: "MediDist Corp" },
  { id: "BATCH-2026-002", product: "Ibuprofen 200mg", quantity: 15000, status: "In Transit", mfgDate: "2026-01-20", expiry: "2027-06-20", destination: "HealthCare Plus" },
  { id: "BATCH-2026-003", product: "Paracetamol 500mg", quantity: 20000, status: "Active", mfgDate: "2026-02-01", expiry: "2027-08-01", destination: "Wellness Pharmacy" },
  { id: "BATCH-2026-004", product: "Aspirin 100mg", quantity: 8000, status: "Pending", mfgDate: "2026-02-03", expiry: "2028-02-03", destination: "City Hospital" },
];

export default function ManufacturerDashboard() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleQRClick = (batch) => {
    setSelectedBatch(batch);
    setQrDialogOpen(true);
  };

  return (
    <DashboardLayout
      title="Manufacturer Dashboard"
      userRole="Production & Dispatch Management"
      icon={<Factory className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Batches</CardTitle>
              <div className="bg-blue-500 p-2 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">1,247</div>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900">Active Production</CardTitle>
              <div className="bg-emerald-500 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900">24</div>
              <p className="text-xs text-emerald-600 mt-1">Lines currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-violet-900">Monthly Output</CardTitle>
              <div className="bg-violet-500 p-2 rounded-lg">
                <Factory className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-violet-900">24K</div>
              <p className="text-xs text-violet-600 mt-1">Units produced</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-900">Compliance Rate</CardTitle>
              <div className="bg-indigo-500 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900">99.8%</div>
              <p className="text-xs text-indigo-600 mt-1">FDA/WHO compliant</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="batches" className="space-y-4">
          <TabsList>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch New Batch</TabsTrigger>
            <TabsTrigger value="analytics">Production Analytics</TabsTrigger>
          </TabsList>

          {/* Batch Management */}
          <TabsContent value="batches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Batches</CardTitle>
                <CardDescription>Track and manage your product batches</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Mfg Date</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-mono text-sm">{batch.id}</TableCell>
                        <TableCell>{batch.product}</TableCell>
                        <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                        <TableCell>{batch.mfgDate}</TableCell>
                        <TableCell>{batch.expiry}</TableCell>
                        <TableCell>{batch.destination}</TableCell>
                        <TableCell>
                          <Badge variant={batch.status === "Active" ? "default" : batch.status === "In Transit" ? "secondary" : "outline"}>
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" onClick={() => handleQRClick(batch)}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dispatch New Batch */}
          <TabsContent value="dispatch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Register & Dispatch New Batch</CardTitle>
                <CardDescription>Create a new product batch and generate tracking QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Name</Label>
                      <Input id="product" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch-id">Batch ID</Label>
                      <Input id="batch-id" placeholder="Auto-generated" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (Units)</Label>
                      <Input id="quantity" type="number" placeholder="Enter quantity" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mfg-date">Manufacturing Date</Label>
                      <Input id="mfg-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exp-date">Expiry Date</Label>
                      <Input id="exp-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="Distributor/Hospital name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Input id="description" placeholder="Additional product details" />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" className="flex-1">
                      <Plus className="mr-2 h-4 w-4" />
                      Register Batch
                    </Button>
                    <Button type="button" variant="outline">
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Production Trends</CardTitle>
                  <CardDescription>Monthly production volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="units" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Channels</CardTitle>
                  <CardDescription>Batch distribution by channel type</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {selectedBatch && (
        <QRCodeDialog
          open={qrDialogOpen}
          onOpenChange={setQrDialogOpen}
          batchId={selectedBatch.id}
          productName={selectedBatch.product}
          additionalInfo={`Expiry: ${selectedBatch.expiry}`}
        />
      )}
    </DashboardLayout>
  );
}
