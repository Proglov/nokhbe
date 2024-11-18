import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from '@/lib/NextAuthOptions';
import Link from 'next/link';
import NavbarCalendar from './NavbarCalendar';
import NavbarClientComponent from './NavbarClientComponents';

const Navbar = async () => {
    const session = await getServerSession(NextAuthOptions);

    return (
        <AppBar className='drop-shadow-lg' sx={{ background: 'linear-gradient(to bottom, #090072 40%, #ff9d33)' }}>
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

                    <div className='flex items-center gap-5'>

                        <NavbarClientComponent session={session} />


                        <Box sx={{ width: { xs: '50px', sm: '50px', md: '60px', lg: '70px' } }}>
                            <Link href='/'>
                                <Image
                                    src='/img/brand.jpg'
                                    blurDataURL={'img/wait.png'}
                                    placeholder="blur"
                                    alt="brand"
                                    width={100}
                                    height={100}
                                />
                            </Link>
                        </Box>

                    </div>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;