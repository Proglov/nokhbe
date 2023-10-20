import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { GoGoal } from 'react-icons/go'

export default function SideInfo({ year, month, day, title }) {
    return (
        <Link href='#'>
            <ListItem className='py-0' alignItems='flex-start' sx={{ marginRight: '-24px', paddingX: '0px' }}>
                <ListItemIcon sx={{ color: 'orange', marginTop: '15px' }}>
                    <GoGoal style={{ marginRight: '20px' }} />
                </ListItemIcon>
                <ListItemText
                    sx={{ textAlign: 'right', color: '#03428a' }}
                    primary={title}
                    secondary={`${year}/${month}/${day}`}
                />
            </ListItem>
        </Link>
    )
}
