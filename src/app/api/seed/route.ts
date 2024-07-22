import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { create } from "domain";

export async function GET(request: Request) {
	//! Primero limpio la DB.
	await prisma.todo.deleteMany(); // DELETE * from todo;
	await prisma.user.deleteMany(); // DELETE * from todo;

	// await prisma.todo.createMany({
	// 	data: [
	// 		{ description: "Piedra del alma", complete: true },
	// 		{ description: "Piedra del poder" },
	// 		{ description: "Piedra del tiempo" },
	// 		{ description: "Piedra del espacio" },
	// 		{ description: "Piedra de la realidad" },
	// 	],
	// });

	const user = await prisma.user.create({
		data: {
			email: "test1@google.com",
			password: bcrypt.hashSync("123456"),
			roles: ["admin", "client", "super-user"],
			todos: {
				create: [
					{ description: "Piedra del alma", complete: true },
					{ description: "Piedra del poder" },
					{ description: "Piedra del tiempo" },
					{ description: "Piedra del espacio" },
					{ description: "Piedra de la realidad" },
				],
			},
		},
	});

	return Response.json({
		message: "Seed executed",
	});
}
