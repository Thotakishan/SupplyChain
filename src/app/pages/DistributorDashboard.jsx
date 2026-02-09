import DashboardLayout from "../components/DashboardLayout.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Truck, PackageCheck, PackageX, TrendingUp, Search, MapPin, Clock, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const shipmentData = [
  { day: "Mon", incoming: 45, outgoing: 38 },
  { day: "Tue", incoming: 52, outgoing: 42 },
  { day: "Wed", incoming: 48, outgoing: 45 },
  { day: "Thu", incoming: 61, outgoing: 51 },
  { day: "Fri", incoming: 55, outgoing: 49 },
  { day: "Sat", incoming: 38, outgoing: 35 },
  { day: "Sun", incoming: 28, outgoing: 25 },
];

const incomingShipments = [
  { id: "SHIP-IN-001", batch: "BATCH-2026-001", from: "PharmaCo Ltd", product: "Amoxicillin 500mg", quantity: 10000, eta: "2026-02-06", status: "In Transit" },
  { id: "SHIP-IN-002", batch: "BATCH-2026-005", from: "MediGen Inc", product: "Metformin 850mg", quantity: 15000, eta: "2026-02-07", status: "Pending" },
  { id: "SHIP-IN-003", batch: "BATCH-2026-008", from: "BioPharm Corp", product: "Lisinopril 10mg", quantity: 8000, eta: "2026-02-05", status: "Arrived" },
];

const outgoingShipments = [
  { id: "SHIP-OUT-001", batch: "BATCH-2026-001", to: "City Hospital", product: "Amoxicillin 500mg", quantity: 2500, eta: "2026-02-08", status: "In Transit" },
  { id: "SHIP-OUT-002", batch: "BATCH-2026-003", to: "Wellness Pharmacy", product: "Paracetamol 500mg", quantity: 5000, eta: "2026-02-09", status: "Processing" },
  { id: "SHIP-OUT-003", batch: "BATCH-2026-002", to: "HealthCare Plus", product: "Ibuprofen 200mg", quantity: 3000, eta: "2026-02-07", status: "Ready" },
];

const inventoryStats = [
  { week: "W1", stock: 45000 },
  { week: "W2", stock: 48000 },
  { week: "W3", stock: 52000 },
  { week: "W4", stock: 49000 },
];

export default function DistributorDashboard() {
  return (
    <DashboardLayout
      title="Distributor Dashboard"
      userRole="Shipment & Inventory Management"
      icon={<Truck className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-cyan-900">Active Shipments</CardTitle>
              <div className="bg-cyan-500 p-2 rounded-lg">
                <Truck className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-900">47</div>
              <p className="text-xs text-cyan-600 mt-1">12 incoming, 35 outgoing</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900">Inventory Level</CardTitle>
              <div className="bg-emerald-500 p-2 rounded-lg">
                <PackageCheck className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900">49K</div>
              <p className="text-xs text-emerald-600 mt-1">Units in warehouse</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Pending Deliveries</CardTitle>
              <div className="bg-amber-500 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">23</div>
              <p className="text-xs text-amber-600 mt-1">Awaiting dispatch</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">On-Time Rate</CardTitle>
              <div className="bg-purple-500 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">96.5%</div>
              <p className="text-xs text-purple-600 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="incoming">Incoming Shipments</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing Shipments</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="tracking">Track Shipment</TabsTrigger>
          </TabsList>

          {/* Incoming Shipments */}
          <TabsContent value="incoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Shipments</CardTitle>
                <CardDescription>Manage products received from manufacturers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono text-sm">{shipment.id}</TableCell>
                        <TableCell className="font-mono text-sm">{shipment.batch}</TableCell>
                        <TableCell>{shipment.from}</TableCell>
                        <TableCell>{shipment.product}</TableCell>
                        <TableCell>{shipment.quantity.toLocaleString()}</TableCell>
                        <TableCell>{shipment.eta}</TableCell>
                        <TableCell>
                          <Badge variant={shipment.status === "Arrived" ? "default" : shipment.status === "In Transit" ? "secondary" : "outline"}>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <PackageCheck className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Shipment Activity</CardTitle>
                <CardDescription>Incoming vs outgoing shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={shipmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incoming" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="outgoing" stroke="#4F46E5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outgoing Shipments */}
          <TabsContent value="outgoing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Outgoing Shipments</CardTitle>
                <CardDescription>Manage products dispatched to retailers and hospitals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outgoingShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono text-sm">{shipment.id}</TableCell>
                        <TableCell className="font-mono text-sm">{shipment.batch}</TableCell>
                        <TableCell>{shipment.to}</TableCell>
                        <TableCell>{shipment.product}</TableCell>
                        <TableCell>{shipment.quantity.toLocaleString()}</TableCell>
                        <TableCell>{shipment.eta}</TableCell>
                        <TableCell>
                          <Badge variant={shipment.status === "In Transit" ? "default" : shipment.status === "Ready" ? "secondary" : "outline"}>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Levels</CardTitle>
                <CardDescription>Current warehouse stock levels over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={inventoryStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="stock" stroke="#4F46E5" fill="#818CF8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <p className="text-xs text-gray-600 mt-1">Requires reorder</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Near Expiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <p className="text-xs text-gray-600 mt-1">Within 60 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total SKUs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-gray-600 mt-1">Different products</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Track Shipment */}
          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Track Shipment</CardTitle>
                <CardDescription>Enter shipment ID or batch number to track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter Shipment ID or Batch Number" className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>

                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="text-center text-gray-500">
                    <Truck className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Enter a shipment ID or scan QR code to view tracking details</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
