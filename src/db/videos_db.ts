import {CourseType} from "../routes/courses";

export type VideosType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export const videos_db =
        [
            {
                id: 1,
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

