import { InventoryList } from './components/partials/InventoryList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { memo } from 'react'

const HomePage = memo(() => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">在庫一覧</h1>
        <Link href="/inventory/add">
          <Button>在庫追加</Button>
        </Link>
      </div>
      <InventoryList />
    </div>
  )
})

export default HomePage;
