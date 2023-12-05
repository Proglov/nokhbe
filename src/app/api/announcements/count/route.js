import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const announcementsSize = await prisma.announcements.count();
        const announcementsNegativeStatusSize = await prisma.announcements.count({ where: { status: false } });
        const res = { "count": announcementsSize, "negativeStatus": announcementsNegativeStatusSize }
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ message: "GET ANNOUNCEMENTS SIZE ERROR", error }, { status: 500 })
    }
}
