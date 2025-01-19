"use client";

import { memo, useState } from "react";
import { Minus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { InventoryItem } from "@/app/schemas";

const initialInventory: InventoryItem[] = [
	{
		id: 1,
		name: "唐揚げ弁当",
		quantity: 3,
		tags: ["昼弁当"],
		cookedAt: "2023-05-01",
	},
	{
		id: 2,
		name: "冷凍ご飯",
		quantity: 5,
		tags: ["ご飯"],
		cookedAt: "2023-05-02",
	},
	{
		id: 3,
		name: "肉じゃが",
		quantity: 2,
		tags: ["夜ご飯"],
		cookedAt: "2023-05-03",
	},
];

export const InventoryList = memo(() => {
	const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
	const [editItem, setEditItem] = useState<InventoryItem | null>(null);
	const [editQuantity, setEditQuantity] = useState<number>(0);

	const updateQuantity = (id: number, change: number) => {
		setInventory(
			inventory.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(0, item.quantity + change) }
					: item,
			),
		);
	};

	const handleEdit = (item: InventoryItem) => {
		setEditItem(item);
		setEditQuantity(item.quantity);
	};

	const handleSaveEdit = () => {
		if (editItem) {
			setInventory(
				inventory.map((item) =>
					item.id === editItem.id ? { ...item, quantity: editQuantity } : item,
				),
			);
			setEditItem(null);
		}
	};

	return (
		<ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{inventory.map((item) => (
				<li key={item.id} className="bg-white p-4 rounded-lg shadow">
					<div className="flex justify-between items-start mb-2">
						<h3 className="font-semibold text-lg">{item.name}</h3>
						<span className="text-sm text-gray-500">
							残り: {item.quantity}個
						</span>
					</div>
					<div className="flex gap-2 mb-2">
						{item.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
					<div className="text-sm text-gray-600 mb-4">
						調理日: {item.cookedAt}
					</div>
					<div className="flex items-center justify-end gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => updateQuantity(item.id, -1)}
						>
							<Minus className="h-4 w-4" />
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									onClick={() => handleEdit(item)}
								>
									<Edit2 className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>{item.name}の数量を編集</DialogTitle>
								</DialogHeader>
								<div className="py-4">
									<Input
										type="number"
										value={editQuantity}
										onChange={(e) =>
											setEditQuantity(Number.parseInt(e.target.value))
										}
										min={0}
									/>
								</div>
								<Button onClick={handleSaveEdit}>保存</Button>
							</DialogContent>
						</Dialog>
					</div>
				</li>
			))}
		</ul>
	);
});

InventoryList.displayName = "InventoryList";
