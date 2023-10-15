import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import moment from 'moment-jalaali';
import { SlCalender } from 'react-icons/sl'
import { Box } from '@mui/material';
import Image from 'next/image';

const Navbar = () => {
    moment.loadPersian();
    const today = moment().format('jYYYY/jMM/jD');

    return (
        <AppBar className='drop-shadow-lg' position="static" sx={{ background: 'linear-gradient(to bottom, #090072 40%, #ff9d33)' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>

                    <Box sx={{ width: { xs: '200px', sm: '500px', md: '800px' }, transform: { xs: 'translateX(20px)', sm: 'translateX(0px)' } }}>

                        <Image
                            src='/img/bashgah1.png'
                            className="object-cover"
                            alt="Logo"
                            width={250}
                            height={50}
                        />
                    </Box>
                    <Typography sx={{ display: 'flex', alignItems: 'center', backgroundColor: ' #f1ffff ', borderRadius: '15px', color: 'black', fontSize: { xs: '10px', sm: '18px' } }} className='p-1'>
                        {today}
                        <SlCalender className='m-1' />
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;