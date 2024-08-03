// import { NextResponse } from "next/server";
// import prisma from '@/lib/prismaDB'


// export async function POST(req) {
//     try {
//         const searchURL = new URL(req.url).search;
//         const params = new URLSearchParams(searchURL)
//         const userId = params.get("userId")
//         const role = params.get("role")

//         const user = await prisma.user.update({
//             where: { id: userId },
//             data: { role }
//         })

//         return NextResponse.json({ user, message: "user is updated" }, { status: 200 })

//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ message: 'SomeThing went wrong!' }, { status: 500 })
//     }
// }
