import { getTrueImagesUrl } from '@/actions/image'
import { getUser } from '@/lib/getUser'
import prisma from '@/lib/prismaDB'
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
    const serarch = new URL(req.url).search;
    const params = new URLSearchParams(serarch)
    const page = parseInt(params.get("page"))
    const perPage = parseInt(params.get("perPage"))
    const justPositiveStatus = params.get("justPositiveStatus")
    try {
        if (!justPositiveStatus || justPositiveStatus === "false") {
            if (!page || !perPage) {
                const news = await prisma.news.findMany({
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return NextResponse.json(await getTrueImagesUrl(news));
            }
            const news = await prisma.news.findMany({
                take: perPage,
                skip: perPage * (page - 1),
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return NextResponse.json(await getTrueImagesUrl(news));
        }
        //else:
        if (!page || !perPage) {
            const news = await prisma.news.findMany({
                where: {
                    status: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return NextResponse.json(await getTrueImagesUrl(news));
        }
        const news = await prisma.news.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                status: true
            }
        })
        return NextResponse.json(await getTrueImagesUrl(news));

    } catch (error) {
        return NextResponse.json({ message: "GET NEWS ERROR", error }, { status: 500 })
    }
}