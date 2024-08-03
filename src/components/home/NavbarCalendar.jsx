'use client'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import { SlCalender } from 'react-icons/sl'

export default function NavbarCalendar() {
    const router = useRouter();

    return (
        <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '18px', fontFamily: 'Shabnam' } }} className='p-1 opacity-80'>
            {new Intl.DateTimeFormat('fa-IR').format(new Date())}
            <SlCalender className='m-1' onDoubleClick={() => router.push('ADMIN')} />
        </Typography>
    )
}
