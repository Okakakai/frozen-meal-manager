'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Recipe = {
  id: number
  name: string
  tags: string[]
}

const recipes: Recipe[] = [
  { id: 1, name: '唐揚げ弁当', tags: ['昼弁当'] },
  { id: 2, name: '肉じゃが', tags: ['夜ご飯'] },
  { id: 3, name: '冷凍ご飯', tags: ['ご飯'] },
]

export function RecipeList() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map(recipe => (
        <li key={recipe.id}>
          <Link href={`/recipes/${recipe.id}`} className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{recipe.name}</h3>
              <ChevronRight className="text-gray-400" />
            </div>
            <div className="flex gap-2 mt-2">
              {recipe.tags.map(tag => (
                <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

