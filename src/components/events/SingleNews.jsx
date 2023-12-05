import Image from 'next/image'
import React from 'react'

export default function SingleNews({ title, date, src, desc }) {
    return (
        <div className='flex items-center'>
            <div className='w-1/2 xs:w-full sm:w-1/2 lg:w-1/3 xl:w-1/4' style={{ marginLeft: '10px' }}>
                <Image className='rounded' src={src} width={1920} height={1080} alt='درحال لود شدن میباشد' />
            </div>
            <div className='w-1/2 xs:w-full sm:w-1/2 md:w-1/2 lg:w-2/3 flex flex-col justify-center'>
                <h2 className='text-lg'>{title}</h2>
                <small className='mb-1'>{date}</small>
                <div dangerouslySetInnerHTML={{ __html: desc }} style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '100%',
                }} />
            </div>
        </div>
    )
}
