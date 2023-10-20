import { Button, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { BsFillCircleFill } from 'react-icons/bs'
import NewsTop from './NewsTop'
import NewsComponent from './NewsComponent'
import { AiOutlineArrowDown } from 'react-icons/ai'

const titles = [
    "نشست رئیس هیات امناء دانشگاه شمال با حضور مسئولان دانشگاه",
    "نحوه دریافت لوح سپاس و گواهینامه حضور",
    "تکمیل اطلاعات در کنترل پنل کاربران",
    "انتصاب رئیس باشگاه نخبگان جوان و فرهیختگان",
    "برگزاری اجلاس هم اندیشی نخبگان جوان و فرهیختگان",
    "عضویت افتخاری در باشگاه نخبگان جوان و فرهیختگان",
    "افتتاح باشگاه نخبگان جوان و فرهیختگان",
]

const description = 'رئیس هیات امناء دانشگاه شمال در جلسه ای با حضور مسئولان دانشگاه، مرکز رشد کارآفرینی بین الملل دانشگاه شمال و باشگاه نخبگان جوان و فرهیختگان مواردی به شرح زیر را بیان نمودند: ';

export default function News() {
    return (
        <div>

            <div className="flex justify-between px-8 py-2">
                <Typography variant="h2" className='text-3xl'>
                    اخبار
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 text-xl rounded-md p-2 text-black">
                    <Link href='#'>
                        آرشیو اخبار
                    </Link>
                </Button>
            </div>

            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <BsFillCircleFill className="text-black absolute" style={{ top: '-4px', left: '12px', fontSize: '10px' }} />
            </div>

            <div style={{ borderLeft: '2px solid black', marginLeft: '16px', marginTop: '-5px' }} className='shadow-lg shadow-green-100 relative'>
                <div className='mt-2 p-3'>
                    <NewsTop src='/img/home-news/r_64_190826150203.jpg' day={3} month={6} year={1398} title={titles[0]} desc={description} href='#' />
                </div>
                <div>
                    <Grid container spacing={2} className="p-3">
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_61_190817135151.jpg' day={3} month={6} year={1398} title={titles[1]} href='#' />
                        </Grid>
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_60_190817134357.png' day={3} month={6} year={1398} title={titles[2]} href='#' />
                        </Grid>
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_64_190826150203.jpg' day={3} month={6} year={1398} title={titles[3]} href='#' />
                        </Grid>
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_59_190817132349.JPG.JPG' day={3} month={6} year={1398} title={titles[4]} href='#' />
                        </Grid>
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_62_190817141706.JPG' day={3} month={6} year={1398} title={titles[5]} href='#' />
                        </Grid>
                        <Grid item xs={12} sm={6} className="grid-item">
                            <NewsComponent src='/img/home-news/r_58_190810162354.jpg' day={3} month={6} year={1398} title={titles[6]} href='#' />
                        </Grid>
                    </Grid>
                </div>
                <AiOutlineArrowDown className='absolute' style={{ left: '-9px', bottom: '-5px' }} />
            </div>

        </div>
    )
}
