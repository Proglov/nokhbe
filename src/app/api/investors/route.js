import { GetRequestDocumentAndBook, PostRequestDocumentAndBook } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'


export const POST = async (req) => {
    const body = await req.json()
    console.log(body);
    let res = await PostRequestDocumentAndBook('investor', body)
    if (res?.status === 500 || res?.status === 403 || res?.status === 400) {
        const { status, ...rest } = res
        return NextResponse.json({ ...rest }, { status })
    }
    return NextResponse.json(res.data);
}

export const GET = async (req) => {
    let res = await GetRequestDocumentAndBook('investor', req.url)
    if (res?.status === 500) {
        delete res.status
        return NextResponse.json(res, { status: 500 })
    }
    const { data, ...rest } = res
    return NextResponse.json({ ...rest, investors: data });
}