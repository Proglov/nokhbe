'use client'
import NewsTop from "@/components/news/NewsTop"
import { Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [item, setItem] = useState({
        title: '',
        desc: '',
        date: '',
        imagesURL: '',
    });

    useEffect(() => {
        setLoading(true);
        fetch(`/api/events/${params.id}`, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                }
                return response.json();
            })
            .then((data) => {
                if (data === undefined)
                    throw new Error('لطفا اتصال اینترنت خود را بررسی کنید')
                setItem({
                    title: data.title,
                    desc: data.description,
                    imagesURL: data.imagesURL,
                    date: data.eventAt
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsError(true);
                setLoading(false);
            });
    }, [params.id]);
    return (
        <Grid item xs={12} sm={12} md={12} className="grid-item">
            {
                isError ? (
                    <div>
                        مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                        <br />
                        {error.toString()}
                    </div >
                ) : loading ? (
                    <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                        <Skeleton variant="rectangular" width="100%" height={200} />
                    </Grid>
                ) : (
                    item?.title !== '' ?
                        <>
                            <NewsTop date={item.date} desc={item.desc} src={item.imagesURL} title={item.title} showMore={true} />
                        </>
                        : <div>
                            اطلاعاتی جهت نمایش وجود ندارد
                        </div>
                )
            }
        </Grid>
    )
}
