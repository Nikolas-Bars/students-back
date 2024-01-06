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
            publicationDate: (() => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                return date.toISOString();
            })(),
            availableResolutions: [] as string[]
        }

        if (!req.body.title || !req.body.title.trim().length || req.body.title.trim().length > 40) {
            error.errorsMessages.push({message: 'incorrect title value', field: 'title'})
        } else {
            newVideos.title = req.body.title
        }
        if (!req.body.author || !req.body.author.trim().length || req.body.author.trim().length > 20) {
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
            console.log(newVideos, 'newVideos')
            videos_db.push(newVideos)
            res.status(201).json(newVideos)
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

        console.log(1)
        const video = videos_db.find((v) => {
            return v.id === +req.params.id
        })
        console.log(2)
        if (video) {
            console.log(3)
            if (typeof req.body.title !== "undefined") {
                console.log(5)
                if (typeof req.body.title === "string" && req.body.title.trim().length && req.body.title.trim().length < 40) {
                    video.title = req.body.title
                } else {
                    error.errorsMessages.push({message: 'incorrect title value', field: 'title'})
                }
            }
            if (typeof req.body.minAgeRestriction !== "undefined") {
                if (typeof req.body.minAgeRestriction === "number" ||req.body.minAgeRestriction === null || (req.body.minAgeRestriction >= 1 && req.body.minAgeRestriction <= 18)) {
                    console.log(6)
                    video.minAgeRestriction = req.body.minAgeRestriction
                } else {
                    error.errorsMessages.push({message: 'incorrect minAgeRestriction value', field: 'minAgeRestriction'})
                }
            }
            if (typeof req.body.author !== "undefined") {
                if (typeof req.body.author === "string" && req.body.author.trim().length) {
                    video.author = req.body.author
                } else {
                    error.errorsMessages.push({message: 'incorrect author value', field: 'author'})
                }
            }
            if (typeof req.body.canBeDownloaded !== "undefined") {
                if (typeof req.body.canBeDownloaded === "boolean") {
                    video.canBeDownloaded = req.body.canBeDownloaded
                } else {
                    error.errorsMessages.push({message: 'incorrect canBeDownloaded value', field: 'canBeDownloaded'})
                }
            }

            if(typeof req.body.publicationDate !== "undefined") {
                console.log(7)
                const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
                const isValidFormat = regex.test(req.body.publicationDate);

                if (isValidFormat) {
                    video.publicationDate = req.body.publicationDate
                } else {
                    error.errorsMessages.push({message: 'incorrect publicationDate value', field: 'publicationDate'})
                }
            }

            if (typeof req.body.availableResolutions !== "undefined") {
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
            console.log(22222)
            if(error.errorsMessages.length) {
                res.status(400).json(error)
            } else {
                res.sendStatus(204)
            }
        } else {
            res.sendStatus(404)
        }
    })

    return videosRouter
}