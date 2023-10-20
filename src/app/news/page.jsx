import React from 'react'
import MenuNav from '../../components/home/MenuNav'
import { Grid } from '@mui/material'
import LastNews from '../../components/events/LastNews'
import Swiper from '../../components/news/Swiper'
import EventsPagination from '../../components/events/EventsPagination'
import NewsTop from '@/components/home/NewsTop'

export default function Events() {
    return (
        <>
            <nav>
                <MenuNav />
            </nav>
            <section className='mt-5' >
                <Grid container spacing={8} className="p-3">
                    <Grid item xs={12} sm={8} md={8} className="grid-item">
                        <Swiper />
                        <NewsTop day={3} desc={'رئیس هیئت امنا دانشگاه رئیس هیئت امنا دانشگاه رئیس هیئت امنا دانشگاه'} href={'#'} month={6} src={'/img/home-news/r_64_190826150203.jpg'} title={'نشست رئیس هیئت امنا نشست رئیس هیئت امنا نشست رئیس هیئت امنا'} year={1398} />
                        <EventsPagination />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className="grid-item">
                        <LastNews />
                    </Grid>
                </Grid>
            </section>
        </>
    )
}
