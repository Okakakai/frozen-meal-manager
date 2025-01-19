'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type Recipe = {
  id: number
  name: string
  ingredients: string[]
}

type Ingredient = {
  name: string
  checked: boolean
}

const mockRecipes: Recipe[] = [
  { id: 1, name: '唐揚げ弁当', ingredients: ['鶏もも肉', '片栗粉', '醤油', '酒'] },
  { id: 2, name: '肉じゃが', ingredients: ['牛肉', 'じゃがいも', 'にんじん', '玉ねぎ'] },
  { id: 3, name: '冷凍ご飯', ingredients: ['米'] },
]

export function ShoppingList() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleRecipeSelect = (recipeId: string) => {
    const recipe = mockRecipes.find(r => r.id === parseInt(recipeId))
    if (recipe) {
      setSelectedRecipe(recipe)
      setIngredients(recipe.ingredients.map(name => ({ name, checked: false })))
    }
  }

  const handleIngredientToggle = (index: number) => {
    setIngredients(ingredients.map((ing, i) => 
      i === index ? { ...ing, checked: !ing.checked } : ing
    ))
  }

  const filteredRecipes = mockRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <Input
        type="text"
        placeholder="レシピまたは材料で検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select onValueChange={handleRecipeSelect}>
        <SelectTrigger>
          <SelectValue placeholder="レシピを選択" />
        </SelectTrigger>
        <SelectContent>
          {filteredRecipes.map(recipe => (
            <SelectItem key={recipe.id} value={recipe.id.toString()}>
              {recipe.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedRecipe && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{selectedRecipe.name}の材料</h2>
          <ul className="space-y-2">
            {ingredients.map((ing, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`ingredient-${index}`}
                  checked={ing.checked}
                  onCheckedChange={() => handleIngredientToggle(index)}
                />
                <label
                  htmlFor={`ingredient-${index}`}
                  className={`${ing.checked ? 'line-through text-gray-500' : ''}`}
                >
                  {ing.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button className="w-full">買い物リストを保存</Button>
    </div>
  )
}

