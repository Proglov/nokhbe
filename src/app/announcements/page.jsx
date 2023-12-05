import Slider from '../../components/events/Slider'
import NewsPage from '@/components/news/NewsPage'

export default function Page() {
    return (
        <>
            <Slider />
            <NewsPage type='announcements' />
        </>
    )
}
