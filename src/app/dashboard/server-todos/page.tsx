// "use client";
// import { useEffect } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Listado de ToDos",
	description: "Listado de ToDos",
};

export default async function ServerTodosPage() {
	//! La siguiente línea la voy a usar mucho en todos lados, por eso ahora la llevo directamente a src/auth/actions/auth-actions
	// const session= await getServerSession(authOptions)

	const user = await getUserSessionServer();
	if (!user) redirect("/api/auth/signin");

	const todos = await prisma.todo.findMany({
		where: { userId: user.id },
		orderBy: {
			description: "asc",
		},
	});
	// console.log("construido");

	return (
		<>
			<span className="text-3xl mb-10">Server Actions</span>
			<div className="w-full px-3 mx-5 mb-5">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</>
	);
}
