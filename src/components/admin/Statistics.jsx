"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useContext } from 'react';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { Grid } from '@mui/material';
import { siteAPI } from '@/utils/API';


export default function Statistics() {
    const { staticProps, setStaticProps } = useContext(useAdminContext)

    useEffect(() => {
        setStaticProps(prevProps => ({ ...prevProps, loadingNews: true }));
        fetch(`${siteAPI}/api/news/count`, { cache: 'no-store' })
            .then(response => response.json())
            .then(data => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    loadingNews: false,
                    newsCount: data.count,
                    negativeStatusNewsCount: data.negativeStatus
                }));
            }).catch(err => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    isErrorNews: true,
                    errorNews: err
                }));
            });
    }, [staticProps.newsCount]);

    useEffect(() => {
        setStaticProps(prevProps => ({ ...prevProps, loadingEvents: true }));
        fetch(`${siteAPI}/api/events/count`, { cache: 'no-store' })
            .then(response => response.json())
            .then(data => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    loadingEvents: false,
                    eventsCount: data.count,
                    negativeStatusEventsCount: data.negativeStatus
                }));
            }).catch(err => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    isErrorEvents: true,
                    errorEvents: err
                }));
            });
    }, [staticProps.eventsCount]);

    useEffect(() => {
        setStaticProps(prevProps => ({ ...prevProps, loadingAnnouncements: true }));
        fetch(`${siteAPI}/api/announcements/count`, { cache: 'no-store' })
            .then(response => response.json())
            .then(data => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    loadingAnnouncements: false,
                    announcementsCount: data.count,
                    negativeStatusAnnouncementsCount: data.negativeStatus
                }));
            }).catch(err => {
                setStaticProps(prevProps => ({
                    ...prevProps,
                    isErrorAnnouncements: true,
                    errorAnnouncements: err
                }));
            });
    }, [staticProps.announcementsCount]);

    return (
        <Grid container className='bg-green-500 mr-5 pl-4' sx={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
            <Grid item xs={4}>
                <TableContainer>
                    <Table sx={{ maxWidth: 400 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center'>
                                    تعداد کل اخبار
                                </TableCell>
                                <TableCell align="center">
                                    {staticProps.isErrorNews ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorNews}
                                    </div> : staticProps.loadingNews ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.newsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center'>
                                    اخبار در انتظار تایید
                                </TableCell>
                                <TableCell align="center">
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
                                <TableCell component="th" scope="row" align='center'>
                                    تعداد کل اطلاعیه ها
                                </TableCell>
                                <TableCell align="center">
                                    {staticProps.isErrorAnnouncements ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorAnnouncements}
                                    </div> : staticProps.loadingAnnouncements ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.announcementsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center'>
                                    اطلاعیه های در انتظار تایید
                                </TableCell>
                                <TableCell align="center">
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
                                <TableCell component="th" scope="row" align='center'>
                                    تعداد کل رویدادها
                                </TableCell>
                                <TableCell align="center">
                                    {staticProps.isErrorEvents ? <div>مشکلی رخ داد! لطفا دوباره تلاش کنید :
                                        {staticProps.errorEvents}
                                    </div> : staticProps.loadingAnnouncements ? (
                                        <div>درحال دریافت اطلاعات ...</div>
                                    ) : staticProps.eventsCount}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row" align='center'>
                                    رویدادهای در انتظار تایید
                                </TableCell>
                                <TableCell align="center">
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
