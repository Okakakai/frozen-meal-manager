import { ShoppingList } from '../components/ShoppingList'

export default function ShoppingPage() {
  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-6">買い物リスト</h1>
      <ShoppingList />
    </div>
  )
}

