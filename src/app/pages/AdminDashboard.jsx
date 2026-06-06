import { Users, Store, Calendar, FileText, TrendingUp, IndianRupee } from "lucide-react";
import { GlassCard } from "../components/GlassCard.jsx";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "25,348", change: "+15%", icon: Users, color: "#D4AF37" },
    { label: "Active Providers", value: "523", change: "+8%", icon: Store, color: "#10b981" },
    { label: "Total Bookings", value: "12,456", change: "+23%", icon: Calendar, color: "#f59e0b" },
    { label: "AI Reports", value: "10,234", change: "+31%", icon: FileText, color: "#3b82f6" },
    { label: "Revenue", value: "\u20B945.2L", change: "+18%", icon: IndianRupee, color: "#D4AF37" },
    { label: "Growth Rate", value: "23%", change: "+5%", icon: TrendingUp, color: "#10b981" }
  ];
  const monthlyData = [
    { month: "Jan", users: 1200, providers: 45, bookings: 890 },
    { month: "Feb", users: 1800, providers: 52, bookings: 1120 },
    { month: "Mar", users: 2100, providers: 61, bookings: 1340 },
    { month: "Apr", users: 2600, providers: 78, bookings: 1680 },
    { month: "May", users: 3100, providers: 89, bookings: 2010 },
    { month: "Jun", users: 3800, providers: 103, bookings: 2450 }
  ];
  const categoryData = [
    { name: "Ceramic Coating", value: 35 },
    { name: "PPF", value: 25 },
    { name: "Paint Correction", value: 20 },
    { name: "Interior", value: 15 },
    { name: "Others", value: 5 }
  ];
  const COLORS = ["#D4AF37", "#FFD700", "#B8860B", "#DAA520", "#8B7355"];
  const recentActivity = [
    { type: "New User", description: "Rohit Sharma joined the platform", time: "5 min ago" },
    { type: "New Booking", description: "Ceramic coating booked by Priya Mehta", time: "12 min ago" },
    { type: "New Provider", description: "Elite Auto Detailing verified", time: "1 hour ago" },
    { type: "AI Report", description: "Vehicle inspection completed", time: "2 hours ago" }
  ];
  return <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Admin <span className="text-[#D4AF37]">Dashboard</span>
          </h1>
          <p className="text-xl text-white/60">Platform overview and management</p>
        </div>

        {
    /* Stats Grid */
  }
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {stats.map((stat) => <GlassCard key={stat.label} className="p-6">
              <stat.icon className="w-6 h-6 mb-3" style={{ color: stat.color }} />
              <div className="text-2xl mb-1" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/60 mb-2">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </GlassCard>)}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {
    /* Growth Chart */
  }
          <GlassCard className="p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Platform <span className="text-[#D4AF37]">Growth</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#D4AF37" strokeWidth={2} />
                <Line type="monotone" dataKey="providers" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {
    /* Service Distribution */
  }
          <GlassCard className="p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Service <span className="text-[#D4AF37]">Distribution</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
    data={categoryData}
    cx="50%"
    cy="50%"
    labelLine={false}
    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
    outerRadius={100}
    fill="#8884d8"
    dataKey="value"
  >
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }} />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {
    /* Recent Activity */
  }
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h3 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Recent <span className="text-[#D4AF37]">Activity</span>
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2" />
                    <div className="flex-1">
                      <div className="text-sm text-[#D4AF37] mb-1">{activity.type}</div>
                      <div className="text-white/80 mb-1">{activity.description}</div>
                      <div className="text-xs text-white/40">{activity.time}</div>
                    </div>
                  </div>)}
              </div>
            </GlassCard>
          </div>

          {
    /* Quick Actions */
  }
          <GlassCard className="p-6">
            <h3 className="text-xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Quick <span className="text-[#D4AF37]">Actions</span>
            </h3>
            <div className="space-y-3">
              {[
    "Manage Users",
    "Verify Providers",
    "Review Bookings",
    "Moderate Community",
    "View Analytics",
    "System Settings"
  ].map((action) => <button
    key={action}
    className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
  >
                  {action}
                </button>)}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>;
}
export {
  AdminDashboard
};
