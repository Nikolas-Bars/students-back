import request from 'supertest'
import {response} from "express";
import {CourseCreateModel} from "../../models/CourseCreateModel";
import {app} from "../../app";
import {VideosType} from "../../db/videos_db";

describe('/videos', () => {
    // вызываем эндпоинт который зачистит стартовые данные
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data').expect(204)
    })

    it('should be return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    let createdVideo = {} as VideosType;

    it('should be create and return new videos object', async () => {

        const newVideo = {
            title: 'Новое супер видео',
            author: 'Крутой перец',
            availableResolutions: ["P144"]
        }

        const response = await request(app).post('/videos').send(newVideo).expect(200)

        createdVideo = response.body

        expect(createdVideo).toEqual({
            id: 1,
            title: 'Новое супер видео',
            author: 'Крутой перец',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144"] as string[]
        })
    })

    it('should be get video by id', async () => {
        const response = await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(200)

        expect(response.body).toEqual(response.body)
    })

    it('should be update video by id', async () => {
        const data = {
            title: 'Новый супер title',
            publicationDate: "2024-01-06T07:23:20.164Z",
            minAgeRestriction: 20
        }
        const response = await request(app)
            .put('/videos/' + createdVideo.id)
            .send(data)
            .expect(200)
        expect(response.body).toEqual({
            id: 1,
            title: 'Новый супер title',
            author: 'Крутой перец',
            canBeDownloaded: false,
            minAgeRestriction: 20,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ["P144"] as string[]
        })
    })

    it('should be delete video by id', async () => {
        await request(app)
            .delete('/videos/' + createdVideo.id)
            .expect(204)

    })
})





















