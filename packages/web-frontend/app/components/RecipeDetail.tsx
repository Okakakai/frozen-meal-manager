'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Ingredient = {
  name: string
  quantity: string
  unit: string
  weight: string
}

type Nutrient = {
  name: string
  amount: number
  unit: string
}

type RecipeSource = {
  type: 'YouTube' | 'Website' | 'Cookbook'
  url?: string
  book?: {
    title: string
    page: string
  }
}

type Recipe = {
  id: string
  name: string
  ingredients: Ingredient[]
  tags: string[]
  nutrients: Nutrient[]
  source: RecipeSource
}

export function RecipeDetail({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    // ここで実際のAPIからデータを取得します
    // この例ではモックデータを使用しています
    const mockRecipe: Recipe = {
      id,
      name: '唐揚げ弁当',
      ingredients: [
        { name: '鶏もも肉', quantity: '300', unit: 'g', weight: '300' },
        { name: '片栗粉', quantity: '大さじ2', unit: '', weight: '30' },
      ],
      tags: ['昼弁当', '揚げ物'],
      nutrients: [
        { name: 'エネルギー', amount: 500, unit: 'kcal' },
        { name: 'タンパク質', amount: 30, unit: 'g' },
      ],
      source: {
        type: 'YouTube',
        url: 'https://www.youtube.com/watch?v=example',
      },
    }
    setRecipe(mockRecipe)
  }, [id])

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{recipe.name}</h2>
      <div className="mb-4">
        {recipe.tags.map((tag) => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">{tag}</span>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-2">材料</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity} {ingredient.unit} ({ingredient.weight}g)
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">栄養成分</h3>
      <ul className="space-y-2 mb-6">
        {recipe.nutrients.map((nutrient, index) => (
          <li key={index} className="flex justify-between">
            <span>{nutrient.name}</span>
            <span>{nutrient.amount}{nutrient.unit}</span>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">レシピソース</h3>
      <p className="mb-4">
        {recipe.source.type === 'YouTube' || recipe.source.type === 'Website' ? (
          <a href={recipe.source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {recipe.source.type === 'YouTube' ? 'YouTube動画' : 'Webサイト'}を見る
          </a>
        ) : (
          <>
            料理本: {recipe.source.book?.title} (ページ: {recipe.source.book?.page})
          </>
        )}
      </p>
      <div className="flex justify-between">
        <Link href={`/inventory/add?recipe=${id}`}>
          <Button>この弁当を作る</Button>
        </Link>
        <Link href={`/recipes/${id}/edit`}>
          <Button variant="outline">レシピを編集</Button>
        </Link>
      </div>
    </div>
  )
}

