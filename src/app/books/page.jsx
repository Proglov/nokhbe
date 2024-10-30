import Main from '@/components/booksAndDocs/Main'
import Image from 'next/image'

export default function page() {
    return (
        <div className='mt-20 mb-10'>

            <div className='relative mb-10'>
                <div className='absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 text-white text-2xl sm:text-5xl'>کتابخانه نخبگان</div>
                <Image src='/img/book.jpg' width={500} height={500} className='w-full' />
            </div>

            <Main type='books' />
        </div>
    )
}