'use client'
import InfiniteScroll from './InfiniteScroll'


export default async function Main({ type }) {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/' + type + '?'
    const perPage = 20
    const res = await fetch(`${url}page=1&perPage=${perPage}`)
    const data = await res.json()

    return (
        <InfiniteScroll previousItems={data[type]} type={type} url={url} perPage={perPage} />
    )
}