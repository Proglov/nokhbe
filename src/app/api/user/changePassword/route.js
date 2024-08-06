import { NextResponse } from "next/server";
import prisma from '@/lib/prismaDB'
import { compare, hash } from "bcrypt"
import { getUser } from "@/lib/getUser";



export async function POST(req) {
    try {
        const userId = (await getUser()).user.id

        const { id, newPassword, oldPassword } = await req.json();

        if (userId !== id)
            return NextResponse({ message: "Not Authorized" }, { status: 403 })

        // validation goes here!
        if (newPassword.length < 8) {
            return NextResponse({ message: "پسوورد باید بیش از هشت کاراکتر باشد!" }, { status: 409 })
        }

        //check if id doesn't exist
        const existingUserById = await prisma.user.findUnique({
            where: { id }
        })
        if (!existingUserById)
            return NextResponse({ message: "کاربری پیدا نشد" }, { status: 404 })

        const passwordIsTrue = await compare(oldPassword, existingUserById.password)


        if (!passwordIsTrue)
            return NextResponse({ message: "رمز فعلی وارد شده صحیح نمیباشد" }, { status: 409 })

        const hashedPassword = await hash(newPassword, 10)

        await prisma.user.update({
            data: {
                password: hashedPassword
            },
            where: { id }
        })

        return NextResponse({ message: "New Password Has Been Set Up" }, { status: 200 })

    } catch (error) {
        return NextResponse({ message: 'SomeThing went wrong!' }, { status: 500 })
    }
}
