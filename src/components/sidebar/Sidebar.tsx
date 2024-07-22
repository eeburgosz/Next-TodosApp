import Image from "next/image";
import Link from "next/link";
import { LogButton, SidebarItem } from "../";
import {
	IoBaseballOutline,
	IoCalendar,
	IoCheckboxOutline,
	IoCogOutline,
	IoListOutline,
	IoLogIn,
	IoLogOut,
	IoPersonCircleOutline,
} from "react-icons/io5";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const menuItems = [
	{
		path: "/dashboard",
		icon: <IoCalendar size={30} />,
		title: "Dashboard",
	},
	{
		path: "/dashboard/rest-todos",
		icon: <IoCheckboxOutline size={30} />,
		title: "Rest TODO's",
	},
	{
		path: "/dashboard/server-todos",
		icon: <IoListOutline size={30} />,
		title: "Server Actions",
	},
	{
		path: "/dashboard/cookies",
		icon: <IoCogOutline size={30} />,
		title: "Cookies",
	},
	{
		path: "/dashboard/products",
		icon: <IoBaseballOutline size={30} />,
		title: "Productos",
	},
	{
		path: "/dashboard/profile",
		icon: <IoPersonCircleOutline size={30} />,
		title: "Profile",
	},
];

export const Sidebar = async () => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/api/auth/signin");

	const avatarUrl = session?.user?.image
		? session.user.image
		: "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

	const userName = session.user?.name ?? "No name";
	const userRoles = session.user?.roles ?? ["Client"];

	return (
		<aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
			<div className="overflow-y overflow-x-hidden">
				<div className="-mx-6 px-6 py-4">
					<Link href="/dashboard" title="home">
						<Image
							src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
							className="w-32"
							alt="tailus logo"
							width={10}
							height={10}
						/>
					</Link>
				</div>

				<div className="mt-8 text-center">
					<Image
						src={avatarUrl}
						alt=""
						className=" m-auto rounded-full "
						width={150}
						height={150}
					/>
					<h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
						{userName}
					</h5>
					<span className="hidden text-gray-400 lg:block capitalize">
						{userRoles.join(", ")}
					</span>
				</div>

				<ul className="space-y-2 tracking-wide mt-8">
					{menuItems.map((item) => (
						<SidebarItem key={item.path} {...item} />
					))}
				</ul>
			</div>

			<div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<LogButton />
			</div>
		</aside>
	);
};
