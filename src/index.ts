import express, {Request, Response} from 'express'
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "./types";
import {CourseCreateModel} from "./models/CourseCreateModel";
import {CourseUpdateModel} from "./models/CourseUpdateModel";
import {QueryCourseModel} from "./models/GetCoursesQueryModel";
import {CourseViewModel} from "./models/CourseViewModel";
import {URIParamsCourseModel} from "./models/URIParamsCourseModel";

export const app = express()

const port = process.env.PORT || 3005

const JsonMiddleWare = express.json()

app.use(JsonMiddleWare)

const HTTP_STATUSE = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

type CourseType = {id: number, title: string}

let db = {
    courses:
        [
            {id: 1, title: 'front-end'},
            {id: 2, title: 'back-end'},
            {id: 3, title: 'qa'},
            {id: 4, title: 'dev'}
        ]
} as {courses: CourseType[]}

const getCourseViewModel =(course: CourseType): CourseViewModel=> {
    return {
        title: course.title,
        id: course.id
    }
}

app.get('/', (req, res) => {
    res.json('Hi mf')
})

app.get('/courses', (req: RequestWithQuery<QueryCourseModel>, res: Response<CourseViewModel[]>) => {
    let foundedCourses = db.courses
    if(req.query.title) {
        foundedCourses = foundedCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1)
    }
    if (foundedCourses.length) {
        res.json(foundedCourses.map(getCourseViewModel))
    } else {
        res.json([])
    }

})

app.get('/courses/:id', (req: RequestWithParams<URIParamsCourseModel>, res: Response) => {
    const foundedCourse = db.courses.find((el) => el.id === +req.params.id)
    if (foundedCourse) {
        res.status(HTTP_STATUSE.OK_200).json(getCourseViewModel(foundedCourse))
    } else {
        res.sendStatus(HTTP_STATUSE.NOT_FOUND_404)
    }
})

app.put('/courses', (req: RequestWithBody<CourseUpdateModel>,res:Response<CourseViewModel>) => {
    let foundedCourse = db.courses.find((el) => el.id === +req.body.id)
    if (foundedCourse) {
        foundedCourse = { ...foundedCourse, title: req.body.title }
        res.status(200).json(foundedCourse)
    } else {
        res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
    }

})

app.delete('/courses/:id', (req: RequestWithParams<URIParamsCourseModel>, res: Response<CourseViewModel[]>)=> {
    db.courses = db.courses.filter((el) => el.id !== +req.params.id)
    res.json(db.courses)
})

app.delete('/__test__/data', (req: Request, res: Response) => {
    db.courses = []
    res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
})

app.post('/courses', (req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel>) => {
    const newId = db.courses.length ? db.courses[db.courses.length - 1].id + 1 : 1
    if (req.body.title) {
        db.courses.push({id: newId, title: req.body.title})
        res.status(HTTP_STATUSE.OK_200).send({id: newId, title: req.body.title})
    } else {
        res.sendStatus(400)
    }
})

app.listen(port, () => {
    console.log('hey epta')
})
