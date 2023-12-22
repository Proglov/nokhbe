import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const usersSize = await prisma.user.count();
        return NextResponse.json(usersSize);
    } catch (error) {
        return NextResponse.json({ message: "GET USERS SIZE ERROR", error }, { status: 500 })
    }
}
