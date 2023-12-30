import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../types";
import {QueryCourseModel} from "../models/GetCoursesQueryModel";
import express, {Response} from "express";
import {CourseViewModel} from "../models/CourseViewModel";
import {URIParamsCourseModel} from "../models/URIParamsCourseModel";
import {CourseUpdateModel} from "../models/CourseUpdateModel";
import {CourseCreateModel} from "../models/CourseCreateModel";
import {HTTP_STATUSE} from "../utils";
import {productRepository} from "../repositories/courses-repositiry";

export type CourseType = { id: number, title: string }

export const getCourseViewModel = (course: CourseType): CourseViewModel => {
    return {
        title: course.title,
        id: course.id
    }
}

export const getCoursesRoutes =(db: { courses: CourseType[] })=> {

    const coursesRouter = express.Router()

    coursesRouter.get('/', (req: RequestWithQuery<QueryCourseModel>, res: Response<CourseViewModel[]>) => {

        const foundedCourses = productRepository.findCourses(req.query.title ? req.query.title.toString() : null)

        res.json(foundedCourses)

    })

    coursesRouter.get('/:id', (req: RequestWithParams<URIParamsCourseModel>, res: Response) => {
        const foundedCourse = productRepository.getCoursesById(+req.params.id)
        if (foundedCourse) {
            res.status(HTTP_STATUSE.OK_200).json(getCourseViewModel(foundedCourse))
        } else {
            res.sendStatus(HTTP_STATUSE.NOT_FOUND_404)
        }
    })

    coursesRouter.put('/', (req: RequestWithBody<CourseUpdateModel>,res:Response<CourseViewModel>) => {
        let foundedCourse = productRepository.updateCourse(+req.body.id, req.body.title)
        if (foundedCourse) {
            res.status(200).json(foundedCourse)
        } else {
            res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
        }

    })

    coursesRouter.delete('/:id', (req: RequestWithParams<URIParamsCourseModel>, res: Response<CourseViewModel[]>)=> {
        const courses = productRepository.deleteCourse(+req.params.id)
        res.json(courses)
    })

    coursesRouter.post('/', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
        const result: CourseType[] = productRepository.createCourse(req.body.title ? req.body.title.toString() : null)
        if (req.body.title) {
            res.status(HTTP_STATUSE.OK_200).send(result[0])
        } else{
            res.sendStatus(400)
        }
    })



    // coursesRouter.post('/', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
    //     const newId = db.courses.length ? db.courses[db.courses.length - 1].id + 1 : 1
    //     if (req.body.title) {
    //         db.courses.push({id: newId, title: req.body.title})
    //         res.status(HTTP_STATUSE.OK_200).send({id: newId, title: req.body.title})
    //     } else {
    //         res.sendStatus(400)
    //     }
    // })


















    return coursesRouter
}