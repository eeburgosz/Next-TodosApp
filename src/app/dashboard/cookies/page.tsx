import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
	title: "Cookies Page",
	description: "Magna ut in ullamco sunt culpa quis non consequat magna.",
};

export default function CookiesPage() {
	const cookieStore = cookies();
	const cookieTab = cookieStore.get("selectedTab")?.value ?? "1"; //!Como puede venir undefined, le asigno 1 por defecto.

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<div className="flex flex-col">
				<span className="text-3xl">Tabs</span>
				<TabBar currentTab={+cookieTab} />
			</div>
		</div>
	);
}
