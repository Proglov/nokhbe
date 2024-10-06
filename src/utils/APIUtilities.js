import { deleteImages, getTrueImagesUrl } from '@/actions/image';
import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'

export const debugServerActionError = obj => JSON.parse(JSON.stringify(obj))

export const getUserRole = async () => {
    try {
        const userId = (await getUser()).user.id

        const user = await prisma.user.findUnique({ where: { id: userId } })

        return user.role
    } catch (error) {
        return null
    }
}

export const getUserRoleAndClubs = async () => {
    try {
        const userId = (await getUser()).user.id

        const user = await prisma.user.findUnique({ where: { id: userId } })

        return { clubs: user.club, role: user.role }
    } catch (error) {
        return {}
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
        if (userRole !== "Admin" && userRole !== 'clubBoss')
            return { message: "Unauthorized", status: 403 }

        const data = {
            title: body?.title,
            description: body?.description,
            imagesURL: body?.imagesURL,
            tags: body?.tags,
            createdBy: userRole,
            telegram: body?.telegram
        }

        if (type === 'events') data.eventAt = body?.eventAt

        const newData = await prisma[type].create({ data })
        const dataWithTrueImages = await getTrueImagesUrl(newData)
        return { data: dataWithTrueImages }
    } catch (error) {
        return { message: `POST A NEW ${type.toUpperCase()} ERROR`, error, status: 500 }
    }
}

export const GetByIdRequest = async (type, id) => {
    try {
        const data = await prisma[type].findUnique({
            where: { id }
        })
        if (!data) {
            return { message: `${type.toUpperCase()} ${id} NOT FOUND`, status: 404 }
        }
        // Increment views by 1
        await prisma[type].update({
            where: { id },
            data: { views: data.views + 1 }
        });

        const dataWithTrueImages = await getTrueImagesUrl(data)

        return { data: dataWithTrueImages, status: 200 }
    } catch (error) {
        return { message: `GET ${type.toUpperCase()} ${id} ERROR`, error, status: 500 }
    }
}

export const DeleteByIdRequest = async (type, id) => {
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return { message: "Unauthorized", error, status: 400 }

        const data = await prisma[type].findUnique({
            where: { id }
        })
        if (!data) {
            return { message: `${type.toUpperCase()} ${id} NOT FOUND`, status: 404 }
        }

        // Call deleteImages with the URLs of the images associated with the data
        if (data?.imagesURL?.length > 0) await deleteImages(data.imagesURL);

        await prisma[type].delete({
            where: { id }
        })
        return { message: `${type.toUpperCase()} HAS BEEN DELETED`, status: 200 }
    } catch (error) {
        return { message: `DELETE ${type.toUpperCase()} ${id} ERROR`, error, status: 500 }
    }
}

export const PatchByIdRequest = async (type, body, id) => {
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return { message: "Unauthorized", status: 400 }

        const data = {
            title: body?.title,
            description: body?.description,
            imagesURL: body?.imagesURL,
            tags: body?.tags,
            createdBy: body?.createdBy,
            telegram: body?.telegram,
            status: body?.status,
            views: body?.views,
        }

        if (type === 'events') data.eventAt = body?.eventAt

        const updateData = await prisma[type].update({
            where: { id },
            data
        })
        if (!updateData) {
            return { message: `${type.toUpperCase()} ${id} NOT FOUND`, status: 404 }
        }

        const dataWithTrueImages = await getTrueImagesUrl(updateData)
        return { data: dataWithTrueImages, status: 200 }

    } catch (error) {
        return { message: `PATCH ${type.toUpperCase()} ${id} ERROR`, error, status: 500 }
    }
}