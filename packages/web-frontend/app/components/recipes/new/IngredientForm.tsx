import {
	type Select,
	type SelectTrigger,
	SelectValue,
	type SelectContent,
	type SelectItem,
} from "@radix-ui/react-select";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const IngredientForm = () => {
	return (
		<div>
			<Label>材料</Label>
			{ingredients.map((ingredient, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="flex items-center space-x-2 mt-2">
					<Select
						value={ingredient.name}
						onValueChange={(value) => updateIngredient(index, "name", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="材料を選択" />
						</SelectTrigger>
						<SelectContent>
							{availableIngredients.map((ing) => (
								<SelectItem key={ing} value={ing}>
									{ing}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input
						placeholder="数量"
						value={ingredient.quantity}
						onChange={(e) =>
							updateIngredient(index, "quantity", e.target.value)
						}
						required
					/>
					<Input
						placeholder="単位"
						value={ingredient.unit}
						onChange={(e) => updateIngredient(index, "unit", e.target.value)}
					/>
					<Input
						placeholder="グラム"
						value={ingredient.weight}
						onChange={(e) => updateIngredient(index, "weight", e.target.value)}
					/>
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => removeIngredient(index)}
					>
						<Minus className="h-4 w-4" />
					</Button>
				</div>
			))}
			<div className="flex items-center space-x-2 mt-2">
				<Input
					placeholder="新しい材料"
					value={newIngredient}
					onChange={(e) => setNewIngredient(e.target.value)}
				/>
				<Button type="button" onClick={addIngredient}>
					<Plus className="h-4 w-4 mr-2" />
					材料を追加
				</Button>
			</div>
		</div>
	);
};
