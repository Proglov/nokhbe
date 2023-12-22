import { getUser } from '@/lib/getUser'
import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'


export const GET = async (req) => {
    const serarch = new URL(req.url).search;
    const params = new URLSearchParams(serarch)
    const page = parseInt(params.get("page"))
    const perPage = parseInt(params.get("perPage"))
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })

        if (!page || !perPage) {
            const users = await prisma.user.findMany({
                orderBy: {
                    joinedAt: 'desc'
                },
                select: {
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
            })
            return NextResponse.json(users);
        }
        const users = await prisma.user.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy: {
                joinedAt: 'desc'
            },
            select: {
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
        })
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: "GET USERS ERROR", error }, { status: 500 })
    }
}