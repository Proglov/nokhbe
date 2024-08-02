import HomeSwiper from '@/components/home/HomeSwiper'
import NewsPage from '@/components/news/NewsPage'

export default function Announcements() {
    return (
        <>
            <HomeSwiper />
            <NewsPage type='announcements' />
        </>
    )
}
