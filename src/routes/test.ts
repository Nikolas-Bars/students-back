import {Express, Request, Response} from "express";
import express from 'express'
import {CourseType} from "./courses";
import {HTTP_STATUSE} from "../utils";
import {VideosType} from "../db/videos_db";

export const getTestRouter =(db: { courses: CourseType[] })=> {
    const testRouter = express.Router()
    testRouter.delete('/data', (req: Request, res: Response) => {
        db.courses = []
        res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
    })

    return testRouter
}

export const getTestVideoRouter =(db: VideosType[] )=> {

    const testRouter = express.Router()

    testRouter.delete('/all-data', (req: Request, res: Response) => {
        db.length = 0
        res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
    })
    return testRouter
}