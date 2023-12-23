'use client'
import { Button, Divider, Grid, Skeleton, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import NewsComponent from './NewsComponent'

export default function Announcements() {

    const [error, setError] = useState('')
    const [announcements, setAnnouncements] = useState([])

    useEffect(() => {
        fetch(`api/announcements?page=1&perPage=8&justPositiveStatus=true`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setAnnouncements(data)
            })
            .catch((err) => {
                setError(err);
            });
    }, []);
    return (
        <div>
            <div className="flex justify-between px-6 py-2">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '22px', md: '25' }, paddingTop: '10px !important' }} >
                    اطلاعیه
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 rounded-md p-2 text-black" sx={{ fontSize: { xs: '15px', sm: '14px', md: '18px' } }} >
                    <Link href='/announcements'>
                        آرشیو اطلاعیه ها
                    </Link>
                </Button>
            </div>
            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>
            <div className='shadow-lg shadow-red-100 mt-2'>
                {
                    announcements.length !== 0 ? (
                        <Grid container spacing={2} className="p-6 shadow-lg shadow-red-100">
                            {announcements.map((item) => {
                                return (
                                    <Grid item xs={12} className="grid-item" key={item.id}>
                                        <Link href={`/announcements/${item.id}`}>
                                            <NewsComponent src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} title={item.title} />
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <Grid container spacing={2} className="p-6 shadow-lg shadow-red-100">
                            <Skeleton variant="rectangular" width="100%" height={200} />
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Grid item xs={12} className="grid-item" key={index}>
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
