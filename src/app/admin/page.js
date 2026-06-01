import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/data/categories";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { PackageIcon, BanknotesIcon, SettingsSliderIcon, ClockIcon, UploadIcon, ClipboardIcon, ChartPieIcon } from "@/components/icons";

export const metadata = { title: "Admin Dashboard — RESORB" };

const STATUS_COLORS = {
  DELIVERED: "bg-green-100 text-green-700",
  PICKED_UP: "bg-blue-100 text-blue-700",
  ORDER_CONFIRMED: "bg-amber-100 text-amber-700",
};

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("resorb_admin_session");
  if (!session) {
    redirect("/admin/login");
  }

  const [{ data: rawOrders }, dbProducts] = await Promise.all([
    supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }),
    getAllProducts(),
  ]);
  const orders = (rawOrders || []).map(order => ({
    ...order,
    customerName: order.customer_name,
    createdAt: order.created_at,
    updatedAt: order.updated_at
  }));
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "ORDER_CONFIRMED").length;

  const stats = [
    { label: "Total Orders", value: orders.length.toString(), change: "All time", icon: <PackageIcon className="w-6 h-6 text-blue-600" /> },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "All time", icon: <BanknotesIcon className="w-6 h-6 text-green-600" /> },
    { label: "Products", value: dbProducts.length.toString(), change: `${categories.length} categories`, icon: <SettingsSliderIcon className="w-6 h-6 text-purple-600" /> },
    { label: "Pending Shipments", value: pendingOrders.toString(), change: "Needs action", icon: <ClockIcon className="w-6 h-6 text-amber-600" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">RESORB Operations Panel</p>
        </div>
        <Link
          href="/admin/products/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          + Upload Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs text-gray-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-blue-600 hover:text-blue-700">View all →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500">Order</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500">Customer</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 hidden md:table-cell">Items</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500">Total</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500">Status</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs font-medium text-gray-800">{order.id}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-800">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.phone}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-600 max-w-[180px] truncate">{order.items.length} items</p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₹{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                          {order.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://wa.me/91${order.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 hover:text-green-700"
                        >
                          Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions + Product inventory */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Upload Product", icon: <UploadIcon className="w-4 h-4" />, href: "/admin/products/upload" },
                { label: "Manage products", icon: <SettingsSliderIcon className="w-4 h-4" />, href: "/admin/products" },
                { label: "View all orders", icon: <ClipboardIcon className="w-4 h-4" />, href: "/admin/orders" },
                { label: "Sales report", icon: <ChartPieIcon className="w-4 h-4" />, href: "/admin/reports" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-colors font-medium"
                >
                  <span className="text-gray-400 group-hover:text-blue-500">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Category stock */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Products by Category</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    {cat.name}
                  </span>
                  <span className="font-medium text-gray-900 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {cat.productCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
