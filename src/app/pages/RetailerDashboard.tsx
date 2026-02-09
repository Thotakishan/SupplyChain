import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Store, Package, ShieldCheck, AlertTriangle, Scan, CheckCircle, Calendar, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Progress } from "../components/ui/progress";

const receivedProducts = [
  { id: "REC-001", batch: "BATCH-2026-001", product: "Amoxicillin 500mg", from: "MediDist Corp", quantity: 2500, received: "2026-02-03", expiry: "2028-01-15", verified: true },
  { id: "REC-002", batch: "BATCH-2026-003", product: "Paracetamol 500mg", from: "HealthCare Plus", quantity: 5000, received: "2026-02-04", expiry: "2027-08-01", verified: true },
  { id: "REC-003", batch: "BATCH-2026-002", product: "Ibuprofen 200mg", from: "MediDist Corp", quantity: 3000, received: "2026-02-05", expiry: "2027-06-20", verified: false },
];

const stockLevels = [
  { category: "Antibiotics", current: 12500, optimal: 15000 },
  { category: "Analgesics", current: 18000, optimal: 20000 },
  { category: "Cardiovascular", current: 8500, optimal: 10000 },
  { category: "Diabetes", current: 14000, optimal: 15000 },
];

const expiryData = [
  { status: "Good (>6 months)", value: 65 },
  { status: "Warning (3-6 months)", value: 25 },
  { status: "Critical (<3 months)", value: 10 },
];

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const salesData = [
  { day: "Mon", sales: 145 },
  { day: "Tue", sales: 168 },
  { day: "Wed", sales: 152 },
  { day: "Thu", sales: 189 },
  { day: "Fri", sales: 201 },
  { day: "Sat", sales: 178 },
  { day: "Sun", sales: 134 },
];

export default function RetailerDashboard() {
  return (
    <DashboardLayout
      title="Retailer / Hospital Dashboard"
      userRole="Product Verification & Inventory"
      icon={<Store className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">Current Stock</CardTitle>
              <div className="bg-sky-500 p-2 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky-900">53K</div>
              <p className="text-xs text-sky-600 mt-1">Units available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-teal-900">Verified Batches</CardTitle>
              <div className="bg-teal-500 p-2 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-900">147</div>
              <p className="text-xs text-teal-600 mt-1">Authenticated products</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Expiry Alerts</CardTitle>
              <div className="bg-orange-500 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">8</div>
              <p className="text-xs text-orange-600 mt-1">Items near expiry</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-pink-900">Weekly Sales</CardTitle>
              <div className="bg-pink-500 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-900">1,167</div>
              <p className="text-xs text-pink-600 mt-1">Units sold</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="received" className="space-y-4">
          <TabsList>
            <TabsTrigger value="received">Received Products</TabsTrigger>
            <TabsTrigger value="verify">Verify Authenticity</TabsTrigger>
            <TabsTrigger value="stock">Stock Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Received Products */}
          <TabsContent value="received" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Received Products</CardTitle>
                <CardDescription>Manage incoming inventory and verify authenticity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Receipt ID</TableHead>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Received Date</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receivedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-sm">{product.id}</TableCell>
                        <TableCell className="font-mono text-sm">{product.batch}</TableCell>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.from}</TableCell>
                        <TableCell>{product.quantity.toLocaleString()}</TableCell>
                        <TableCell>{product.received}</TableCell>
                        <TableCell>{product.expiry}</TableCell>
                        <TableCell>
                          {product.verified ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-orange-600">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verify Authenticity */}
          <TabsContent value="verify" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verify Product Authenticity</CardTitle>
                <CardDescription>Scan QR code or enter batch number to verify product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input placeholder="Enter Batch Number" className="flex-1" />
                  <Button>
                    Verify
                  </Button>
                  <Button variant="outline">
                    <Scan className="h-4 w-4 mr-2" />
                    Scan QR
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                  <div className="text-center">
                    <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold text-lg mb-2">Verify Product Authenticity</h3>
                    <p className="text-gray-600 mb-4">Scan the QR code on the product packaging or enter the batch number above</p>
                    <div className="bg-white rounded-lg p-4 inline-block border">
                      <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center">
                        <Scan className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Verification Benefits</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Confirm product authenticity and prevent counterfeit</li>
                          <li>• Track complete supply chain history</li>
                          <li>• Verify manufacturer, batch, and expiry details</li>
                          <li>• Ensure regulatory compliance (FDA/WHO)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stock Management */}
          <TabsContent value="stock" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Levels by Category</CardTitle>
                <CardDescription>Monitor inventory levels across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockLevels.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-gray-600">
                          {item.current.toLocaleString()} / {item.optimal.toLocaleString()} units
                        </span>
                      </div>
                      <Progress value={(item.current / item.optimal) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Expiry Status</CardTitle>
                  <CardDescription>Distribution of products by expiry timeline</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={expiryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ status, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expiryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common inventory tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Stock Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View Expiry Alerts
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Request Restock
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Compliance Check
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Sales Performance</CardTitle>
                <CardDescription>Daily sales units over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}