import {CourseType} from "../routes/courses";

export const db = {
    courses:
        [
            {id: 1, title: 'front-end'},
            {id: 2, title: 'back-end'},
            {id: 3, title: 'qa'},
            {id: 4, title: 'dev'}
        ]
} as { courses: CourseType[] }