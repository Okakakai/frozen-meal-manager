'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'ホーム' },
  { href: '/recipes', label: 'レシピ' },
  { href: '/shopping', label: '買い物' },
  { href: '/inventory', label: '在庫' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-block py-4 border-b-2 ${
                  pathname === item.href
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

