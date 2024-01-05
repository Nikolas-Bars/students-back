import request from 'supertest'
import {response} from "express";
import {CourseCreateModel} from "../../models/CourseCreateModel";
import {app} from "../../app";

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

    it('should be create and return new videos object', async () => {

        const newVideo = {
            title: 'Новое супер видео',
            author: '',
            availableResolutions: ["P144"]
        }

        await request(app).post('/videos').send(newVideo).expect(400,
            {
            id: 1,
            title: 'Новое супер видео',
            author: 'Крутой перец',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: 'string',
            publicationDate: 'string',
            availableResolutions: ["P144"]
        })
    })
})