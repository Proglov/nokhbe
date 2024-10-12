import { Button, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { BsFillCircleFill } from 'react-icons/bs'
import NewsTop from './NewsTop'
import NewsComponent from './NewsComponent'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { getTagsSearchParams } from '@/utils/funcs'
import { getUserRoleAndClubs } from '@/utils/APIUtilities'


export async function getData() {
    try {
        const { clubs: tags } = await getUserRoleAndClubs()
        const resNews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?homePage=true${!!tags ? getTagsSearchParams(tags) : ''}`, { cache: 'no-store' });

        if (!resNews.ok) {
            throw new Error('Failed to fetch data');
        }

        const news = await resNews.json();

        return news.news;
    } catch (error) {
        return []
    }
}

export default async function News() {
    const news = await getData()

    return (
        <div>

            <div className="flex justify-between px-8 py-2">
                <Typography variant="h2" className='text-3xl'>
                    اخبار
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 text-xl rounded-md p-2 text-black">
                    <Link href='/news'>
                        آرشیو اخبار
                    </Link>
                </Button>
            </div>

            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <BsFillCircleFill className="text-black absolute" style={{ top: '-4px', left: '12px', fontSize: '10px' }} />
            </div>

            <div style={{ borderLeft: '2px solid black', marginLeft: '16px', marginTop: '-5px' }} className='shadow-lg shadow-green-100 relative'>

                <AiOutlineArrowDown className='absolute' style={{ left: '-9px', bottom: '-5px' }} />
                {
                    news.length !== 0 ? (
                        <>
                            <div className='mt-2 p-3'>
                                <Link href={`/news/${news[0].id}`}>
                                    <NewsTop src={news[0].imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(news[0].createdAt))} title={news[0].title} desc={news[0].description} />
                                </Link>
                            </div>
                            <div>
                                <Grid container spacing={2} className="p-6 shadow-lg shadow-green-100">
                                    {news.map((item, i) => {
                                        if (i !== 0) {
                                            return (
                                                <Grid item xs={12} sm={12} md={6} lg={6} className="grid-item" key={item.id}>
                                                    <Link href={`/news/${item.id}`}>
                                                        <NewsComponent src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} title={item.title} />
                                                    </Link>
                                                </Grid>
                                            )
                                        }
                                    })}
                                </Grid>
                            </div>
                        </>
                    ) : (
                        <div className='pr-3 pt-3'>
                            اطلاعاتی جهت نمایش موجود نیست
                        </div>
                    )
                }
            </div>
        </div>

    )
}
