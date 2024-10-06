import { GetRequest, PostRequest } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    const body = await req.json()
    let res = await PostRequest('events', body)
    if (res?.status === 500 || res?.status === 403) {
        const { status, ...rest } = res
        return NextResponse.json({ ...rest }, { status })
    }
    return NextResponse.json(res.data);
}

export const GET = async (req) => {
    let res = await GetRequest('events', req.url)
    if (res?.status === 500) {
        delete res.status
        return NextResponse.json(res, { status: 500 })
    }
    res.events = res.data;
    delete res.data
    return NextResponse.json(res);
}