"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

export const toggleTodo = async (
	id: string,
	complete: boolean
): Promise<Todo> => {
	// await sleep(3);

	const todo = await prisma.todo.findFirst({
		where: { id: id },
	});
	if (!todo) throw `Todo con id ${id} no encontrado`;
	const updatedTodo = await prisma.todo.update({
		where: { id },
		data: { complete: complete },
	});
	//! Para que muestre inmediatamente el camibo (Como en el otro caso que se usaba el useRouter() -> router.refresh())
	revalidatePath("/dashboard/server-todos");

	return updatedTodo;
};

export const addTodo = async (description: string, userId: string) => {
	try {
		// const body = await postSchema.validate(await request.json());
		const todo = await prisma.todo.create({
			data: { description, userId: "..." },
		});
		revalidatePath("/dashboard/server-todos");

		return todo;
	} catch (error) {
		return Response.json(error, { status: 400 });
	}
};

export const deleteCompleted = async (): Promise<void> => {
	await prisma.todo.deleteMany({
		where: {
			complete: true,
		},
	});
	revalidatePath("/dashboard/server-todos");
};
