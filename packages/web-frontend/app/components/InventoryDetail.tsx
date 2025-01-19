'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

type InventoryItem = {
  id: string
  name: string
  quantity: number
  nutrients: { name: string; amount: number }[]
}

export function InventoryDetail({ id }: { id: string }) {
  const [item, setItem] = useState<InventoryItem | null>(null)

  useEffect(() => {
    // ここで実際のAPIからデータを取得します
    // この例ではモックデータを使用しています
    const mockItem: InventoryItem = {
      id,
      name: '唐揚げ弁当',
      quantity: 3,
      nutrients: [
        { name: 'タンパク質', amount: 20 },
        { name: '炭水化物', amount: 30 },
      ],
    }
    setItem(mockItem)
  }, [id])

  const updateQuantity = (change: number) => {
    if (item) {
      setItem({ ...item, quantity: Math.max(0, item.quantity + change) })
    }
  }

  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{item.name}</h2>
      <div className="flex items-center mb-4">
        <span className="text-lg font-medium mr-4">数量: {item.quantity}</span>
        <Button variant="outline" size="icon" onClick={() => updateQuantity(-1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => updateQuantity(1)} className="ml-2">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-xl font-semibold mb-2">栄養成分</h3>
      <ul className="space-y-2">
        {item.nutrients.map((nutrient, index) => (
          <li key={index} className="flex justify-between">
            <span>{nutrient.name}</span>
            <span>{nutrient.amount}g</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

