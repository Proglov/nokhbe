import { getTrueImagesUrl, deleteImages } from '@/actions/image';
import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async (_req, { params }) => {
    const { id } = params;
    try {
        const announcements = await prisma.announcements.findUnique({
            where: { id }
        })
        if (!announcements) {
            return NextResponse.json({ message: `ANNOUNCEMENT ${id} NOT FOUND` }, { status: 404 })
        }

        // Increment views by 1
        await prisma.announcements.update({
            where: { id },
            data: { views: announcements.views + 1 }
        });

        return NextResponse.json(await getTrueImagesUrl(announcements));
    } catch (error) {
        return NextResponse.json({ message: `GET ANNOUNCEMENT ${id} ERROR`, error }, { status: 500 })
    }
}


export const DELETE = async (_req, { params }) => {
    const { id } = params;
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        const announcement = await prisma.announcements.findUnique({ where: { id } });

        if (!announcement) return NextResponse.json({ message: `ANNOUNCEMENT ${id} NOT FOUND` }, { status: 404 });

        // Call deleteImages with the URLs of the images associated with the announcement
        if (announcement?.imagesURL?.length > 0) await deleteImages(announcement.imagesURL);

        await prisma.announcements.delete({
            where: { id }
        })
        return NextResponse.json('ANNOUNCEMENT HAS BEEN DELETED');
    } catch (error) {
        return NextResponse.json({ message: `DELETE ANNOUNCEMENT ${id} ERROR`, error }, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { id } = params;
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        const body = await req.json()
        const { title, description, imagesURL, tags, createdBy, telegram, status, views } = body;
        const updateAnnouncements = await prisma.announcements.update({
            where: { id },
            data: {
                title,
                description,
                imagesURL,
                tags,
                createdBy,
                telegram,
                status,
                views
            }
        })
        if (!updateAnnouncements) {
            return NextResponse.json({ message: `ANNOUNCEMENT ${id} NOT FOUND` }, { status: 404 })
        }
        return NextResponse.json(await getTrueImagesUrl(updateAnnouncements));
    } catch (error) {
        return NextResponse.json({ message: `PATCH ANNOUNCEMENT ${id} ERROR`, error }, { status: 500 })
    }
}