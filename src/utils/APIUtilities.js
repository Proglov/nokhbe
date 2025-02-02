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

export const getQueries = (page, perPage, justPositiveStatus, tags) => {
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
    if (Array.isArray(tags) && !!tags.length) {
        queryObj = {
            ...queryObj,
            where: {
                ...queryObj.where,
                tags: {
                    hasSome: tags
                }
            }
        }
    }
    return { queryObj, countObj }
}

export const getTags = obj => {
    const newObj = Object.fromEntries(obj)
    return Object.keys(newObj).map(key => {
        if (key.startsWith('tag'))
            return newObj[key]
    }).filter(v => v !== undefined)
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
    const homePage = params.get("homePage")
    const tags = getTags(params)
    return { page, perPage, justPositiveStatus, onlyCount, withoutCount, addNegativeStatusCount, homePage, tags }
}

export const GetRequest = async (type, url) => {
    try {
        const { page, perPage, justPositiveStatus, onlyCount, withoutCount, addNegativeStatusCount, tags, homePage } = getParams(url)

        if (!!homePage && homePage === 'true') {
            if (!!tags && !!tags.length) {
                const query = {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 6,
                    skip: 0,
                    where: {
                        status: true
                    }
                }
                const data = await prisma[type].findMany({
                    ...query, where: {
                        ...query.where,
                        tags: {
                            hasSome: tags
                        }
                    }
                })
                const data2 = await prisma[type].findMany({
                    ...query, where: {
                        ...query.where,
                        NOT: {
                            tags: {
                                hasSome: tags
                            }
                        }
                    }
                })
                const dataWithTrueImages = await getTrueImagesUrl([...data, ...data2])

                return { data: dataWithTrueImages }
            }
            else {
                const query = {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 12,
                    skip: 0,
                    where: {
                        status: true
                    }
                }
                const data = await prisma[type].findMany(query)
                const dataWithTrueImages = await getTrueImagesUrl(data)

                return { data: dataWithTrueImages }
            }
        }

        const { queryObj, countObj } = getQueries(page, perPage, justPositiveStatus, tags)

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

export const GetRequestDocumentAndBook = async (type, url) => {
    try {
        const { page, perPage } = getParams(url)


        const { queryObj, countObj } = getQueries(page, perPage)
        queryObj.orderBy = {}

        const data = await prisma[type].findMany(queryObj)

        const count = await prisma[type].count(countObj);

        return { data, count }
    } catch (error) {
        return { message: `GET ${type.toUpperCase()} ERROR`, error, status: 500 }
    }
}

const checkCredentials = (body, type) => {
    if (type === 'document') {
        if (!body?.name || !body?.writer || !body?.category || !body?.magazine)
            return { credentials: null, status: 400 }
        else return {
            status: 200,
            credentials: {
                name: body?.name,
                writer: body?.writer,
                magazine: body?.magazine,
                category: body?.category,
                link: body?.link
            }
        }

    } else if (type === 'book') {
        if (!body?.name || !body?.writer || !body?.category || !body?.publisher)
            return { credentials: null, status: 400 }
        else return {
            status: 200,
            credentials: {
                name: body?.name,
                writer: body?.writer,
                publisher: body?.publisher,
                category: body?.category,
                link: body?.link
            }
        }

    } else if (type === 'idea') {
        if (!body?.name, !body?.briefDiscription, !body?.discription, !body?.applicant, !body?.budget)
            return { credentials: null, status: 400 }
        else return {
            status: 200,
            credentials: {
                name: body?.name,
                briefDiscription: body?.briefDiscription,
                discription: body?.discription,
                applicant: body?.applicant,
                budget: body?.budget
            }
        }

    } else if (type === 'investor') {
        if (!body?.name, !body?.conditions, !body?.budget)
            return { credentials: null, status: 400 }
        else return {
            status: 200,
            credentials: {
                name: body?.name,
                conditions: body?.conditions,
                budget: body?.budget
            }
        }

    }
}

export const PostRequestDocumentAndBook = async (type, body) => {
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return { message: "Unauthorized", status: 403 }

        const { credentials, status } = checkCredentials(body, type);
        if (status !== 200)
            return { message: "invalid credentials", status: 400 }

        const newData = await prisma[type].create({ data: credentials })
        return { data: newData }
    } catch (error) {
        console.log(error);
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

export const DeleteByIdRequestDocumentAndBook = async (type, id) => {
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

        await prisma[type].delete({
            where: { id }
        })
        return { message: `${type.toUpperCase()} HAS BEEN DELETED`, status: 200 }
    } catch (error) {
        return { message: `DELETE ${type.toUpperCase()} ${id} ERROR`, error, status: 500 }
    }
}

export const PatchByIdRequestDocumentAndBook = async (type, body, id) => {
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return { message: "Unauthorized", status: 400 }


        const data = {
            name: body?.name,
            writer: body?.writer,
            category: body?.category,
            link: body?.link,
        }

        if (type === 'book') data.publisher = body?.publisher
        else if (type === 'document') data.magazine = body?.magazine

        const updateData = await prisma[type].update({
            where: { id },
            data
        })
        if (!updateData) {
            return { message: `${type.toUpperCase()} ${id} NOT FOUND`, status: 404 }
        }

        return { data: updateData, status: 200 }

    } catch (error) {
        console.log(error);
        return { message: `PATCH ${type.toUpperCase()} ${id} ERROR`, error, status: 500 }
    }
}