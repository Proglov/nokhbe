import { NextResponse } from 'next/server'
import { job } from '@/lib/cronJob';
import { getUserRole } from '@/utils/APIUtilities';


export const GET = async () => {
    const userRole = await getUserRole()
    if (userRole !== "Admin") {
        return NextResponse.json({ message: 'route not found !' }, { status: 404 });
    }

    if (!job.running) job.start()
    else return NextResponse.json({ message: 'job is already running!' }, { status: 202 });
    return NextResponse.json({ message: 'job is activated' }, { status: 201 });
}

export const POST = async () => {
    const userRole = await getUserRole()
    if (userRole !== "Admin") {
        return NextResponse.json({ message: 'route not found !' }, { status: 404 });
    }

    if (job.running) job.stop()
    else return NextResponse.json({ message: 'job is not running!' }, { status: 202 });
    return NextResponse.json({ message: 'job is stopped' }, { status: 201 });
}