import express, {Request, Response} from 'express'

const app = express()

const port = process.env.PORT || 3004

const JsonMiddleWare = express.json()

app.use(JsonMiddleWare)

const HTTP_STATUSE = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}

let db = {
    courses:
        [
            {id: 1, title: 'front-end'},
            {id: 2, title: 'back-end'},
            {id: 3, title: 'qa'},
            {id: 4, title: 'dev'}
        ]
} as any

app.get('/', (req, res) => {
    res.json('Hi mf')
})




app.get('/courses', (req: Request, res: Response) => {
    let foundedCourses = db.courses
    if(req.query.title) {
        foundedCourses = foundedCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1)
    }

    res.json(foundedCourses)
})

app.put('/courses', (req: Request,res:Response) => {
    if (db.courses.find((el) => el.id === +req.body.id)) {
        db.courses = db.courses.map((el) => {
            return el.id === +req.body.id ? {...el, title: req.body.title} : el
        })
        res.json(db)
    } else {
        res.send(HTTP_STATUSE.NO_CONTENT_204)
    }

})

app.listen(port, () => {
    console.log('hey epta')
})
