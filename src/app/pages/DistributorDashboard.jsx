import DashboardLayout from "../components/DashboardLayout.jsx";
import "../../styles/dashboards.css";
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
      <div className="manufacturer-dashboard">
        {/* Stats Cards */}
        <div className="manufacturer-stats-row">
          <Card className="manufacturer-stat-card manufacturer-stat-card--distributor-cyan">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--cyan">Active Shipments</CardTitle>
              <div className="stat-card-icon stat-card-icon-cyan">
                <Truck className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--cyan">47</div>
              <p className="stat-card-subtext stat-card-subtext--cyan">12 incoming, 35 outgoing</p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--production">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--emerald">Inventory Level</CardTitle>
              <div className="stat-card-icon stat-card-icon-emerald">
                <PackageCheck className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--emerald">49K</div>
              <p className="stat-card-subtext stat-card-subtext--emerald">Units in warehouse</p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--distributor-amber">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--amber">Pending Deliveries</CardTitle>
              <div className="stat-card-icon stat-card-icon-amber">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--amber">23</div>
              <p className="stat-card-subtext stat-card-subtext--amber">Awaiting dispatch</p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--distributor-purple">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--purple">On-Time Rate</CardTitle>
              <div className="stat-card-icon stat-card-icon-purple">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--purple">96.5%</div>
              <p className="stat-card-subtext stat-card-subtext--purple">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incoming" className="manufacturer-tabs">
          <TabsList className="manufacturer-tabs-list">
            <TabsTrigger value="incoming">Incoming Shipments</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing Shipments</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="tracking">Track Shipment</TabsTrigger>
          </TabsList>

          {/* Incoming Shipments */}
          <TabsContent value="incoming" className="space-y-4">
            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>

            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>
          </TabsContent>

          {/* Outgoing Shipments */}
          <TabsContent value="outgoing" className="space-y-4">
            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>
          </TabsContent>

        {/* Inventory */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="manufacturer-batches-full">
            <Card className="manufacturer-batches-card">
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
          </div>

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
          <div className="manufacturer-batches-full">
            <Card className="manufacturer-batches-card">
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
          </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
