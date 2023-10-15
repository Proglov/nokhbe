import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { GoGoal } from "react-icons/go"
import styles from '../../../styles/Footer.module.css'

export default function Footer() {
    return (
        <Grid container spacing={2} className="p-3 bg-blue-950 text-slate-50">
            <Grid item xs={12} sm={5} className="grid-item">
                <List>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="دفتر مقام معظم رهبری"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="دفتر ریاست جمهوری"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="موسسه تنظیم و نشر آثار امام خمینی (ره)"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="ارتباطات مردمی ریاست جمهوری"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="وزارت علوم تحقیقات و فناوری"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="معاونت علمی و فناوری ریاست جمهوری"
                            />
                        </ListItem>
                    </Link>
                    <Link href='#'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="سایت دانشگاه شمال"
                            />
                        </ListItem>
                    </Link>
                </List>
            </Grid>

            <Grid item xs={12} sm={6} className={`grid-item mt-2 ${styles.dynamicText} ${styles.mrDynamic}`}>
                <div className='flex flex-row'>
                    <span>
                        <span className=''>دفتر مرکزی:</span> مازندران، آمل، کلیومتر 5 جاده هراز، دو راهی امامزاده عبدلله
                    </span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>تلفن تماس:</span> 01144203711</span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>فکس:</span>01144203755</span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>پست الکترونیک:</span> info@yesc.ir</span>
                </div>
            </Grid>
        </Grid>
    )
}