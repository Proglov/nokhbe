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
                    <Link href='https://karafarini.shomal.ac.ir' target='_blank'>
                        <ListItem className='py-0'>
                            <ListItemIcon sx={{ color: 'orange' }}>
                                <GoGoal />
                            </ListItemIcon>
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="مرکز رشد و کارافرینی و شکوفایی بین المللی دانشگاه شمال"
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
                        <span className=''>دفتر مرکزی<span style={{ color: 'red' }}>:</span></span> مازندران، آمل، کیلومتر ۵ جاده هراز، دو راهی امامزاده عبدلله، دانشگاه شمال، ساختمان مرکز رشد و کارآفرینی و باشگاه نخبگان جوان
                    </span>
                </div>
                <div className='flex flex-row'>
                    <span>
                        <span className=''>دفتر مرکزی تهران<span style={{ color: 'red' }}>:</span></span>
                        &nbsp;
                        خیابان کریمخان زند، بین ایرانشهر و خردمند جنوبی، پلاک 108
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