import Link from 'next/link'
import { RecipeList } from '../components/RecipeList'
import { Button } from '@/components/ui/button'

export default function RecipesPage() {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">レシピ一覧</h1>
        <Link href="/recipes/new">
          <Button>新規レシピ</Button>
        </Link>
      </div>
      <RecipeList />
    </div>
  )
}

