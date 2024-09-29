// model/course.ts
export enum CourseTypeEnum {
    Starter = 'Starter',
    Main = 'Main',
    Dessert = 'Dessert',
}

export class Course {
    constructor(
        public name: string,
        public price: number,
        public courseType: CourseTypeEnum,
    ) {}
}

const coursesJson = require('../data/courses.json');

export const courses: Course[] = coursesJson.map(
    (course: Course) =>
        new Course(
            course.name,
            course.price,
            CourseTypeEnum[course.courseType as keyof typeof CourseTypeEnum],
        ),
);
