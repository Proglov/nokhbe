'use client'
import { useEffect, useState } from "react"
import MainPictureArchive from "./MainPictureArchive"

export default function ClientSidePictureArchive({ type, page, perPage }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const [lastPage, setLastPage] = useState(1)

    useEffect(() => {
        setLoading(true);
        setError('')
        fetch(`/api/${type}?page=${page}&perPage=${perPage}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setData(data[type]);
                setLastPage(Math.ceil(data.count / (perPage)));
            })
            .catch((err) => {
                setError(err);
            }).finally(() => setLoading(false));
    }, [page, perPage, setData, setLastPage, type]);

    return (
        <MainPictureArchive data={data} error={error} lastPage={lastPage} loading={loading} page={page} perPage={perPage} type={type} />
    )
}
