import Image from 'next/image'
import React from 'react'

export default function SingleNews({ title, year, month, day, src, desc }) {
    return (
        <div className='flex items-center'>
            <div className='w-1/2 xs:w-full sm:w-1/2 md:w-1/3 lg:w-1/5' style={{ marginLeft: '10px' }}>
                <Image className='rounded' src={src} width={1920} height={1080} alt='some randome pic' />
            </div>
            <div className='flex flex-col justify-center'>
                <h2 className='text-lg'>{title}</h2>
                <small>{year}/{month}/{day}</small>
                <h5 className='text-sm'>{desc}</h5>
            </div>
        </div>
    )
}
