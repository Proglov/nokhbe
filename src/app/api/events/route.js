import { getTrueImagesUrl } from '@/actions/image';
import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'
import { getParams, getQueries } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        const session = await getUser()
        if (session.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unauthorized", error }, { status: 400 })
        const body = await req.json()
        const { title, description, imagesURL, tags, createdBy, telegram, eventAt } = body;
        const newEvents = await prisma.events.create({
            data: {
                title,
                description,
                imagesURL,
                tags,
                createdBy,
                telegram,
                eventAt
            }
        })
        return NextResponse.json(newEvents);
    } catch (error) {
        return NextResponse.json({ message: "POST A NEW EVENT ERROR", error }, { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        const { page, perPage, justPositiveStatus } = getParams(req.url)
        const { queryObj, countObj } = getQueries(page, perPage, justPositiveStatus)

        const events = await prisma.events.findMany(queryObj)
        const count = await prisma.events.count(countObj);

        const eventsWithTrueImages = await getTrueImagesUrl(events)

        return NextResponse.json({ events: eventsWithTrueImages, count });
    } catch (error) {
        return NextResponse.json({ message: "GET EVENT ERROR", error }, { status: 500 })
    }
}