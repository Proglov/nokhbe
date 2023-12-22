import { getUser } from '@/lib/getUser';
import prisma from '@/lib/prismaDB'
import { NextResponse } from 'next/server'

export const DELETE = async (_req, { params }) => {
    const { id } = params;
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        await prisma.user.delete({
            where: { id }
        })
        return NextResponse.json('USER HAS BEEN DELETED');
    } catch (error) {
        return NextResponse.json({ message: `DELETE USER ${id} ERROR`, error }, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { id } = params;
    try {
        const sessiion = await getUser()
        if (sessiion.user.role !== process.env.ADMIN_ROLE)
            return NextResponse.json({ message: "Unuthorized", error }, { status: 400 })
        const body = await req.json()
        const {
            email,
            username,
            role,
            fullName,
            nationalCode,
            mobileNumber,
            phoneNumber,
            address,
            postalCode,
            biography,
            education,
            abilities,
            club,
            joinedAt,
        } = body;
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email,
                username,
                role,
                fullName,
                nationalCode,
                mobileNumber,
                phoneNumber,
                address,
                postalCode,
                biography,
                education,
                abilities,
                club,
                joinedAt,
            }
        })
        if (!updatedUser) {
            return NextResponse.json({ message: `USER ${id} NOT FOUND` }, { status: 404 })
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ message: `PATCH USER ${id} ERROR`, error }, { status: 500 })
    }
}