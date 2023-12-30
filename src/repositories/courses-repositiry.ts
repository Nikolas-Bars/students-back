import {db} from "../db/db";

const coursesDB = db.courses

export const productRepository = {
    findCourses(title: string | null) {

        let foundedCourses = db.courses

        if(title) {
            foundedCourses = coursesDB.filter((el) => el.title.indexOf(title as string) > -1)
        }

        return foundedCourses
    },
    getCoursesById(id: number) {
        return db.courses.find((el) => el.id === id)
    },
    createCourse(title: string | null) {
        const newId = coursesDB.length ? coursesDB[coursesDB.length - 1].id + 1 : 1;
        if (title) {

            const data = {id: newId, title}

            db.courses.push(data)

            return [{id: newId, title}]

        } else {
            return []
        }
    },
    updateCourse(id: number, title: string) {
        let foundedCourse = db.courses.find((el) => el.id === id)
        if(foundedCourse) {
            return foundedCourse = { ...foundedCourse, title }
        } else {
            return
        }
    },
    deleteCourse(id: number) {
        const filteredCourses = db.courses.filter((el) => el.id !== id)

        return filteredCourses
    },
}