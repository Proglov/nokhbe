import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        const body = await req.json()
        const { title, description, imageURL, tags, createdBy, telegram } = body;
        const newEvents = await prisma.events.create({
            data: {
                title,
                description,
                imageURL,
                tags,
                createdBy,
                telegram
            }
        })
        return NextResponse.json(newEvents);
    } catch (error) {
        return NextResponse.json({ message: "POST A NEW EVENT ERROR", error }, { status: 500 })
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
                const events = await prisma.events.findMany({
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
                return NextResponse.json(events);
            }
            const events = await prisma.events.findMany({
                take: perPage,
                skip: perPage * (page - 1),
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return NextResponse.json(events);
        }
        //else:
        if (!page || !perPage) {
            const events = await prisma.events.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    status: true
                }
            })
            return NextResponse.json(events);
        }
        const events = await prisma.events.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                status: true
            }
        })
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ message: "GET EVENT ERROR", error }, { status: 500 })
    }
}