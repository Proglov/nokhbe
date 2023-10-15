'use client'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdArrowDropdown } from "react-icons/io"
import { Divider } from '@mui/material';
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
        <nav className="mt-3 sticky" style={{ backgroundColor: '#03003e' }}>
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
                                <li className='px-3' style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>رویدادها</MenuItem>
                                </li>
                                <li className='px-3' style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>اخبار</MenuItem>
                                </li>
                                <li className='px-3'>
                                    <MenuItem onClick={handleClose}>اطلاعیه ها</MenuItem>
                                </li>
                            </Menu>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white">ورود و لاگین</a>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white">خدمات و عضویت</a>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white' }} />
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
                            >
                                <li style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>فعالیت های باشگاه</MenuItem>
                                </li>
                                <li style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>اهداف و مامورریت باشگاه</MenuItem>
                                </li>
                                <li style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>معرفی و سوابق باشگاه</MenuItem>
                                </li>
                                <li style={{ borderBottom: '3px solid black' }}>
                                    <MenuItem onClick={handleClose}>ساختار سازمانی</MenuItem>
                                </li>
                                <li>
                                    <MenuItem onClick={handleClose}>آیین نامه عضویت در باشگاه</MenuItem>
                                </li>
                            </Menu>
                        </li>
                        <Divider orientation='vertical' sx={{ backgroundColor: 'white' }} />
                        <li className='text-center'>
                            <a href="#" className="text-gray-900 dark:text-white">تماس با ما</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}