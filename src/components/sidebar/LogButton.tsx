"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { IoMdClock } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";

export const LogButton = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
				<IoMdClock />
				<span className="group-hover:text-gray-700">Espere...</span>
			</button>
		);
	}

	return (
		<>
			{status === "authenticated" ? (
				<button
					onClick={() => signOut()}
					className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
				>
					<IoLogOut />
					<span className="group-hover:text-gray-700">Logout</span>
				</button>
			) : (
				<button
					onClick={() => signIn()}
					className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
				>
					<IoLogIn />
					<span className="group-hover:text-gray-700">Login</span>
				</button>
			)}
		</>
	);
};
