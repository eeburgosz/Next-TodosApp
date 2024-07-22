import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
	//! Adaptador de Prisma.
	adapter: PrismaAdapter(prisma) as Adapter,
	//! --------------------
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		// ...add more providers here
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "user@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "******",
				},
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = await signInEmailPassword(
					credentials!.email,
					credentials!.password
				);

				// console.log(user);
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				}
				// If you return null then an error will be displayed advising the user to check their details.
				return null;

				// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
			},
		}),
	],

	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account, email, profile, credentials }) {
			console.log(user);
			return true;
		},
		async jwt({ token, user, account, profile }) {
			// console.log({ token });
			const dbUser = await prisma.user.findUnique({
				where: { email: token.email! },
			}); //! token.email! porque estoy seguro de que siempre voy a tener un mail.
			if (dbUser?.isActive === false) throw Error("El usuario no está activo");
			token.roles = dbUser?.roles ?? ["NO-ROLES"];
			token.id = dbUser?.id ?? "NO-UUID";
			return token;
		},
		async session({ session, token, user }) {
			// console.log({ token });
			if (session && session.user) {
				session.user.roles = token.roles;
				session.user.id = token.id;
			}

			return session;
		},
	},
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
