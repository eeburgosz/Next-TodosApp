import prisma from "@/lib/prisma";

export async function GET(request: Request) {
	//! Primero limpio la DB.
	await prisma.todo.deleteMany(); // DELETE * from todo;

	await prisma.todo.createMany({
		data: [
			{ description: "Piedra del alma", complete: true },
			{ description: "Piedra del poder" },
			{ description: "Piedra del tiempo" },
			{ description: "Piedra del espacio" },
			{ description: "Piedra de la realidad" },
		],
	});

	return Response.json({
		message: "Seed executed",
	});
}
