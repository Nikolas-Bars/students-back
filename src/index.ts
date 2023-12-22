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

const db = {
    courses:
        [
            {id: 1, title: 'front-end'},
            {id: 2, title: 'back-end'},
            {id: 3, title: 'qa'},
            {id: 4, title: 'dev'}
        ]
}

app.get('/', (req, res) => {
    res.json('Hi mf')
})

app.get('/courses', (req, res) => {
    let foundedCourses = db.courses
    if(req.query.title) {
        foundedCourses = foundedCourses.filter((el) => el.title.indexOf(req.query.title) > -1)
    }

    res.json(foundedCourses)
})

app.get('/courses/:id', (req, res) => {
    const foundedCourse = db.courses.find((el) => el.id === +req.params.id)
    if (!foundedCourse) {
        res.sendStatus(HTTP_STATUSE.NOT_FOUND_404)
    }
    res.json(foundedCourse)
})

app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSE.BAD_REQUEST_400)
        return
    }
    const newCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(newCourse)

    res.status(HTTP_STATUSE.CREATED_201).json(newCourse)
})

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter((el) => el.id !== +req.params.id)

    res.sendStatus(204)
})

app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSE.BAD_REQUEST_400)
        return
    }
    const foundedCourse = db.courses.find((el) => el.id === +req.params.id)

    if (!foundedCourse) {
        res.sendStatus(HTTP_STATUSE.NOT_FOUND_404)
    }

    foundedCourse.title = req.body.title

    res.sendStatus(HTTP_STATUSE.NO_CONTENT_204)
})

app.listen(port, () => {
    console.log('hey epta')
})
