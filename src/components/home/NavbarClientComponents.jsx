'use client'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { LiaSignOutAltSolid, LiaSignInAltSolid } from "react-icons/lia";
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { CgProfile } from "react-icons/cg";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CiLink } from "react-icons/ci";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const NavbarClientComponent = ({ session }) => {
    const router = useRouter()
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
                <div>
                    <CgProfile className='mx-1 text-sm sm:text-xl' />
                </div>
                <ListItemText primary="پروفایل" primaryTypographyProps={{ fontSize: { xs: '12px', sm: '15px' } }} className='text-center' />
                {open ? <ExpandLess className='text-sm sm:text-xl' /> : <ExpandMore className='text-sm sm:text-xl' />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit className='absolute rounded-lg mt-0.5 text-black' sx={{ bgcolor: '#b8e9ff' }}>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => router.push('/profile')}>
                        <div>
                            <CiLink className='text-3xl' />
                        </div>
                        <ListItemText primary={"صفحه من "} primaryTypographyProps={{ fontSize: { xs: '12px', sm: '16px' } }} className='w-[70px] text-center' />
                    </ListItemButton>

                    <ListItemButton onClick={() => signOut({ redirectTo: "/", redirect: true })}>
                        <div>
                            <LiaSignOutAltSolid style={{ fontSize: '25px', color: 'red' }} />
                        </div>

                        <ListItemText primary={
                            <div className='text-center w-16 text-xs sm:text-base'>
                                خروج
                            </div>
                        } className='w-[70px] text-center' />
                    </ListItemButton>
                </List>
            </Collapse >
        </List >
    )
    else return (
        <Link href={'/authentication'}>
            <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '18px', fontFamily: 'Shabnam' }, minWidth: '50px' }} className='px-2 sm:p-1 opacity-80 mx-1 my-5'>
                <LiaSignInAltSolid style={{ fontSize: '25px' }} className='text-green-600' />
                <Typography>
                    ورود
                </Typography>
            </Typography>
        </Link>
    )
};

export default NavbarClientComponent;