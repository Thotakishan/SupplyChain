import DashboardLayout from "../components/DashboardLayout.jsx";
import "../../styles/dashboards.css";
import "../../styles/dashboards.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Shield, FileText, AlertCircle, TrendingUp, Download, Search, CheckCircle, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";

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
      <div className="manufacturer-dashboard">
        {/* Stats Cards */}
        <div className="manufacturer-stats-row">
          <Card className="manufacturer-stat-card manufacturer-stat-card--production">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--emerald">Overall Compliance</CardTitle>
              <div className="stat-card-icon stat-card-icon-emerald">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--emerald">99.5%</div>
              <p className="stat-card-subtext stat-card-subtext--emerald">
                <TrendingUp className="stat-card-trend-icon" />
                +0.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--batches">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--blue">Active Entities</CardTitle>
              <div className="stat-card-icon stat-card-icon-blue">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--blue">347</div>
              <p className="stat-card-subtext stat-card-subtext--blue">Monitored organizations</p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--distributor-amber">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--amber">Active Alerts</CardTitle>
              <div className="stat-card-icon stat-card-icon-amber">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--amber">12</div>
              <p className="stat-card-subtext stat-card-subtext--amber">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="manufacturer-stat-card manufacturer-stat-card--distributor-purple">
            <CardHeader className="stat-card-header">
              <CardTitle className="stat-card-title manufacturer-stat-card__title--purple">Audits This Month</CardTitle>
              <div className="stat-card-icon stat-card-icon-violet">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="stat-card-body">
              <div className="stat-card-value stat-card-value--purple">48</div>
              <p className="stat-card-subtext stat-card-subtext--purple">28 completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="manufacturer-tabs">
          <TabsList className="manufacturer-tabs-list">
            <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
            <TabsTrigger value="audits">Audit Records</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
            <TabsTrigger value="reports">Generate Reports</TabsTrigger>
          </TabsList>

          {/* Compliance Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="manufacturer-batches-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="manufacturer-batches-card">
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

                <Card className="manufacturer-batches-card">
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
            </div>

            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>
          </TabsContent>

          {/* Audit Records */}
          <TabsContent value="audits" className="space-y-4">
            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>
          </TabsContent>

          {/* Traceability */}
          <TabsContent value="traceability" className="space-y-4">
            <div className="manufacturer-batches-full">
              <Card className="manufacturer-batches-card">
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
            </div>

            <div className="manufacturer-batches-full">
              <Card className="bg-blue-50 border-blue-200 manufacturer-batches-card">
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
            </div>
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
