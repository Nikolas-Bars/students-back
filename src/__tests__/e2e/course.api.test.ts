import request from 'supertest'
import {response} from "express";
import {CourseCreateModel} from "../../models/CourseCreateModel";
import {app} from "../../app";

describe('/course', () => {
    // вызываем эндпоинт который зачистит стартовые данные
    beforeAll(async () => {
        await request(app)
            .delete('/__test__/data')
    })

    it('should be return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(200, [])
    })

    it('should be return 404 for not exists course', async () => {
        await request(app)
            .get('/courses/999')
            .expect(404)
    })

    it('should`nt create with incorrect data', async () => {
        const data: CourseCreateModel = {title: ''}
        await request(app)
            .post('/courses')
            .send(data)
            .expect(400)
    })

    let createdCourse: any = null

    it('should create with correct data', async () => {
        const data: CourseCreateModel = {title: 'EU'}
        const response = await request(app)
            .post('/courses')
            .send(data)
            .expect(200)

        createdCourse = response.body

        expect(createdCourse).toEqual({
            title: 'EU',
            id:  expect.any(Number)
        })

        await request(app)
            .get('/courses')
            .expect(200, [createdCourse])
    })

    //let updatedCourse: any = null

    it('should be updated', async () => {
        const data = {title: 'HP', id: createdCourse.id}
        const response = await request(app)
            .put('/courses')
            .send(data)
            .expect(200)

        createdCourse = response.body

        expect(createdCourse).toEqual({
            title: 'HP',
            id:  expect.any(Number)
        })
    })

    it('should get course by id', async () => {
        const response = await request(app)
            .get('/courses/5')
            .expect(200)
        const receivedCourse = response.body

        expect(receivedCourse).toEqual({
            title: 'EU',
            id:  expect.any(Number)
        })
    })
    it('should be delete course by id', async () => {
        const response = await request(app)
            .delete('/courses/3')
            .expect(200)

        const receivedCourse = response.body

        expect(receivedCourse).toEqual([
            {id: 5, title: 'EU'}
        ])
    })
})