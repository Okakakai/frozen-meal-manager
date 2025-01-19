import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InventoryList } from "./components/partials/InventoryList";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">在庫一覧</h1>
        <Link href="/inventory/add">
          <Button>在庫追加</Button>
        </Link>
      </div>
      <InventoryList />
    </div>
  );
}
