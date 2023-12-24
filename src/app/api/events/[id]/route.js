import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async (_req, { params }) => {
    const { id } = params;
    try {
        const events = await prisma.events.findUnique({
            where: { id }
        })
        if (!events) {
            return NextResponse.json({ message: `EVENT ${id} NOT FOUND` }, { status: 404 })
        }
        // Increment views by 1
        const updatedEvents = await prisma.events.update({
            where: { id },
            data: { views: events.views + 1 }
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ message: `GET EVENT ${id} ERROR`, error }, { status: 500 })
    }
}


export const DELETE = async (_req, { params }) => {
    const { id } = params;
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        await prisma.events.delete({
            where: { id }
        })
        return NextResponse.json('EVENT HAS BEEN DELETED');
    } catch (error) {
        return NextResponse.json({ message: `DELETE EVENT ${id} ERROR`, error }, { status: 500 })
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
        const updateEvents = await prisma.events.update({
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
        if (!updateEvents) {
            return NextResponse.json({ message: `EVENT ${id} NOT FOUND` }, { status: 404 })
        }
        return NextResponse.json(updateEvents);
    } catch (error) {
        return NextResponse.json({ message: `PATCH EVENT ${id} ERROR`, error }, { status: 500 })
    }
}