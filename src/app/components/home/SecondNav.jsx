'use client'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdArrowDropdown } from "react-icons/io"
import { Box, Divider } from '@mui/material';
import styles from '../../../styles/SecNav.module.css'

export default function SecondNav() {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl1(null);
        setAnchorEl2(null);
    };

    return (
        <nav className="sticky" style={{ backgroundColor: '#03003e' }}>
            <div className="max-w-screen-xl px-4 mx-auto" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div className="flex justify-space-evenly">
                    <ul className={`flex flex-row space-x-2 ${styles.customSize}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <li className='ml-2 text-center'>
                            <Button
                                id="dropdownDelayButton1"
                                aria-controls="dropdownDelay1"
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl1)}
                                onClick={handleClick1}
                                className="text-white pt-8 text-center inline-flex items-center"
                                style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}

                            >
                                <span className={styles.customSize}>اخبار و رویدادها</span>
                                <IoMdArrowDropdown style={{ fontSize: '23px' }} />
                            </Button>
                            <Menu
                                id="dropdownDelay1"
                                anchorEl={anchorEl1}
                                open={Boolean(anchorEl1)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'dropdownDelayButton1',
                                }}
                                classes={{ paper: { backgroundColor: "lightblue" } }}
                            >
                                <Box sx={{ bgcolor: 'linear-gradient(to bottom, #090072 40%, #ff9d33)' }}>
                                    <li className='px-5 py-1 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black', textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            رویداد ها</Box>
                                    </li>
                                    <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black', textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            اخبار</Box>
                                    </li>
                                    <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ textAlign: 'center' }}>
                                        <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                            اطلاعیه ها</Box>
                                    </li></Box>
                            </Menu>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white"> &nbsp; &nbsp;ورود &nbsp;</a>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white">خدمات و عضویت</a>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />
                        <li className='text-center'>
                            <Button
                                id="dropdownDelayButton2"
                                aria-controls="dropdownDelay2"
                                aria-haspopup="true"
                                aria-expanded={Boolean(anchorEl2)}
                                onClick={handleClick2}
                                className="text-white pt-8 text-center inline-flex items-center"
                                style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <span className={styles.customSize}>
                                    معرفی و درباره ما
                                </span>
                                <IoMdArrowDropdown style={{ fontSize: '23px' }} />
                            </Button>
                            <Menu
                                id="dropdownDelay2"
                                anchorEl={anchorEl2}
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'dropdownDelayButton2',
                                }}
                                style={{ marginLeft: '-8vw' }}
                            >
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        فعالیت های باشگاه</Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        اهداف و مامورریت باشگاه</Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        معرفی و سوابق باشگاه</Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10' style={{ borderBottom: '3px solid black' }}>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        ساختار سازمانی</Box>
                                </li>
                                <li className='py-1 px-5 sm:px-3 md:px-5 lg:px-10'>
                                    <Box sx={{ fontSize: { xs: '10px', sm: '15px', md: '20px', lg: '23px', paddingX: { xs: '5px', sm: '4px', md: '6px', lg: '8px' } } }} onClick={handleClose}>
                                        آیین نامه عضویت در باشگاه</Box>
                                </li>
                            </Menu>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white">تماس با ما</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}