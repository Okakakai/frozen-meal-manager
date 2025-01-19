'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Nutrient = {
  name: string
  amount: number
}

const nutrientOptions = [
  '炭水化物',
  'タンパク質',
  '脂質',
  'ビタミンA',
  'ビタミンC',
  'カルシウム',
  '鉄分',
]

export function AddInventoryForm() {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [nutrients, setNutrients] = useState<Nutrient[]>([])

  const addNutrient = () => {
    setNutrients([...nutrients, { name: '', amount: 0 }])
  }

  const updateNutrient = (index: number, field: 'name' | 'amount', value: string | number) => {
    const newNutrients = [...nutrients]
    newNutrients[index] = { ...newNutrients[index], [field]: value }
    setNutrients(newNutrients)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここで在庫追加のロジックを実装します
    console.log({ name, quantity, nutrients })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">弁当名</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity">数量</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </div>
      <div>
        <Label>栄養素（任意）</Label>
        {nutrients.map((nutrient, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Select
              value={nutrient.name}
              onValueChange={(value) => updateNutrient(index, 'name', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="栄養素を選択" />
              </SelectTrigger>
              <SelectContent>
                {nutrientOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="0"
              value={nutrient.amount}
              onChange={(e) => updateNutrient(index, 'amount', parseFloat(e.target.value))}
              placeholder="グラム数"
            />
          </div>
        ))}
        <Button type="button" onClick={addNutrient} className="mt-2">
          栄養素を追加
        </Button>
      </div>
      <Button type="submit">在庫を追加</Button>
    </form>
  )
}

