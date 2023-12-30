import {Request, Response} from "express";
import express from "express";
import {CourseType} from "./courses";

export const getBooksRouter =(db: { courses: CourseType[] })=> {
    const router = express.Router()

    router.get('/', (req: Request, res: Response) => {
        res.json(db.courses)
    })
    router.get('/:id', (req: Request, res: Response) => {
        res.json({title: 'fucking id = ' + req.params.id})
    })

    return router
}