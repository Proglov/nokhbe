import { Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EventComponents from "./EventComponents";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getTagsSearchParams } from "@/utils/funcs";
import { getUserRoleAndClubs } from "@/utils/APIUtilities";


export async function getData() {
    try {
        const { clubs: tags } = await getUserRoleAndClubs()
        const resEvents = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events?homePage=true${!!tags ? getTagsSearchParams(tags) : ''}`, { cache: 'no-store' });

        if (!resEvents.ok) {
            throw new Error('Failed to fetch data');
        }

        const events = await resEvents.json();

        return events.events;
    } catch (error) {
        return []
    }
}


export default async function Events() {
    const events = await getData()

    return (
        <div>
            <div className="flex justify-between px-9 py-2" id="events">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '23px', lg: '23px' }, paddingTop: '10px !important' }}>
                    رویداد های پیش رو
                </Typography>
                <Button variant="contained" className="bg-slate-300 rounded-md p-2 hover:bg-slate-400 text-black" sx={{ fontSize: { xs: '15px', sm: '16px' } }}>
                    <Link href='/events'>
                        مشاهده همه رویدادها
                    </Link>
                </Button>
            </div>

            <div className="relative">
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>

            {events.length !== 0 ? (
                <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                    {events.map(item => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item" key={item.id}>
                            <Link href={`/events/${item.id}`}>
                                <EventComponents date={item.eventAt} title={item.title} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div className='pr-6 pt-3'>
                    اطلاعاتی جهت نمایش موجود نیست
                </div>
            )}
            <br />
        </div>
    );
}
