import { RecipeDetail } from '../../components/RecipeDetail'

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">レシピ詳細</h1>
      <RecipeDetail id={params.id} />
    </div>
  )
}

