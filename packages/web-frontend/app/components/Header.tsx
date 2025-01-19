import Link from 'next/link'
import { UserButton } from './UserButton'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          冷凍弁当管理
        </Link>
        <UserButton />
      </div>
    </header>
  )
}

