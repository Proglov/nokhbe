import { getTrueImagesUrl } from '@/actions/image';
import { getUser } from '@/lib/getUser'
import prisma from '@/lib/prismaDB'
import { getParams, getQueries } from '@/utils/APIUtilities';
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
        return NextResponse.json(await getTrueImagesUrl(newAnnouncements));
    } catch (error) {
        return NextResponse.json({ message: "POST A NEW ANNOUNCEMENT ERROR", error }, { status: 500 })
    }
}

export const GET = async (req) => {
    try {
        const { page, perPage, justPositiveStatus } = getParams(req.url)
        const { queryObj, countObj } = getQueries(page, perPage, justPositiveStatus)

        const announcements = await prisma.announcements.findMany(queryObj)
        const count = await prisma.announcements.count(countObj);

        const announcementsWithTrueImages = await getTrueImagesUrl(announcements)

        return NextResponse.json({ announcements: announcementsWithTrueImages, count });
    } catch (error) {
        return NextResponse.json({ message: "GET ANNOUNCEMENT ERROR", error }, { status: 500 })
    }
}