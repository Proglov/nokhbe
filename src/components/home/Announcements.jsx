import { Button, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import NewsComponent from './NewsComponent'
import { getUserRoleAndClubs } from '@/utils/APIUtilities'
import { getTagsSearchParams } from '@/utils/funcs'

export async function getData() {
    try {
        const { clubs: tags } = await getUserRoleAndClubs()
        const resAnnouncements = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements?homePage=true${!!tags ? getTagsSearchParams(tags) : ''}`, { cache: 'no-store' });

        if (!resAnnouncements.ok) {
            throw new Error('Failed to fetch data');
        }

        const announcements = await resAnnouncements.json();

        return announcements.announcements;
    } catch (error) {
        return []
    }
}

export default async function Announcements() {
    const announcements = await getData()

    return (
        <div>
            <div className="flex justify-between px-6 py-2">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '22px', md: '25' }, paddingTop: '10px !important' }} >
                    اطلاعیه
                </Typography>
                <Button variant="contained" className="hover:bg-slate-400 bg-slate-300 rounded-md p-2 text-black" sx={{ fontSize: { xs: '15px', sm: '14px', md: '18px' } }} >
                    <Link href='/announcements'>
                        آرشیو اطلاعیه ها
                    </Link>
                </Button>
            </div>
            <div className="relative" style={{ marginRight: '-20px' }}>
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>
            <div className='shadow-lg shadow-red-100 mt-2'>
                {
                    announcements.length !== 0 ? (
                        <Grid container spacing={2} className="p-6 shadow-lg shadow-red-100">
                            {announcements.map((item) => {
                                return (
                                    <Grid item xs={12} className="grid-item" key={item.id}>
                                        <Link href={`/announcements/${item.id}`}>
                                            <NewsComponent src={item.imagesURL[0]} date={new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))} title={item.title} />
                                        </Link>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <div className='pr-1'>
                            اطلاعاتی جهت نمایش موجود نیست
                        </div>
                    )
                }
            </div>
        </div>
    )
}
