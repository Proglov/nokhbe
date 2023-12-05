import { NextResponse } from "next/server";
import prisma from '@/lib/prismaDB'
import { setMailOptions, transporter } from "@/lib/nodemailer";

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


export async function POST(req) {
    try {
        const body = await req.json();
        const { emailOrUsername } = body;

        if (!emailOrUsername) return NextResponse.json({ message: "وارد کردن ایمیل یا نام کاربری الزامیست" }, { status: 409 });

        const existingUserByEmail = await prisma.NormalUser.findUnique({
            where: { email: emailOrUsername }
        });

        if (!existingUserByEmail) {
            const existingUserByUsername = await prisma.NormalUser.findUnique({
                where: { username: emailOrUsername }
            });

            if (!existingUserByUsername) return NextResponse.json({ message: "کاربری با این مشخصات پیدا نشد" }, { status: 401 });

            const options = setMailOptions(existingUserByUsername.email)
            const newPass = generateRandomString();
            const html = `<!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="UTF-8">
                                <title>تغییر رمز عبور</title>
                            </head>
                            <body>
                                <h1>کاربرگرامی ${existingUserByUsername.username}</h1>
                                <p>رمز تغییر یافته شما کلمه ی زیر است:</p>
                                <p>${newPass}</p>
                                <p>لطفا پس از ورود به سایت، نسبت به تغییر رمز عبور خود اقدام نمایید</p>
                            </body>
                            </html>`


            await fetch('http://localhost:3000/api/user/changePassword', {
                method: 'POST',
                body: JSON.stringify({
                    email: existingUserByUsername.email,
                    oldPassword: existingUserByUsername.password,
                    newPassword: newPass
                }),
                headers: {
                    "content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            await transporter.sendMail({
                ...options,
                subject: 'فراموشی رمز عبور',
                text: 'سایت نخبگان',
                html
            })


            return NextResponse.json({ message: "موفقیت آمیز بود!" }, { status: 200 });

        };

        const options = setMailOptions(existingUserByEmail.email)
        const newPass = generateRandomString();
        const html = `<!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="UTF-8">
                                <title>تغییر رمز عبور</title>
                            </head>
                            <body>
                                <h1>کاربرگرامی ${existingUserByEmail.username}</h1>
                                <p>رمز تغییر یافته شما کلمه ی زیر است:</p>
                                <p>${newPass}</p>
                                <p>لطفا پس از ورود به سایت، نسبت به تغییر رمز عبور خود اقدام نمایید</p>
                            </body>
                            </html>`


        await fetch('http://localhost:3000/api/user/changePassword', {
            method: 'POST',
            body: JSON.stringify({
                email: existingUserByEmail.email,
                oldPassword: existingUserByEmail.password,
                newPassword: newPass
            }),
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        await transporter.sendMail({
            ...options,
            subject: 'فراموشی رمز عبور',
            text: 'سایت نخبگان',
            html
        })

        return NextResponse.json({ message: "موفقیت آمیز بود!" }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'SomeThing went wrong!' }, { status: 500 })
    }
}
