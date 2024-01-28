'use client'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io"
import { Box, Divider } from '@mui/material';
import styles from '../../styles/Home/MenuNav.module.css'
import Link from 'next/link';

export default function MenuNav() {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl3(null);
        setAnchorEl2(event.currentTarget);
    };

    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl1(null);
        setAnchorEl2(null);
    };

    return (
        <nav className="sticky bg-blue-950">
            <div className="max-w-screen-xl px-4 mx-auto" style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '62px' }}>
                <div className="flex justify-space-evenly">
                    <ul className={`flex flex-row space-x-2 ${styles.customSize}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <li className='ml-2 text-center'>
                            <Button
                                id="dropdownDelayButton1"
                                aria-controls="dropdownDelay1"
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl1)}
                                onClick={handleClick1}
                                className="text-white pt-6 text-center inline-flex items-center"
                                style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}

                            >
                                <span className={styles.customSize}>اخبار و رویدادها</span>
                                <IoMdArrowDropdown style={{ fontSize: '18px' }} />
                            </Button>
                            <Menu
                                id="dropdownDelay1"
                                anchorEl={anchorEl1}
                                open={Boolean(anchorEl1)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'dropdownDelayButton1'
                                }}
                                style={{ marginTop: '-10px' }}
                            >
                                <Box sx={{ bgcolor: 'linear-gradient(to bottom, #090072 40%, #ff9d33)' }}>
                                    <li className='px-5 py-1 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black', textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            <Link href='/events'>
                                                رویداد ها
                                            </Link>
                                        </Box>
                                    </li>
                                    <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black', textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            <Link href='/news'>
                                                اخبار
                                            </Link>
                                        </Box>
                                    </li>
                                    <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            <Link href='/announcements'>
                                                اطلاعیه ها
                                            </Link>
                                        </Box>
                                    </li></Box>
                            </Menu>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center'>
                            <Link href="/authentication" className="text-slate-50"> &nbsp; &nbsp;باشگاه های تخصصی &nbsp;</Link>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center'>
                            <Link href='/joining' className="text-slate-50">
                                خدمات و عضویت
                            </Link>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li>
                            <Button
                                id="dropdownDelayButton2"
                                aria-controls="dropdownDelay2"
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl2)}
                                onClick={handleClick2}
                                className="pt-6"
                                style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <span className={styles.customSize}>
                                    معرفی و درباره ما
                                </span>
                                <IoMdArrowDropdown style={{ fontSize: '18px', marginTop: '-5px' }} />
                            </Button>
                            <Menu
                                id="dropdownDelay2"
                                anchorEl={anchorEl2}
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'dropdownDelayButton2',
                                }}
                                style={{ marginLeft: '-8vw', marginTop: '-10px' }}
                            >
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }}>
                                        <Link href='/activities'>
                                            فعالیت های باشگاه
                                        </Link>
                                    </Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        <Link href='/purposes'>
                                            اهداف و ماموریت باشگاه
                                        </Link>
                                    </Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }}>
                                        <Link href='/introduction'>
                                            معرفی و سوابق باشگاه
                                        </Link>
                                    </Box>
                                </li>
                                <li className='px-3 sm:px-2 md:px-3 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} >
                                        <Button id="dropdownDelayButton3"
                                            aria-controls="dropdownDelay3"
                                            aria-haspopup="true"
                                            aria-expanded={Boolean(anchorEl2)}
                                            onClick={handleClick3}
                                            style={{ color: 'black' }}>
                                            <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }}>
                                                سازمان و تشکیلات
                                            </Box>
                                            <IoMdArrowDropleft style={{ fontSize: '18px' }} />
                                        </Button>
                                        <Menu
                                            id="dropdownDelay3"
                                            anchorEl={anchorEl3}
                                            open={Boolean(anchorEl3)}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'dropdownDelayButton2',
                                            }}
                                            sx={{ marginLeft: { xs: '22vw', sm: '-22vw' }, marginTop: '-8vw' }}>
                                            <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                                <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                                    <Link href='/organizational-structure/omana'>
                                                        هیئت امناء باشگاه
                                                    </Link>
                                                </Box>
                                            </li>
                                            <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                                <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                                    <Link href='/organizational-structure/boss'>
                                                        رئیس باشگاه
                                                    </Link>
                                                </Box>
                                            </li>
                                            <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                                <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                                    <Link href='/organizational-structure/boss'>
                                                        شورای راهبری
                                                    </Link>
                                                </Box>
                                            </li>
                                            <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10'>
                                                <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                                    <Link href='/organizational-structure/boss'>
                                                        شورای راهبردی
                                                    </Link>
                                                </Box>
                                            </li>
                                        </Menu>
                                    </Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10'>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        <Link href='/regulations'>
                                            آیین نامه عضویت در باشگاه
                                        </Link>
                                    </Box>
                                </li>
                            </Menu>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center text-slate-50'>
                            <Link href='/contact'>
                                تماس با ما
                            </Link>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center'>
                            <Link href="/authentication" className="text-slate-50"> &nbsp; &nbsp;ورود &nbsp;</Link>
                        </li>

                    </ul>
                </div>
            </div >
        </nav >
    )
}