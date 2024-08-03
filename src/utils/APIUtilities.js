import { getTrueImagesUrl } from '@/actions/image';
import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'

export const getUserRole = async () => {
    try {
        const userId = (await getUser()).user.id

        const user = await prisma.user.findUnique({ where: { id: userId } })

        return user.role
    } catch (error) {
        return null
    }
}

export const getQueries = (page, perPage, justPositiveStatus) => {
    let countObj = {}
    let queryObj = {
        orderBy: {
            createdAt: 'desc'
        },
    };
    if (!!page && !!perPage && typeof page === 'number' && typeof perPage === 'number') {
        queryObj = {
            ...queryObj,
            take: perPage,
            skip: perPage * (page - 1)
        }
    }
    if (!!justPositiveStatus && justPositiveStatus === "true") {
        queryObj = {
            ...queryObj,
            where: {
                status: true
            }
        }

        countObj = { where: { status: true } }
    }
    return { queryObj, countObj }
}

export const getParams = url => {
    const searchURL = new URL(url).search;
    const params = new URLSearchParams(searchURL)
    const page = parseInt(params.get("page"))
    const perPage = parseInt(params.get("perPage"))
    const justPositiveStatus = params.get("justPositiveStatus")
    const onlyCount = params.get("onlyCount")
    const withoutCount = params.get("withoutCount")
    const addNegativeStatusCount = params.get("addNegativeStatusCount")
    return { page, perPage, justPositiveStatus, onlyCount, withoutCount, addNegativeStatusCount }
}

export const GetRequest = async (type, url) => {
    try {
        const { page, perPage, justPositiveStatus, onlyCount, withoutCount, addNegativeStatusCount } = getParams(url)
        const { queryObj, countObj } = getQueries(page, perPage, justPositiveStatus)

        if (!!onlyCount && onlyCount === "true") {
            const count = await prisma[type].count(countObj);
            if (!!addNegativeStatusCount && addNegativeStatusCount === "true") {
                const negativeStatusCount = await prisma[type].count({ where: { status: false } });
                return { count, negativeStatusCount }
            }
            return { count }
        }

        const data = await prisma[type].findMany(queryObj)
        const dataWithTrueImages = await getTrueImagesUrl(data)

        if (!!withoutCount && withoutCount === "true") {
            return { data: dataWithTrueImages }
        }

        const count = await prisma[type].count(countObj);

        if (!!addNegativeStatusCount && addNegativeStatusCount === "true") {
            const negativeStatusCount = await prisma[type].count({ where: { status: false } });
            return { data: dataWithTrueImages, count, negativeStatusCount }
        }

        return { data: dataWithTrueImages, count }
    } catch (error) {
        return { message: `GET ${type.toUpperCase()} ERROR`, error, status: 500 }
    }
}

export const PostRequest = async (type, body) => {
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return { message: "Unuthorized", status: 403 }
        const { title, description, imagesURL, tags, createdBy, telegram } = body;
        const obj = { title, description, imagesURL, tags, createdBy, telegram }

        if (type === 'events') obj.eventAt = body.eventAt

        const newData = await prisma[type].create({ data: obj })
        const dataWithTrueImages = await getTrueImagesUrl(newData)
        return { data: dataWithTrueImages }
    } catch (error) {
        return { message: `POST A NEW ${type.toUpperCase()} ERROR`, error, status: 500 }
    }
}