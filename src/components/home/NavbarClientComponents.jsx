'use client'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { LiaSignOutAltSolid, LiaSignInAltSolid } from "react-icons/lia";
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { CgProfile } from "react-icons/cg";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CiLink } from "react-icons/ci";
import { signOut } from 'next-auth/react';

const NavbarClientComponent = ({ session }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    if (session?.user) return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className='m-2'
        >
            <ListItemButton onClick={handleClick} className='bg-green-400 rounded-3xl p-1 hover:bg-green-500 relative'>
                <ListItemIcon>
                    <CgProfile className='mr-3 text-xl' />
                </ListItemIcon>
                <ListItemText primary="پروفایل" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit className='absolute rounded-lg mt-0.5 text-black' sx={{ bgcolor: '#b8e9ff' }}>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <CiLink className='text-3xl' />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Link href={'/profile'}>
                                صفحه من
                            </Link>
                        } className='w-[70px] text-center' />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} onClick={() => signOut({ redirectTo: "/", redirect: true })}>
                        <ListItemIcon>
                            <LiaSignOutAltSolid style={{ fontSize: '25px', color: 'red' }} />
                        </ListItemIcon>

                        <ListItemText primary={
                            <div className='text-center w-16'>
                                خروج
                            </div>
                        } className='w-[70px] text-center' />
                    </ListItemButton>
                </List>
            </Collapse >
        </List >
    )
    else return (
        <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '18px', fontFamily: 'Shabnam' }, minWidth: '50px' }} className='px-2 p-1 opacity-80 mx-1'>
            <Link href={'/authentication'}>
                ورود
            </Link>
            <LiaSignInAltSolid style={{ fontSize: '25px' }} />
        </Typography>
    )
};

export default NavbarClientComponent;