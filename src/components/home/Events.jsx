'use client'
import { Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EventComponents from "./EventComponents";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";


export default function Events() {
    const [error, setError] = useState('')
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch(`api/events?page=1&perPage=12&justPositiveStatus=true`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('!لطفا اتصال اینترنت خود را بررسی کنید')
                setEvents(data?.events)
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between px-9 py-2" id="events">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '23px', lg: '23px' }, paddingTop: '10px !important' }} >
                    رویداد های پیش رو
                </Typography>
                <Button variant="contained" className="bg-slate-300 rounded-md p-2 hover:bg-slate-400 text-black" sx={{ fontSize: { xs: '15px', sm: '16px' } }}>
                    <Link href='/events'>
                        مشاهده همه رویدادها
                    </Link>
                </Button>
            </div>

            <div className="relative">
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>

            {
                events.length !== 0 ? (
                    <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                        {events.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item" key={item.id}>
                                <Link href={`/events/${item.id}`}>
                                    <EventComponents date={item.eventAt} title={item.title} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                        {Array.from({ length: 6 }).map((_, index) => (
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
            <br />
        </div >
    )
}