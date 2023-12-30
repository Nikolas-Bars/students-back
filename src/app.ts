import express from "express";
import {getCoursesRoutes} from "./routes/courses";
import {getTestRouter} from "./routes/test";
import {db} from "./db/db";
import {getBooksRouter} from "./routes/books";

export const app = express()

export const JsonMiddleWare = express.json()

app.use(JsonMiddleWare)

app.get('/', (req, res) => {
    res.json('Hi mf')
})

const coursesRouter = getCoursesRoutes(db)

const testRouter = getTestRouter(db)

const bookRouter = getBooksRouter(db)

app.use("/courses", coursesRouter)

app.use("/__test__", testRouter)

app.use("/books", bookRouter)