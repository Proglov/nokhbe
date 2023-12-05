import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { GoGoal } from 'react-icons/go'

export default function SideInfo({ date, title }) {
    return (
        <ListItem className='py-0' alignItems='flex-start' sx={{ marginRight: '-24px', paddingX: '0px' }}>
            <ListItemIcon sx={{ color: 'orange', marginTop: '15px' }}>
                <GoGoal style={{ marginRight: '20px' }} />
            </ListItemIcon>
            <ListItemText
                sx={{ textAlign: 'right', color: '#03428a' }}
                primary={title}
                secondary={`${date}`}
            />
        </ListItem>
    )
}
