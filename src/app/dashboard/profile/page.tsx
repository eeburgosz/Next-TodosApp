"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
	useEffect(() => {
		console.log("Client Profile");
	}, []);

	const { data: session } = useSession();

	return (
		<div>
			<h1>Hello Page</h1>
			<hr />
			<div className="flex flex-col">
				<span>{session?.user?.name ?? "No Name"}</span>
				<span>{session?.user?.email ?? "No Email"}</span>
				<span>{session?.user?.image ?? "No Image"}</span>
				<span>{session?.user?.roles?.join(", ") ?? "No Roles"}</span>
				<span>{session?.user?.id ?? "No UUID"}</span>
			</div>
		</div>
	);
}
