// model/course.ts
export enum CourseEnum {
  Starter = "Starter",
  Main = "Main",
  Dessert = "Dessert",
}

export class Course {
  name: string;
  price: number;
  courseType: CourseEnum;

  constructor(name: string, price: number, courseType: CourseEnum) {
    this.name = name;
    this.price = price;
    this.courseType = courseType;
  }
}

const coursesJson = require("../data/courses.json");

export const courses: Course[] = coursesJson.map(
  (course: Course) =>
    new Course(
      course.name,
      course.price,
      CourseEnum[course.courseType as keyof typeof CourseEnum],
    ),
);
