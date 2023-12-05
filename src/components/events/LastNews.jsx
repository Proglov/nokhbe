'use client'
import { Divider, Grid, List, Skeleton, Typography } from '@mui/material'
import SideInfo from './SideInfo'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteAPI } from '@/utils/API'

export default function LastNews({ type }) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${siteAPI}/api/${type}?page=1&perPage=20&justPositiveStatus=true`, { cache: 'no-store' })
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
    }, []);

    return (
        <>
            <Typography className='mb-3' variant='h1' sx={{ fontSize: '20px' }}>
                آخرین اخبار
            </Typography>
            <Divider />
            <List>
                {
                    isError ? (
                        <div>
                            مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                            <br />
                            {error.toString()}
                        </div>
                    ) : loading ? (
                        <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <Grid item xs={12} className="grid-item" key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        items?.length !== 0 ?
                            <>
                                {items.map((item) => (
                                    <Link href={`${siteAPI}/${type}/${item.id}`}>
                                        <SideInfo title={item.title} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} key={item.id} />
                                    </Link>
                                ))}
                            </>
                            : <div>
                                اطلاعاتی جهت نمایش وجود ندارد
                            </div>
                    )}
            </List>
        </>
    )
}
