import express from "express";
import {getCoursesRoutes} from "./routes/courses";
import {getTestRouter} from "./routes/test";
import {getTestVideoRouter} from "./routes/test";
import {db} from "./db/db";
import {videos_db} from "./db/videos_db";
import {getBooksRouter} from "./routes/books";
import {getVideosRoutes} from "./routes/videos";
import {productsRouter} from "./routes/products";
import {productDb} from "./db/productDb";

export const app = express()

export const JsonMiddleWare = express.json()

app.use(JsonMiddleWare)

app.get('/', (req, res) => {
    res.json('Hello friend!!! How are you bro?')
})

const coursesRouter = getCoursesRoutes(db)

const productRouter = productsRouter(productDb)

const videosRouter = getVideosRoutes(videos_db)

const testRouter = getTestRouter(db)

const testVideoRouter = getTestVideoRouter(videos_db)

const bookRouter = getBooksRouter(db)

app.use("/products", productRouter)

app.use("/courses", coursesRouter)

app.use("/videos", videosRouter)

app.use("/__test__", testRouter)

app.use("/testing", testVideoRouter)

app.use("/books", bookRouter)