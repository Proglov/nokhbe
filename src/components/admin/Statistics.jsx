"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useContext } from 'react';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { Grid } from '@mui/material';
import { capitalizeFirstLetter } from '@/utils/funcs';


export default function Statistics() {
    const { staticProps, setStaticProps } = useContext(useAdminContext)
    const fontClassName = "sm:text-sm text-xs md:text-base";

    const commonFunction = type => {
        setStaticProps(prevProps => ({ ...prevProps, [`loading${capitalizeFirstLetter(type)}`]: true }));
        fetch(`/api/${type}?onlyCount=true&addNegativeStatusCount=true`, { cache: 'no-store' })
            .then(response => response.json())
            .then(data => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    [`loading${capitalizeFirstLetter(type)}`]: false,
                    [`${type}Count`]: data.count,
                    [`negativeStatus${capitalizeFirstLetter(type)}Count`]: data.negativeStatusCount
                }));
            }).catch(err => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    [`isError${capitalizeFirstLetter(type)}`]: true,
                    [`error${capitalizeFirstLetter(type)}`]: err
                }));
            });
    }

    useEffect(() => {
        commonFunction('news')
    }, [staticProps.newsCount, setStaticProps]);

    useEffect(() => {
        commonFunction('events')
    }, [staticProps.eventsCount, setStaticProps]);

    useEffect(() => {
        commonFunction('announcements')
    }, [staticProps.announcementsCount, setStaticProps]);

    return (
        <Grid container className='bg-green-500 mr-5 pl-4' sx={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
            <Grid item xs={4}>
                <TableContainer>
                    <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    تعداد کل اخبار
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorNews ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorNews}
                                    </div> : staticProps.loadingNews ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.newsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    اخبار در انتظار تایید
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorNews ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorNews}
                                    </div> : staticProps.loadingNews ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.negativeStatusNewsCount}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={4}>
                <TableContainer>
                    <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    تعداد کل اطلاعیه ها
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorAnnouncements ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorAnnouncements}
                                    </div> : staticProps.loadingAnnouncements ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.announcementsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    اطلاعیه های در انتظار تایید
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorAnnouncements ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorAnnouncements}
                                    </div> : staticProps.loadingAnnouncements ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.negativeStatusAnnouncementsCount}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={4}>
                <TableContainer >
                    <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    تعداد کل رویدادها
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorEvents ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorEvents}
                                    </div> : staticProps.loadingAnnouncements ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.eventsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center' className={fontClassName}>
                                    رویدادهای در انتظار تایید
                                </TableCell>
                                <TableCell align="center" className={fontClassName}>
                                    {staticProps.isErrorEvents ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorEvents}
                                    </div> : staticProps.loadingEvents ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.negativeStatusEventsCount}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
