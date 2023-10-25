import React from 'react'
import MenuNav from '../../components/home/MenuNav'
import { Grid } from '@mui/material'
import LastNews from '../../components/events/LastNews'
import Slider from '../../components/events/Slider'
import EventsPagination from '../../components/events/EventsPagination'

export default function Events() {
    return (
        <>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <section className='mt-5' >
                <Grid container spacing={8} className="p-3">
                    <Grid item xs={12} sm={8} md={8} className="grid-item">
                        <Slider />
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
