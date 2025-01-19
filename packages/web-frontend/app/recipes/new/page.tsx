import { NewRecipeForm } from '../../components/NewRecipeForm'

export default function NewRecipePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">新規レシピ登録</h1>
      <NewRecipeForm />
    </div>
  )
}

