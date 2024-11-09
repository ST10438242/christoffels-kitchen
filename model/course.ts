export enum CourseTypeEnum {
	Starter = "Starter",
	Main = "Main",
	Dessert = "Dessert",
}

export class Course {
	constructor(
		public name: string,
		public price: number,
		public courseType: CourseTypeEnum,
		public image: string,
		public description: string
	) {}
}

const coursesJson = require("../data/courses.json");

export const courses: Course[] = coursesJson.map(
	(course: Course) =>
		new Course(
			course.name,
			course.price,
			CourseTypeEnum[course.courseType as keyof typeof CourseTypeEnum],
			course.image,
			course.description
		)
);
