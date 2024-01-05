import {CourseType} from "../routes/courses";

export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: any[]
}

export const videos_db =
        [
            {
                id: 0,
                title: 'string',
                author: 'string',
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: 'string',
                publicationDate: 'string',
                availableResolutions: [
                    "P144"
                ]
            }
        ] as VideosType[]

