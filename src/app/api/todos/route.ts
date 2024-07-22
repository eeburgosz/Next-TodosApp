import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import * as yup from "yup";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const take = searchParams.get("take") ?? "10";
	const skip = searchParams.get("skip") ?? "0";

	if (isNaN(+take) || isNaN(+skip)) {
		//! Como take es un string, el + lo hace number. Esto es para evitar que vengan letras
		return Response.json(
			{ message: "Take y Skip deben ser números" },
			{ status: 400 }
		);
	}

	const todos = await prisma.todo.findMany({
		take: +take,
		skip: +skip,
	});

	return Response.json(todos);
}

const postSchema = yup.object({
	description: yup.string().required(),
	complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
	const user = await getUserSessionServer();
	if (!user) return Response.json("No autorizado", { status: 401 });

	try {
		// const body = await postSchema.validate(await request.json());
		const { complete, description } = await postSchema.validate(
			await request.json()
		);
		const todo = await prisma.todo.create({
			data: { complete, description, userId: user.id },
		});
		return Response.json(todo);
	} catch (error) {
		return Response.json(error, { status: 400 });
	}
}

export async function DELETE(req: Request) {
	const user = await getUserSessionServer();
	if (!user) return Response.json("No autorizado", { status: 401 });
	try {
		await prisma.todo.deleteMany({
			where: {
				complete: true,
				userId: user.id,
			},
		});
		return Response.json({ message: "Todos completados han sido eliminados" });
	} catch (error) {
		return Response.json(error, { status: 400 });
	}
}
