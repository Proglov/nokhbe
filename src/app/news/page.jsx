import { Grid } from '@mui/material'
import Swiper from '../../components/news/Swiper'
import NewsPage from '@/components/news/NewsPage'

export default function News() {
    return (
        <Grid item xs={12} sm={8} md={8} className="grid-item">
            <Swiper />
            <NewsPage type='news' />
        </Grid>
    )
}
