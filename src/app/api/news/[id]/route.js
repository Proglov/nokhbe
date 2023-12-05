import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async (_req, { params }) => {
    const { id } = params;
    try {
        const news = await prisma.news.findUnique({
            where: { id }
        })
        if (!news) {
            return NextResponse.json({ message: `NEWS ${id} NOT FOUND` }, { status: 404 })
        }

        // Increment views by 1
        const updatedNews = await prisma.news.update({
            where: { id },
            data: { views: news.views + 1 }
        });

        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ message: `GET NEWS ${id} ERROR`, error }, { status: 500 })
    }
}


export const DELETE = async (_req, { params }) => {
    const { id } = params;
    try {
        await prisma.news.delete({
            where: { id }
        })
        return NextResponse.json('NEWS HAS BEEN DELETED');
    } catch (error) {
        return NextResponse.json({ message: `DELETE NEWS ${id} ERROR`, error }, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { id } = params;
    try {
        const body = await req.json()
        const { title, description, imageURL, tags, createdBy, telegram, status, views } = body;
        const updateNews = await prisma.news.update({
            where: { id },
            data: {
                title,
                description,
                imageURL,
                tags,
                createdBy,
                telegram,
                status,
                views
            }
        })
        if (!updateNews) {
            return NextResponse.json({ message: `NEWS ${id} NOT FOUND` }, { status: 404 })
        }
        return NextResponse.json(updateNews);
    } catch (error) {
        return NextResponse.json({ message: `PATCH NEWS ${id} ERROR`, error }, { status: 500 })
    }
}