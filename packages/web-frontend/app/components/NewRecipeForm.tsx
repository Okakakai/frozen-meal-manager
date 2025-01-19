"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";

type Ingredient = {
	name: string;
	quantity: string;
	unit: string;
	weight: string;
};

type Nutrient = {
	name: string;
	amount: number;
	unit: string;
};

type RecipeSource = {
	type: "YouTube" | "Website" | "Cookbook";
	url?: string;
	book?: {
		title: string;
		page: string;
	};
};

const nutrientOptions = [
	{ name: "エネルギー", unit: "kcal" },
	{ name: "タンパク質", unit: "g" },
	{ name: "脂質", unit: "g" },
	{ name: "炭水化物", unit: "g" },
	{ name: "食物繊維", unit: "g" },
	{ name: "食塩相当量", unit: "g" },
];

const initialIngredients = [
	"鶏もも肉",
	"片栗粉",
	"醤油",
	"酒",
	"牛肉",
	"じゃがいも",
	"にんじん",
	"玉ねぎ",
	"米",
];

export function NewRecipeForm() {
	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState<Ingredient[]>([
		{ name: "", quantity: "", unit: "", weight: "" },
	]);
	const [tags, setTags] = useState<string[]>([]);
	const [nutrients, setNutrients] = useState<Nutrient[]>([]);
	const [newTag, setNewTag] = useState("");
	const [availableIngredients, setAvailableIngredients] =
		useState<string[]>(initialIngredients);
	const [newIngredient, setNewIngredient] = useState("");
	const [source, setSource] = useState<RecipeSource>({ type: "YouTube" });

	const addIngredient = () => {
		if (newIngredient && !availableIngredients.includes(newIngredient)) {
			setAvailableIngredients([...availableIngredients, newIngredient]);
		}
		setIngredients([
			...ingredients,
			{ name: newIngredient, quantity: "", unit: "", weight: "" },
		]);
		setNewIngredient("");
	};

	const removeIngredient = (index: number) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	};

	const updateIngredient = (
		index: number,
		field: keyof Ingredient,
		value: string,
	) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = { ...newIngredients[index], [field]: value };
		setIngredients(newIngredients);
	};

	const addTag = () => {
		if (newTag && !tags.includes(newTag)) {
			setTags([...tags, newTag]);
			setNewTag("");
		}
	};

	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const addNutrient = () => {
		if (nutrients.length < nutrientOptions.length) {
			const availableNutrient = nutrientOptions.find(
				(option) => !nutrients.some((n) => n.name === option.name),
			);
			if (availableNutrient) {
				setNutrients([
					...nutrients,
					{
						name: availableNutrient.name,
						amount: 0,
						unit: availableNutrient.unit,
					},
				]);
			}
		}
	};

	const removeNutrient = (index: number) => {
		setNutrients(nutrients.filter((_, i) => i !== index));
	};

	const updateNutrient = (
		index: number,
		field: keyof Nutrient,
		value: string | number,
	) => {
		const newNutrients = [...nutrients];
		newNutrients[index] = { ...newNutrients[index], [field]: value };
		setNutrients(newNutrients);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ name, ingredients, tags, nutrients, source });
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8">
			<div>
				<Label htmlFor="name">レシピ名</Label>
				<Input
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>

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
							onChange={(e) =>
								updateIngredient(index, "weight", e.target.value)
							}
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

			<div>
				<Label>タグ</Label>
				<div className="flex flex-wrap gap-2 mt-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
						>
							{tag}
							<button
								type="button"
								onClick={() => removeTag(tag)}
								className="ml-1 text-blue-600 hover:text-blue-800"
							>
								<Minus className="h-4 w-4" />
							</button>
						</span>
					))}
				</div>
				<div className="flex items-center space-x-2 mt-2">
					<Select
						onValueChange={(value) => {
							if (value === "new") {
								// Do nothing, let user input new tag
							} else if (!tags.includes(value)) {
								setTags([...tags, value]);
							}
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="タグを選択または追加" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="昼弁当">昼弁当</SelectItem>
							<SelectItem value="夜ご飯">夜ご飯</SelectItem>
							<SelectItem value="ご飯">ご飯</SelectItem>
							<SelectItem value="new">新しいタグを追加</SelectItem>
						</SelectContent>
					</Select>
					<Input
						placeholder="新しいタグ"
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
					/>
					<Button type="button" onClick={addTag}>
						追加
					</Button>
				</div>
			</div>

			<div>
				<Label>栄養成分</Label>
				{nutrients.map((nutrient, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="flex items-center space-x-2 mt-2">
						<Select
							value={nutrient.name}
							onValueChange={(value) => {
								const selectedNutrient = nutrientOptions.find(
									(option) => option.name === value,
								);
								if (selectedNutrient) {
									updateNutrient(index, "name", selectedNutrient.name);
									updateNutrient(index, "unit", selectedNutrient.unit);
								}
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="栄養素を選択" />
							</SelectTrigger>
							<SelectContent>
								{nutrientOptions.map((option) => (
									<SelectItem key={option.name} value={option.name}>
										{option.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							type="number"
							step={nutrient.name === "エネルギー" ? "1" : "0.1"}
							placeholder="量"
							value={nutrient.amount}
							onChange={(e) =>
								updateNutrient(
									index,
									"amount",
									Number.parseFloat(e.target.value),
								)
							}
						/>
						<span>{nutrient.unit}</span>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => removeNutrient(index)}
						>
							<Minus className="h-4 w-4" />
						</Button>
					</div>
				))}
				<Button
					type="button"
					onClick={addNutrient}
					className="mt-2"
					disabled={nutrients.length >= nutrientOptions.length}
				>
					<Plus className="h-4 w-4 mr-2" />
					栄養素を追加
				</Button>
			</div>

			<div>
				<Label>レシピソース</Label>
				<Select
					value={source.type}
					onValueChange={(value: "YouTube" | "Website" | "Cookbook") =>
						setSource({ type: value })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="ソースを選択" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="YouTube">YouTube</SelectItem>
						<SelectItem value="Website">Webサイト</SelectItem>
						<SelectItem value="Cookbook">料理本</SelectItem>
					</SelectContent>
				</Select>
				{(source.type === "YouTube" || source.type === "Website") && (
					<Input
						className="mt-2"
						placeholder="URL"
						value={source.url || ""}
						onChange={(e) => setSource({ ...source, url: e.target.value })}
					/>
				)}
				{source.type === "Cookbook" && (
					<div className="space-y-2 mt-2">
						<Input
							placeholder="本のタイトル"
							value={source.book?.title || ""}
							onChange={(e) =>
								setSource({
									...source,
									book: { ...source.book, title: e.target.value },
								})
							}
						/>
						<Input
							placeholder="ページ数"
							value={source.book?.page || ""}
							onChange={(e) =>
								setSource({
									...source,
									book: { ...source.book, page: e.target.value },
								})
							}
						/>
					</div>
				)}
			</div>

			<Button type="submit">レシピを登録</Button>
		</form>
	);
}
