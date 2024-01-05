import express, {Request, Response} from "express";
import {VideosType} from "../db/videos_db";

export const getVideosRoutes =(videos_db: VideosType[])=> {

    const videosRouter = express.Router()

    videosRouter.get('/', (req: Request, res: Response<VideosType[]>) => {

        res.json(videos_db)

    })

    videosRouter.post('/', (req: Request, res: Response) => {

        type ErrorType = {
            message: string
            field: string
        }

        const error = {
            errorsMessages: [] as ErrorType[]
        } as { errorsMessages: ErrorType[] }

        const newVideos = {
            id: videos_db.length + 1,
            title: '',
            author: '',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: []
        }

        if (!req.body.title || !req.body.title.trim().length) {
            error.errorsMessages.push({message: 'incorrect title value', field: 'title'})
        } else {
            newVideos.title = req.body.title
        }
        if (!req.body.author || !req.body.author.trim().length) {
            error.errorsMessages.push({message: 'incorrect author value', field: 'author'})
        } else {
            newVideos.author = req.body.author
        }
        if (!Array.isArray(req.body.availableResolutions)) {
            newVideos.availableResolutions = []
        } else {
            newVideos.availableResolutions = req.body.availableResolutions
        }

        if(error.errorsMessages.length) {
            res.status(400).json(error)
        } else {
            res.json(newVideos)
        }
    })

    return videosRouter
}