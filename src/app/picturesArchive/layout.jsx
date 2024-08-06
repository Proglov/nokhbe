import MenuNav from '@/components/home/MenuNav'
import React from 'react'

export default function layout({ children }) {
    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <div className='m-5'>
                {children}
            </div>
        </div>
    )
}
