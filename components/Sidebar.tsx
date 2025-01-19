'use client'
import { Grid2X2, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname()

  const getPath = () => {
    switch (pathname) {
      case '/dashboard/home':
        return 'home'
      case '/dashboard/blocks':
        return 'block'
      case '/dashboard/settings':
        return 'settings'
      default:
        return 'home'
    }
  }

  const isHome = getPath() === 'home'
  const isBlocks = getPath() === 'block'
  const isSettings = getPath() === 'settings'


  return <div className="pl-8 pr-4 relative left-0 top-0 h-full bg-white w-72 border-r border-slate-200">
    <nav className="pt-8">
      <h2 className="uppercase text-xs font-semibold text-slate-500 mb-4 tracking-widest">Menu</h2>
      <ul className="space-y-2">
        <Link href="/dashboard/home" role="button"
          className={`cursor-pointer ${isHome ? "bg-teal-50 text-teal-900 font-semibold" : "text-slate-600"} p-2 hover:bg-slate-50 rounded-md flex items-center`}>
          <LayoutDashboard className="w-4 h-4 mr-4" />
          Workflows
        </Link>
        <Link role="button" className={`text-slate-600 p-2 hover:bg-slate-50 ${isBlocks ? "bg-teal-50 text-teal-900 font-semibold" : "text-slate-600"}  rounded-md flex items-center`} href="/dashboard/blocks">
          <Grid2X2 className="w-4 h-4 mr-4" />
          Blocks
        </Link>
        <Link role="button" className={`${isSettings ? "bg-teal-50 text-teal-900 font-semibold" : "text-slate-600"} p-2 hover:bg-slate-50 rounded-md flex items-center`} href="/dashboard/settings">
          <Settings className="w-4 h-4 mr-4" />
          Settings
        </Link>
      </ul>
    </nav>
  </div>
}
