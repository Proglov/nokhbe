import { Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EventComponents from "./EventComponents";
import { AiOutlineArrowLeft } from "react-icons/ai"

export default function Events() {
    return (
        <div>
            <div className="flex justify-between px-9 py-2">
                <Typography variant="h2" sx={{ fontSize: { xs: '22px', sm: '25px', lg: '25px' }, paddingTop: '10px !important' }} >
                    رویداد های پیش رو
                </Typography>
                <Button variant="contained" className="bg-slate-300 rounded-md p-2 hover:bg-slate-400 text-black" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
                    <Link href='#'>
                        مشاهده همه رویدادها
                    </Link>
                </Button>
            </div>
            <div className="relative">
                <Divider className="bg-black mx-5" sx={{ borderBottomWidth: 3 }} />
                <AiOutlineArrowLeft className="text-black absolute" style={{ top: '-7px', left: '12px' }} />
            </div>
            <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={1} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={2} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={5} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={1} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={2} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={5} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={1} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item">
                    <Link href='#'>
                        <EventComponents day={15} month={2} year={1398} desc="نخستین اجلاس هم اندیشی باشگاه نخبگان جوان و فرهیختگان" />
                    </Link>
                </Grid>
            </Grid>
            <br />
        </div>
    )
}