// 'use client'

import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { number } from "yup";

/*
cookie: cart
{
   'uuid-123-1': 'cantidad',
   'uuid-123-2': 'cantidad',
   'uuid-123-3': 'cantidad',
   ...
}

De esta forma, el usuario no podrá manipular información que pueda generar algún error.

*/

export const getCookieCart = (): { [id: string]: number } => {
	if (hasCookie("cart")) {
		const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
		return cookieCart;
	}
	return {};
};

export const addProductToCart = (id: string) => {
	const cookieCart = getCookieCart();
	if (cookieCart[id]) {
		cookieCart[id] += 1;
	} else {
		cookieCart[id] = 1;
	}
	setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
	const cookieCart = getCookieCart();
	delete cookieCart[id];
	setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
	const cookieCart = getCookieCart();
	if (!cookieCart[id]) return;
	const itemsInCart = cookieCart[id] - 1;
	if (itemsInCart <= 0) {
		delete cookieCart[id];
	} else {
		cookieCart[id] = itemsInCart;
	}
	setCookie("cart", JSON.stringify(cookieCart));
};
