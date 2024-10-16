import { getUser } from '@/lib/getUser'
import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'


export const GET = async (req) => {
    try {
        const userId = (await getUser())?.user?.id

        if (!userId) return NextResponse.json({ message: "You are Not Authorized" }, { status: 401 })

        const select = {
            id: true,
            email: true,
            username: true,
            password: false,
            role: true,
            fullName: true,
            nationalCode: true,
            mobileNumber: true,
            phoneNumber: true,
            address: true,
            postalCode: true,
            biography: true,
            education: true,
            abilities: true,
            club: true,
            joinedAt: true,
        }
        const user = await prisma.user.findUnique({ where: { id: userId }, select })

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "GET ME ERROR", error }, { status: 500 })
    }
}