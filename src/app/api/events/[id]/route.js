import { DeleteByIdRequest, GetByIdRequest, PatchByIdRequest } from '@/utils/APIUtilities';
import { NextResponse } from 'next/server'

export const GET = async (_req, { params }) => {
    let res = await GetByIdRequest('events', params?.id)
    if (res?.status !== 200) {
        const { status, ...rest } = res
        return NextResponse.json(...rest, { status })
    }
    return NextResponse.json(res.data);
}

export const DELETE = async (_req, { params }) => {
    let res = await DeleteByIdRequest('events', params?.id)
    if (res?.status !== 200) {
        const { status, ...rest } = res
        return NextResponse.json(...rest, { status })
    }
    return NextResponse.json(res.message);
}

export const PATCH = async (req, { params }) => {
    const body = await req.json()
    let res = await PatchByIdRequest('events', body, params?.id)
    if (res?.status !== 200) {
        const { status, ...rest } = res
        return NextResponse.json(...rest, { status })
    }
    return NextResponse.json(data.message);
}