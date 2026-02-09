import DashboardLayout from "../components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Shield, FileText, AlertCircle, TrendingUp, Download, Search, CheckCircle, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const complianceData = [
  { month: "Aug", rate: 97.5 },
  { month: "Sep", rate: 98.2 },
  { month: "Oct", rate: 97.8 },
  { month: "Nov", rate: 98.5 },
  { month: "Dec", rate: 99.1 },
  { month: "Jan", rate: 99.3 },
  { month: "Feb", rate: 99.5 },
];

const violationsData = [
  { category: "Expired Products", count: 5 },
  { category: "Missing Documentation", count: 12 },
  { category: "Temperature Breach", count: 8 },
  { category: "Counterfeit Alert", count: 2 },
  { category: "Packaging Issues", count: 6 },
];

const auditRecords = [
  { id: "AUD-001", entity: "PharmaCo Ltd", type: "Manufacturer", date: "2026-02-01", status: "Compliant", score: 98 },
  { id: "AUD-002", entity: "MediDist Corp", type: "Distributor", date: "2026-02-02", status: "Compliant", score: 96 },
  { id: "AUD-003", entity: "City Hospital", type: "Hospital", date: "2026-02-03", status: "Minor Issues", score: 92 },
  { id: "AUD-004", entity: "Wellness Pharmacy", type: "Retailer", date: "2026-02-04", status: "Compliant", score: 97 },
];

const recentAlerts = [
  { id: "ALT-001", type: "Expiry Warning", entity: "City Hospital", batch: "BATCH-2026-015", severity: "Medium", date: "2026-02-05" },
  { id: "ALT-002", type: "Counterfeit Suspicion", entity: "Unknown Distributor", batch: "BATCH-2026-032", severity: "High", date: "2026-02-05" },
  { id: "ALT-003", type: "Documentation Missing", entity: "HealthCare Plus", batch: "BATCH-2026-021", severity: "Low", date: "2026-02-04" },
];

const traceabilityRecords = [
  { batch: "BATCH-2026-001", product: "Amoxicillin 500mg", manufacturer: "PharmaCo Ltd", distributor: "MediDist Corp", retailer: "City Hospital", status: "Complete" },
  { batch: "BATCH-2026-002", product: "Ibuprofen 200mg", manufacturer: "BioPharm Corp", distributor: "HealthCare Plus", retailer: "Wellness Pharmacy", status: "Complete" },
  { batch: "BATCH-2026-003", product: "Paracetamol 500mg", manufacturer: "MediGen Inc", distributor: "MediDist Corp", retailer: "HealthPlus Clinic", status: "In Transit" },
];

export default function RegulatoryDashboard() {
  return (
    <DashboardLayout
      title="Regulatory Admin Dashboard"
      userRole="Compliance Monitoring & Reporting"
      icon={<Shield className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900">Overall Compliance</CardTitle>
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900">99.5%</div>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Active Entities</CardTitle>
              <div className="bg-blue-500 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">347</div>
              <p className="text-xs text-blue-600 mt-1">Monitored organizations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Active Alerts</CardTitle>
              <div className="bg-amber-500 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">12</div>
              <p className="text-xs text-amber-600 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-violet-900">Audits This Month</CardTitle>
              <div className="bg-violet-500 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-violet-900">48</div>
              <p className="text-xs text-violet-600 mt-1">28 completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
            <TabsTrigger value="audits">Audit Records</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
            <TabsTrigger value="reports">Generate Reports</TabsTrigger>
          </TabsList>

          {/* Compliance Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trend</CardTitle>
                  <CardDescription>System-wide compliance rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[95, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Violations by Category</CardTitle>
                  <CardDescription>Recent compliance violations breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={violationsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Active compliance alerts requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>{alert.entity}</TableCell>
                        <TableCell className="font-mono text-sm">{alert.batch}</TableCell>
                        <TableCell>
                          <Badge variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "default" : "secondary"}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Investigate
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Records */}
          <TabsContent value="audits" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Audit Records</CardTitle>
                    <CardDescription>Recent compliance audits and inspections</CardDescription>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Schedule Audit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input placeholder="Search audits..." className="flex-1" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="retailer">Retailer</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Audit ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditRecords.map((audit) => (
                      <TableRow key={audit.id}>
                        <TableCell className="font-mono text-sm">{audit.id}</TableCell>
                        <TableCell>{audit.entity}</TableCell>
                        <TableCell>{audit.type}</TableCell>
                        <TableCell>{audit.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{audit.score}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${audit.score}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={audit.status === "Compliant" ? "default" : "outline"}>
                            {audit.status === "Compliant" ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                            {audit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Traceability */}
          <TabsContent value="traceability" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Traceability</CardTitle>
                <CardDescription>Track products through the entire supply chain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input placeholder="Enter Batch ID or Product Name" className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>Distributor</TableHead>
                      <TableHead>Retailer/Hospital</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {traceabilityRecords.map((record) => (
                      <TableRow key={record.batch}>
                        <TableCell className="font-mono text-sm">{record.batch}</TableCell>
                        <TableCell>{record.product}</TableCell>
                        <TableCell>{record.manufacturer}</TableCell>
                        <TableCell>{record.distributor}</TableCell>
                        <TableCell>{record.retailer}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "Complete" ? "default" : "secondary"}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Full History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">End-to-End Traceability</h4>
                    <p className="text-sm text-blue-800">
                      Our system provides complete visibility from manufacturer to end consumer, ensuring product authenticity,
                      regulatory compliance, and patient safety at every step of the pharmaceutical supply chain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generate Reports */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Compliance Reports</CardTitle>
                <CardDescription>Create detailed reports for regulatory authorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">FDA Compliance Report</CardTitle>
                      <CardDescription>Comprehensive compliance report for FDA submission</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Report Period</label>
                        <Select defaultValue="monthly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate FDA Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">WHO Compliance Report</CardTitle>
                      <CardDescription>International compliance report for WHO standards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Report Period</label>
                        <Select defaultValue="monthly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate WHO Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">Audit Summary Report</CardTitle>
                      <CardDescription>Summary of all audits and inspections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Entity Type</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Entities</SelectItem>
                            <SelectItem value="manufacturer">Manufacturers</SelectItem>
                            <SelectItem value="distributor">Distributors</SelectItem>
                            <SelectItem value="retailer">Retailers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Audit Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">Traceability Report</CardTitle>
                      <CardDescription>Product movement and chain of custody</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Batch Selection</label>
                        <Input placeholder="Enter Batch ID or Product" />
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Trace Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}