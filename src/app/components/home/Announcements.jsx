import { Button, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function Announcements() {
    return (
        <div>
            <div className="flex justify-between px-6 py-2">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '22px', md: '25' }, paddingTop: '10px !important' }} >
                    اطلاعیه
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 rounded-md p-2 text-black" sx={{ fontSize: { xs: '15px', sm: '14px', md: '18px' } }} >
                    <Link href='#'>
                        آرشیو اطلاعیه ها
                    </Link>
                </Button>
            </div>
            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>
            <div className='shadow-lg shadow-red-100 mt-2'>
                هیچ اطلاعیه ای در دسترس نمی باشد
            </div>
        </div>
    )
}
