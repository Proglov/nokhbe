import prisma from '@/lib/prismaDB'
import { getParams, getQueries, getUserRole } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'


export const GET = async (req) => {
    const { page, perPage } = getParams(req.url)
    const { queryObj } = getQueries(page, perPage)
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return NextResponse.json({ message: "Unauthorized", error }, { status: 400 })

        queryObj.orderBy = {
            joinedAt: 'desc'
        }
        queryObj.select = {
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
        const users = await prisma.user.findMany(queryObj)
        const count = await prisma.user.count();
        return NextResponse.json({ users, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "GET USERS ERROR", error }, { status: 500 })
    }
}