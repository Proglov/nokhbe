import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { GoGoal } from "react-icons/go"
import { FaChartBar } from "react-icons/fa";
import { statisticsView } from '@/utils/SiteSView';
import styles from '../../styles/Home/Footer.module.css'

export default function Footer() {
    return (
        <Grid container spacing={2} className="p-3 bg-blue-950 text-slate-50">
            <Grid item xs={12} sm={5} className="grid-item">
                <List>
                    <Link href='http://farsi.khamenei.ir/index.html' target='_blank'>
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
                    <Link href='http://www.president.ir/fa/' target='_blank'>
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
                    <Link href='http://www.imam-khomeini.ir/' target='_blank'>
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
                    <Link href='http://www.msrt.ir/fa/pages/Home.aspx' target='_blank'>
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
                    <Link href='http://www.msrt.ir/fa/pages/Home.aspx' target='_blank'>
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
                    <Link href='http://www.isti.ir/' target='_blank'>
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
                    <Link href='http://shomal.ac.ir/' target='_blank'>
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
                    <span className='ml-2'>
                        <FaChartBar style={{ fontSize: '25px' }} />
                    </span>
                    <div style={{ textAlign: 'right' }}>
                        آمار بازدید ها<span style={{ color: 'red' }}>:</span> {statisticsView}
                    </div>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span>
                        <span className=''>دفتر مرکزی<span style={{ color: 'red' }}>:</span></span> مازندران، آمل، کلیومتر ۵ جاده هراز، دو راهی امامزاده عبدلله
                    </span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>تلفن تماس<span style={{ color: 'red' }}>:</span></span> ۰۱۱۴۴۲۰۳۷۱۱</span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>فکس<span style={{ color: 'red' }}>:</span></span> ۰۱۱۴۴۲۰۳۷۵۵</span>
                </div>
                <br />
                <div className='flex flex-row'>
                    <span><span className=''>پست الکترونیک<span style={{ color: 'red' }}>:</span></span> info@yesc.ir</span>
                </div>
            </Grid>
        </Grid>
    )
}