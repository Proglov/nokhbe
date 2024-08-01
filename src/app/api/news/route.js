import { getTrueImagesUrl } from '@/actions/image'
import { getUser } from '@/lib/getUser'
import prisma from '@/lib/prismaDB'
import { getParams, getQueries } from '@/utils/APIUtilities'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        const body = await req.json()
        const { title, description, imagesURL, tags, createdBy, telegram } = body;
        const newNews = await prisma.news.create({
            data: {
                title,
                description,
                imagesURL,
                tags,
                createdBy,
                telegram
            }
        })
        return NextResponse.json(await getTrueImagesUrl(newNews));
    } catch (error) {
        return NextResponse.json({ message: "POST A NEW NEWS ERROR", error }, { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        const { page, perPage, justPositiveStatus } = getParams(req.url)
        const { queryObj, countObj } = getQueries(page, perPage, justPositiveStatus)

        const news = await prisma.news.findMany(queryObj)
        const count = await prisma.news.count(countObj);

        const newsWithTrueImages = await getTrueImagesUrl(news)

        return NextResponse.json({ news: newsWithTrueImages, count });
    } catch (error) {
        return NextResponse.json({ message: "GET NEWS ERROR", error }, { status: 500 })
    }
}