import { NextResponse } from "next/server";
import prisma from '@/lib/prismaDB'
import { hash } from "bcrypt"

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        // validation goes here!
        if (username.length < 8 || password.length < 8) {
            return NextResponse.json({ user: null, message: "نام کاربری و پسوورد باید بیش از هشت کاراکتر باشند!" }, { status: 409 })
        }

        //check if email already exists
        const existingUserByEmail = await prisma.NormalUser.findUnique({
            where: { email }
        })
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "کاربری با این ایمیل قبلا وارد شده است" }, { status: 409 })
        }

        //check if username already exists
        const existingUserByUsername = await prisma.NormalUser.findUnique({
            where: { username }
        })
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "این نام کاربری قبلا استفاده شده است" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await prisma.NormalUser.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ user: { username: username, email: email }, message: "New User Has Been Created" }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'SomeThing went wrong!' }, { status: 500 })
    }
}
