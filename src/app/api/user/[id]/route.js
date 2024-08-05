import prisma from '@/lib/prismaDB'
import { getUserRole } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'

export const DELETE = async (_req, { params }) => {
    const { id } = params;
    try {
        const userRole = await getUserRole()
        if (userRole !== "Admin")
            return NextResponse.json({ message: "Unauthorized", error }, { status: 400 })

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
        const session = await getUser()
        const userRole = await getUserRole()
        if (userRole !== "Admin" && session?.user?.id !== id)
            return NextResponse.json({ message: "Unauthorized", error }, { status: 400 })

        const body = await req.json()
        const data = {
            email: body?.email,
            username: body?.username,
            role: body?.role,
            fullName: body?.fullName,
            nationalCode: body?.nationalCode,
            mobileNumber: body?.mobileNumber,
            phoneNumber: body?.phoneNumber,
            address: body?.address,
            postalCode: body?.postalCode,
            biography: body?.biography,
            education: body?.education,
            abilities: body?.abilities,
            club: body?.club,
            joinedAt: body?.joinedAt,
        }

        //only admin can change the role
        if (userRole === "Admin" && !!data?.role) data.role = role

        const updatedUser = await prisma.user.update({
            where: { id },
            data
        })
        if (!updatedUser) {
            return NextResponse.json({ message: `USER ${id} NOT FOUND` }, { status: 404 })
        }
        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ message: `PATCH USER ${id} ERROR`, error }, { status: 500 })
    }
}