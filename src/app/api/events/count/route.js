import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const eventsSize = await prisma.events.count();
        const eventsNegativeStatusSize = await prisma.events.count({ where: { status: false } });
        const res = { "count": eventsSize, "negativeStatus": eventsNegativeStatusSize }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ message: "GET EVENTS SIZE ERROR", error }, { status: 500 })
    }
}
