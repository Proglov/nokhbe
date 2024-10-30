import { DeleteByIdRequestDocumentAndBook, PatchByIdRequestDocumentAndBook } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'


export const DELETE = async (_req, { params }) => {
    let res = await DeleteByIdRequestDocumentAndBook('book', params?.id)
    if (res?.status !== 200) {
        const { status, ...rest } = res
        return NextResponse.json({ ...rest }, { status })
    }
    return NextResponse.json(res.message);
}

export const PATCH = async (req, { params }) => {
    const body = await req.json()
    let res = await PatchByIdRequestDocumentAndBook('book', body, params?.id)
    if (res?.status !== 200) {
        const { status, ...rest } = res
        return NextResponse.json({ ...rest }, { status })
    }
    return NextResponse.json({ message: res.message, error: res.error });
}