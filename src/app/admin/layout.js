import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ResorbWordmark from "@/components/ResorbWordmark";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("resorb_admin_session");

  // We are already in the admin path. 
  // We need to check if the current page is login to avoid infinite loops.
  // In Next.js App Router, layout.js wraps all children.
  // For the demo, we'll let the child components handle their own redirection if needed,
  // or we can just render the children if there's no session, assuming it's the login page.
  // Actually, a better pattern is to use a middleware, but for simplicity here we'll 
  // provide a basic layout. The login page won't show the sidebar.

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1C2E6B] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin">
            <ResorbWordmark size="sm" light={true} />
            <span className="block text-xs text-[#14C7B8] font-bold mt-1 tracking-wider uppercase">
              Admin Panel
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
            📊 Dashboard
          </Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
            📦 Orders
          </Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
            🎛️ Products
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={async () => {
            "use server";
            const c = await cookies();
            c.delete("resorb_admin_session");
            redirect("/admin/login");
          }}>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
