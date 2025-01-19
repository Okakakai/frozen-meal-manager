'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, ShoppingCart, Package } from 'lucide-react'

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <NavItem href="/" icon={<Home />} label="ホーム" active={pathname === '/'} />
        <NavItem href="/recipes" icon={<BookOpen />} label="レシピ" active={pathname.startsWith('/recipes')} />
        <NavItem href="/shopping" icon={<ShoppingCart />} label="買い物" active={pathname.startsWith('/shopping')} />
        <NavItem href="/inventory" icon={<Package />} label="在庫" active={pathname.startsWith('/inventory')} />
      </div>
    </nav>
  )
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center justify-center p-2 ${active ? 'text-blue-500' : 'text-gray-500'}`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}

