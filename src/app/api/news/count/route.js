import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const newsSize = await prisma.news.count();
        const newsNegativeStatusSize = await prisma.news.count({ where: { status: false } });
        const res = { "count": newsSize, "negativeStatus": newsNegativeStatusSize }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ message: "GET NEWS SIZE ERROR", error }, { status: 500 })
    }
}
