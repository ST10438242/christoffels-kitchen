import { Course } from "@/model/course";
import { MenuItem } from "@/model/menu-item";

export function averagePriceOfCoursesInMenuItem(menuItem: MenuItem) {
	let totalPrice: number = 0;
	let menuItemCoursePrices: number[] = [];

	// FOR LOOP
	for (let i = 0; i < menuItem.courses.length; i++) {
		const course: Course = menuItem.courses[i];

		// FOR IN LOOP
		for (const courseProperty in course) {
			// CHECK IF COURSE HAS PRICE FIELD
			if (courseProperty === "price") {
				menuItemCoursePrices[i] = menuItem.courses[i].price;
			}
		}
	}

	// WHILE LOOP
	let countPrices: number = 0;
	while (menuItemCoursePrices.length > countPrices) {
		const price: number | undefined = menuItemCoursePrices[countPrices];

		if (price) {
			totalPrice = totalPrice + price;
		}
		countPrices++;
	}

	return Math.round(totalPrice / menuItemCoursePrices.length);
}
