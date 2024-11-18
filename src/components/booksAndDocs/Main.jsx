'use client'
import { useEffect, useState } from 'react'
import InfiniteScroll from './InfiniteScroll'


export default function Main({ type }) {
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/' + type + '?'
    const perPage = 20

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const res = await fetch(`${url}page=1&perPage=${perPage}`)
                const json = await res.json()
                setData(json);
            } catch (error) { }
            finally { setLoading(false) }
        }
        getData()
    }, [])

    if (loading)
        return <div className='text-center w-full'>لطفا منتظر بمانید ...</div>

    return (
        <InfiniteScroll previousItems={data[type]} type={type} url={url} perPage={perPage} />
    )
}