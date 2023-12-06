import { NextResponse } from "next/server";
import prisma from '@/lib/prismaDB'
import { compare, hash } from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, oldPassword, newPassword } = body;

        // validation goes here!
        if (newPassword.length < 8) {
            return NextResponse.json({ message: "پسوورد باید بیش از هشت کاراکتر باشد!" }, { status: 409 })
        }

        //check if email doesn't exist
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
        })
        if (!existingUserByEmail)
            return NextResponse.json({ message: "کاربری با این ایمیل موجود نمیباشد" }, { status: 409 })

        const passwordIsTrue = await compare(oldPassword, existingUserByEmail.password)

        if (!passwordIsTrue)
            return NextResponse.json({ message: "رمز فعلی وارد شده صحیح نمیباشد" }, { status: 409 })

        const hashedPassword = await hash(newPassword, 10)

        await prisma.user.update({
            data: {
                password: hashedPassword
            },
            where: { email }
        })

        return NextResponse.json({ message: "New Password Has Been Set Up" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'SomeThing went wrong!' }, { status: 500 })
    }
}
