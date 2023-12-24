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
        const newAnnouncements = await prisma.announcements.create({
            data: {
                title,
                description,
                imagesURL,
                tags,
                createdBy,
                telegram
            }
        })
        return NextResponse.json(newAnnouncements);
    } catch (error) {
        return NextResponse.json({ message: "POST A NEW ANNOUNCEMENT ERROR", error }, { status: 500 })
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
                const announcements = await prisma.announcements.findMany({
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return NextResponse.json(announcements);
            }
            const announcements = await prisma.announcements.findMany({
                take: perPage,
                skip: perPage * (page - 1),
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return NextResponse.json(announcements);
        }
        //else:
        if (!page || !perPage) {
            const announcements = await prisma.announcements.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    status: true
                }
            })
            return NextResponse.json(announcements);
        }
        const announcements = await prisma.announcements.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                status: true
            }
        })
        return NextResponse.json(announcements);
    } catch (error) {
        return NextResponse.json({ message: "GET ANNOUNCEMENT ERROR", error }, { status: 500 })
    }
}