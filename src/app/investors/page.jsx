import Main from '@/components/booksAndDocs/Main'
import MenuNav from '@/components/home/MenuNav'
import Image from 'next/image'

export default function page() {
    return (
        <div className='mt-20 mb-10'>

            <nav className="my-1">
                <MenuNav />
            </nav>

            <div className='relative mb-10'>
                <div className='absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl text-center'>بانک سرمایه گذاران باشگاه نخبگان جوان و فرهیختگان شمال</div>
                <Image src='/img/book.jpg' width={500} height={500} className='w-full' />
            </div>

            <Main type='investors' />
        </div>
    )
}