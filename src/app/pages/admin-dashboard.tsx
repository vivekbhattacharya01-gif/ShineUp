import { GlassCard } from "../components/glass-card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Users, Store, Calendar, DollarSign, TrendingUp, CheckCircle, XCircle, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "50,234", icon: Users, change: "+8%", color: "text-blue-500" },
    { label: "Active Providers", value: "1,245", icon: Store, change: "+12%", color: "text-green-500" },
    { label: "Total Bookings", value: "18,456", icon: Calendar, change: "+15%", color: "text-primary" },
    { label: "Platform Revenue", value: "₹42.8L", icon: DollarSign, change: "+23%", color: "text-green-500" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 280000, bookings: 2800 },
    { month: "Feb", revenue: 320000, bookings: 3200 },
    { month: "Mar", revenue: 380000, bookings: 3650 },
    { month: "Apr", revenue: 410000, bookings: 3890 },
    { month: "May", revenue: 428000, bookings: 4120 },
  ];

  const pendingProviders = [
    { id: "1", name: "Elite Auto Care", location: "Pune", services: "Ceramic, PPF", appliedDate: "May 25, 2026" },
    { id: "2", name: "Supreme Detailing", location: "Hyderabad", services: "Paint Correction", appliedDate: "May 26, 2026" },
  ];

  const recentUsers = [
    { id: "1", name: "Amit Sharma", email: "amit@example.com", vehicles: 2, joinedDate: "May 28, 2026" },
    { id: "2", name: "Neha Gupta", email: "neha@example.com", vehicles: 1, joinedDate: "May 29, 2026" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-foreground/70">Platform overview and management</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-500">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <GlassCard className="p-6">
            <h3 className="text-lg mb-6">Revenue Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg mb-6">Monthly Bookings</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }} />
                <Bar dataKey="bookings" fill="#d4af37" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="bg-[var(--glass-bg)] border border-[var(--glass-border)]">
            <TabsTrigger value="providers">Provider Approvals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reports">AI Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="providers">
            <GlassCard className="p-6">
              <h3 className="text-lg mb-6">Pending Provider Applications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>{provider.location}</TableCell>
                      <TableCell>{provider.services}</TableCell>
                      <TableCell>{provider.appliedDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/30 text-red-500">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GlassCard>
          </TabsContent>

          <TabsContent value="users">
            <GlassCard className="p-6">
              <h3 className="text-lg mb-6">Recent Users</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vehicles</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.vehicles}</TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-primary/30">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </GlassCard>
          </TabsContent>

          <TabsContent value="bookings">
            <GlassCard className="p-8 text-center">
              <Calendar className="h-16 w-16 text-foreground/40 mx-auto mb-4" />
              <p className="text-foreground/70">All bookings management will appear here</p>
            </GlassCard>
          </TabsContent>

          <TabsContent value="reports">
            <GlassCard className="p-8 text-center">
              <TrendingUp className="h-16 w-16 text-foreground/40 mx-auto mb-4" />
              <p className="text-foreground/70">AI reports analytics will appear here</p>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
