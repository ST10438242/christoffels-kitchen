import { Course } from './course';

export class MenuItem {
    constructor(
        public dishName: string,
        public description: string,
        public courses: Course[],
        public price: number,
    ) {}
}
