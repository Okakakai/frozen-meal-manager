import { InventoryDetail } from '../../components/InventoryDetail'

export default function InventoryItemPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">在庫詳細</h1>
      <InventoryDetail id={params.id} />
    </div>
  )
}

