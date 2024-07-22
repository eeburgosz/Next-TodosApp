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

export default async function RestTodosPage() {
	//! Recordar ponerla async para poder trabajar con Prisma.
	// useEffect(() => {
	// 	const todos = fetch("/api/todos") //! Cuando es 'use client' puedo usar la ruta relativa. Cuando es un server component, debo usar toda la URL
	// 		.then((resp) => resp.json())
	// 		.then(console.log);
	// }, []);

	const user = await getUserSessionServer();
	if (!user) redirect("/api/auth/signin");

	const todos = await prisma.todo.findMany({
		where: { userId: user.id },
		orderBy: {
			description: "asc",
		},
	});

	return (
		<div>
			<div className="w-full px-3 mx-5 mb-5">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	);
}
