"use client"
import { Grid, Skeleton, Stack } from '@mui/material'
import Pagination from './Pagination';
import { createContext, useEffect, useState } from 'react'
import SingleNews from '../events/SingleNews';
import NewsTop from './NewsTop';
import Link from 'next/link';

export const NewsContext = createContext();


export default function NewsPage({ type }) {
    const itemsPerPage = 10;
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPageNumber, setLastPageNumber] = useState();


    useEffect(() => {
        setLoading(true);
        // it should consider the status
        fetch(`api/${type}/count`, { cache: 'no-store' })
            .then((response) => response.json())
            .then((data) => {
                setLastPageNumber(Math.ceil(data.count / itemsPerPage));
            })
            .catch((err) => {
                setIsError(true);
                setError(err);
            });
        fetch(`api/${type}?page=${currentPage}&perPage=${itemsPerPage}&justPositiveStatus=true`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [currentPage]);

    return (
        <Stack spacing={2} className='mt-5'>

            {
                isError ? (
                    <div>
                        مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                        <br />
                        {error.toString()}
                    </div>
                ) : loading ? (
                    <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                        <Skeleton variant="rectangular" width="100%" height={200} />
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Grid item xs={12} className="grid-item" key={index}>
                                <Skeleton animation='wave' variant="rectangular" width="100%" height={200} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    items?.length !== 0 ?
                        <>
                            {
                                type === 'news' ?
                                    <>
                                        <Link href={`${type}/${items[0].id}`}>
                                            <NewsTop date={new Intl.DateTimeFormat('fa-IR').format(new Date(items[0].createdAt))} desc={items[0].description} src={items[0].imagesURL[0]} title={items[0].title} showMore={false} />
                                        </Link>
                                        {items.map((item, i) => {
                                            if (i > 0) {
                                                return (
                                                    <Link href={`${type}/${item.id}`} key={item.id}>
                                                        <SingleNews title={item.title} desc={item.description} src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} key={item.id} />
                                                    </Link>
                                                )
                                            }

                                        })}
                                    </>
                                    :
                                    <>
                                        {items.map((item) => (
                                            <Link href={`${type}/${item.id}`} key={item.id}>
                                                <SingleNews title={item.title} desc={item.description} src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} key={item.id} />
                                            </Link>
                                        ))}
                                    </>
                            }

                        </>
                        : <div>
                            اطلاعاتی جهت نمایش وجود ندارد
                        </div>
                )}
            {
                lastPageNumber > 1 ?
                    <div className='flex justify-center' style={{ marginTop: '25px' }}>
                        <NewsContext.Provider value={{ currentPage, setCurrentPage }}>
                            <Pagination lastPage={lastPageNumber} />
                        </NewsContext.Provider>
                    </div>
                    : ' '
            }

        </Stack>
    );
}
