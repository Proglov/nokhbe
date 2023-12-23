'use client'
import { Button, Divider, Grid, Skeleton, Typography } from '@mui/material'
import Link from 'next/link'
import { BsFillCircleFill } from 'react-icons/bs'
import NewsTop from './NewsTop'
import NewsComponent from './NewsComponent'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useState, useEffect } from 'react'

export default function News() {
    const [error, setError] = useState('')
    const [news, setNews] = useState([])

    useEffect(() => {
        fetch(`api/news?page=1&perPage=13&justPositiveStatus=true`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setNews(data)
            })
            .catch((err) => {
                setError(err);
            });
    }, []);
    return (
        <div>

            <div className="flex justify-between px-8 py-2">
                <Typography variant="h2" className='text-3xl'>
                    اخبار
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 text-xl rounded-md p-2 text-black">
                    <Link href='/news'>
                        آرشیو اخبار
                    </Link>
                </Button>
            </div>

            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <BsFillCircleFill className="text-black absolute" style={{ top: '-4px', left: '12px', fontSize: '10px' }} />
            </div>

            <div style={{ borderLeft: '2px solid black', marginLeft: '16px', marginTop: '-5px' }} className='shadow-lg shadow-green-100 relative'>

                <AiOutlineArrowDown className='absolute' style={{ left: '-9px', bottom: '-5px' }} />
                {
                    news.length !== 0 ? (
                        <>
                            <div className='mt-2 p-3'>
                                <Link href={`/news/${news[0].id}`}>
                                    <NewsTop src={news[0].imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(news[0].createdAt))} title={news[0].title} desc={news[0].description} />
                                </Link>
                            </div>
                            <div>
                                <Grid container spacing={2} className="p-6 shadow-lg shadow-green-100">
                                    {news.map((item, i) => {
                                        if (i !== 0) {
                                            return (
                                                <Grid item xs={12} sm={12} md={6} lg={6} className="grid-item" key={item.id}>
                                                    <Link href={`/news/${item.id}`}>
                                                        <NewsComponent src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} title={item.title} />
                                                    </Link>
                                                </Grid>
                                            )
                                        }
                                    })}
                                </Grid>
                            </div>
                        </>
                    ) : (
                        <Grid container spacing={2} className="p-6 shadow-lg shadow-green-100">
                            <Skeleton variant="rectangular" width="100%" height={200} />
                            {Array.from({ length: 12 }).map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item" key={index}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                </Grid>
                            ))}
                        </Grid>
                    )
                }
                {
                    error !== '' ?
                        (
                            <div className="text-center mt-2">{error.toString()}</div>
                        )
                        :
                        ''
                }
            </div>
        </div>

    )
}
