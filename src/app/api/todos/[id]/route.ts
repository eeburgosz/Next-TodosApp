import prisma from "@/lib/prisma";
import * as yup from "yup";

interface Args {
	params: {
		id: string;
	};
}

export async function GET(request: Request, { params }: Args) {
	const { id } = params;
	const todo = await prisma.todo.findFirst({
		where: {
			id,
		},
	});
	if (!todo) {
		return Response.json({ message: "ID no encontrado" }, { status: 404 });
	}
	return Response.json(todo);
}

const putSchema = yup.object({
	complete: yup.boolean().optional(),
	description: yup.string().optional(),
});
export async function PUT(request: Request, { params }: Args) {
	const { id } = params;
	const todo = await prisma.todo.findFirst({
		where: {
			id,
		},
	});
	try {
		if (!todo) {
			return Response.json({ message: "ID no encontrado" }, { status: 404 });
		}
		const { complete, description } = await putSchema.validate(
			await request.json()
		);
		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: { complete, description },
		});
		return Response.json(updatedTodo);
	} catch (error) {
		return Response.json(error, { status: 400 });
	}
}