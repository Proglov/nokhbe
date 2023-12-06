import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SlCalender } from 'react-icons/sl'
import { Box } from '@mui/material';
import Image from 'next/image';
import { LiaSignOutAltSolid, LiaSignInAltSolid } from "react-icons/lia";
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from '@/lib/NextAuthOptions';
import ButtonSignOut from './ButtonSignOut';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(NextAuthOptions);

    return (
        <AppBar className='drop-shadow-lg' position="static" sx={{ background: 'linear-gradient(to bottom, #090072 40%, #ff9d33)' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>

                    <Box sx={{ width: { xs: '200px', sm: '280px', md: '340px', lg: '400px' }, transform: { xs: 'translateX(20px)', sm: 'translateX(0px)' } }}>
                        <Link href='/'>
                            <Image
                                src='/img/bashgah1.png'
                                blurDataURL={'img/wait.png'}
                                placeholder="blur"
                                alt="Logo"
                                width={1200}
                                height={600}
                            />
                        </Link>
                    </Box>

                    <div className='flex'>

                        <>
                            {
                                session?.user?.role === process.env.ADMIN_ROLE &&
                                <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '10px', md: '15px', fontFamily: 'Shabnam' }, minWidth: '50px' }} className='px-2 opacity-80 mx-1'>
                                    <Link href={'/ADMIN'}>
                                        پنل ادمین
                                    </Link>
                                </Typography>
                            }
                        </>

                        <>
                            {
                                session?.user &&
                                <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'red', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '10px', md: '15px', fontFamily: 'Shabnam' }, padding: { xs: '0', sm: '2px', md: '5px' } }} className='text-slate-50 opacity-80 mx-1'>
                                    <ButtonSignOut />
                                    <LiaSignOutAltSolid style={{ fontSize: '25px' }} />
                                </Typography>
                            }
                            {
                                !session?.user &&
                                <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '10px', md: '15px', fontFamily: 'Shabnam' }, minWidth: '50px' }} className='px-2 opacity-80 mx-1'>
                                    <Link href={'/authentication'}>
                                        ورود
                                    </Link>
                                    <LiaSignInAltSolid style={{ fontSize: '25px' }} />
                                </Typography>
                            }
                        </>


                        <>
                            <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #ffffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '18px', fontFamily: 'Shabnam' } }} className='p-1 opacity-80'>
                                {new Intl.DateTimeFormat('fa-IR').format(new Date())}
                                <SlCalender className='m-1' />
                            </Typography>
                        </>

                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;