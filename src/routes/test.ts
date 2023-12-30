import {Express, Request, Response} from "express";
import express from 'express'
import {CourseType} from "./courses";
import {HTTP_STATUSE} from "../utils";

export const getTestRouter =(db: { courses: CourseType[] })=> {
    const testRouter = express.Router()
    testRouter.delete('/data', (req: Request, res: Response) => {
        db.courses = []
        res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
    })

    return testRouter
}