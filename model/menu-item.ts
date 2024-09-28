import { Course } from "./course";

export class MenuItem {
  dishName: string;
  description: string;
  courses: Course[];
  price: number;

  constructor(
    dishName: string,
    description: string,
    courses: Course[],
    price: number,
  ) {
    this.dishName = dishName;
    this.description = description;
    this.courses = courses;
    this.price = price;
  }
}
