import { NextResponse } from "next/server";
import prisma from '@/lib/prismaDB'
import { setMailOptions, transporter } from "@/lib/nodemailer";
import { hash } from "bcrypt"


function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters.charAt(randomIndex);
        randomString += randomCharacter;
    }

    return randomString;
}


async function changePassword(body) {
    try {
        const { email, newPassword } = body;

        // validation goes here!
        if (newPassword.length < 8) {
            return { message: "پسوورد باید بیش از هشت کاراکتر باشد!", status: 409 }
        }

        //check if email doesn't exist
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
        })
        if (!existingUserByEmail)
            return { message: "کاربری با این ایمیل موجود نمیباشد", status: 404 }


        const hashedPassword = await hash(newPassword, 10)

        await prisma.user.update({
            data: {
                password: hashedPassword
            },
            where: { email }
        })

        return { message: "New Password Has Been Set Up", status: 200 }

    } catch (error) {
        return { message: 'SomeThing went wrong!', status: 500 }
    }
}


export async function POST(req) {
    try {
        const body = await req.json();
        const { emailOrUsername } = body;

        if (!emailOrUsername) return NextResponse.json({ message: "وارد کردن ایمیل یا نام کاربری الزامیست" }, { status: 409 });

        let existingUser = await prisma.user.findUnique({
            where: { email: emailOrUsername }
        });

        if (!existingUser) {
            existingUser = await prisma.user.findUnique({
                where: { username: emailOrUsername }
            });
            if (!existingUser) return NextResponse.json({ message: "کاربری با این مشخصات پیدا نشد" }, { status: 401 });
        }

        const options = setMailOptions(existingUser.email)
        const newPass = generateRandomString();
        const html = `<!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="UTF-8">
                                <title>تغییر رمز عبور دانشگاه نخبگان شمال</title>
                            </head>
                            <body>
                                <h1>نخبگان دانشگاه شمال</h1>
                                <h2>کاربرگرامی ${existingUser.username}</h2>
                                <p>رمز تغییر یافته شما کلمه ی زیر است:</p>
                                <p>${newPass}</p>
                                <p>لطفا پس از ورود به سایت، نسبت به تغییر رمز عبور خود اقدام نمایید</p>
                            </body>
                            </html>`

        const res = await changePassword({
            email: existingUser.email,
            newPassword: newPass
        })

        if (res.status !== 200) {
            return NextResponse.json({ message: res.message }, { status: res.status });
        }

        await transporter.sendMail({
            ...options,
            subject: 'فراموشی رمز عبور',
            text: 'سایت نخبگان',
            html
        })

        return NextResponse.json({ message: "موفقیت آمیز بود!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'SomeThing went wrong!', error }, { status: 500 })
    }
}