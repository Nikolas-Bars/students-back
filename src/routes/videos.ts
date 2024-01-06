import express, {Request, Response} from "express";
import {VideosType} from "../db/videos_db";

const AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"] as string[]

type ErrorType = {
    message: string
    field: string
}

export const getVideosRoutes =(videos_db: VideosType[])=> {

    const videosRouter = express.Router()

    videosRouter.get('/', (req: Request, res: Response<VideosType[]>) => {

        res.json(videos_db)

    })

    videosRouter.post('/', (req: Request, res: Response) => {

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
            availableResolutions: [] as string[]
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

        if (Array.isArray(req.body.availableResolutions)) {
            req.body.availableResolutions.forEach((el: string) => {
                if (AvailableResolutions.includes(el)) {
                    newVideos.availableResolutions.push(el)
                } else {
                    newVideos.availableResolutions = []
                    return
                }
            })
        }

        if(error.errorsMessages.length) {
            res.status(400).json(error)
        } else {
            videos_db.push(newVideos)
            res.json(newVideos)
        }
    })

    videosRouter.get('/:id', (req: Request, res: Response)=> {

        const foundedVideos = videos_db.find((el) => {
            return el.id === +req.params.id
        })

        if (foundedVideos) {
            res.json(foundedVideos)
        } else {
            res.sendStatus(404)
        }
    })

    videosRouter.delete('/:id', (req: Request, res: Response)=> {

        const foundedVideos = videos_db.find((el) => {
            return el.id === +req.params.id
        })

        if (foundedVideos) {
            videos_db = videos_db.filter((el) => el.id !== +req.params.id)
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

    videosRouter.put('/:id', (req: Request, res: Response) => {

        const error = {
            errorsMessages: [] as ErrorType[]
        } as { errorsMessages: ErrorType[] }

        const video = videos_db.find((v) => {
            return v.id === +req.params.id
        })

        if (video) {
            if (req.body.title) {
                if (typeof req.body.title === "string" && req.body.title.trim().length) {
                    video.title = req.body.title
                } else {
                    error.errorsMessages.push({message: 'incorrect title value', field: 'title'})
                }
            }
            if (req.body.minAgeRestriction) {
                if (typeof req.body.minAgeRestriction === "number") {
                    video.minAgeRestriction = req.body.minAgeRestriction
                } else {
                    error.errorsMessages.push({message: 'incorrect minAgeRestriction value', field: 'minAgeRestriction'})
                }
            }
            if (req.body.author) {
                if (typeof req.body.author === "string" && req.body.author.trim().length) {
                    video.author = req.body.author
                } else {
                    error.errorsMessages.push({message: 'incorrect author value', field: 'author'})
                }
            }

            if (req.body.canBeDownloaded) {
                if (typeof req.body.author === "boolean") {
                    video.canBeDownloaded = req.body.canBeDownloaded
                } else {
                    error.errorsMessages.push({message: 'incorrect canBeDownloaded value', field: 'canBeDownloaded'})
                }
            }

            if(req.body.publicationDate) {
                const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
                const isValidFormat = regex.test(req.body.publicationDate);

                if (isValidFormat) {
                    video.publicationDate = req.body.publicationDate
                } else {
                    error.errorsMessages.push({message: 'incorrect publicationDate value', field: 'publicationDate'})
                }
            }

            if (req.body.availableResolutions) {
                if (Array.isArray(req.body.availableResolutions)) {
                    const resol = [] as string[]
                    req.body.availableResolutions.forEach((el: string) => {
                        if (AvailableResolutions.includes(el)) {
                            resol.push(el)
                            if(req.body.availableResolutions.length === resol.length) video.availableResolutions = resol
                        } else {
                            return
                        }
                    })
                } else {
                    error.errorsMessages.push({message: 'incorrect availableResolutions value', field: 'availableResolutions'})
                }
            }
        }

        if(error.errorsMessages.length) {
            res.json(error)
        } else {
            res.json(video)
        }
    })

    return videosRouter
}