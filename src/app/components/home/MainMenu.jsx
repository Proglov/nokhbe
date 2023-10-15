import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { BsFillCircleFill } from 'react-icons/bs'
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import styles from '../../../styles/MainMenu.module.css'

const useStyles = makeStyles({
    summary: {
        color: 'white'
    },
    detailes: {
        color: 'white'
    },
    acc: {
        width: '100%'
    }
});

export default function MainMenu() {
    const classes = useStyles();

    const circleBG = '#834fff';

    return (
        <Box sx={{ flexGrow: 1, color: 'white' }} className={styles.mainMenu}>

            <Grid container>

                <Grid item xs={12} className={`${classes.detailes}`} container justify="flex-end" alignItems="center">
                    <Grid item className='mr-8'>
                        <ListItemIcon>
                            <BsFillCircleFill color={circleBG} />
                        </ListItemIcon>
                    </Grid>
                    <Grid item>
                        <Link href='#'>
                            <ListItemText primary="اخبار و رویداد" />
                        </Link>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={`mt-2 ${classes.detailes}`} container justify="flex-end" alignItems="center" >
                    <Grid item className='mr-8'>
                        <ListItemIcon>
                            <BsFillCircleFill color={circleBG} />
                        </ListItemIcon>
                    </Grid>
                    <Grid item>
                        <Link href='#'>
                            <ListItemText primary="ورود و لاگین" />
                        </Link>
                    </Grid>
                </Grid>

                <Grid item xs={12} container justify="flex-end" alignItems="center" className={`mt-2 ${classes.detailes}`} >
                    <Grid item className='mr-8'>
                        <ListItemIcon>
                            <BsFillCircleFill color={circleBG} />
                        </ListItemIcon>
                    </Grid>
                    <Grid item>
                        <Link href='#'>
                            <ListItemText primary="خدمات و عضویت" />
                        </Link>
                    </Grid>
                </Grid>

                <Grid item xs={12} container justify="flex-end" alignItems="center" className={`mt-2 ${classes.detailes}`} >
                    <Grid item className='mr-8'>
                        <ListItemIcon>
                            <BsFillCircleFill color={circleBG} />
                        </ListItemIcon>
                    </Grid>
                    <Grid item>
                        <Link href='#'>
                            <ListItemText primary="معرفی و درباه ما" />
                        </Link>
                    </Grid>
                </Grid>


                <Grid item xs={12} container justify="flex-end" alignItems="center" className={`mt-2 ${classes.detailes}`} >
                    <Grid item className='mr-8'>
                        <ListItemIcon>
                            <BsFillCircleFill color={circleBG} />
                        </ListItemIcon>
                    </Grid>
                    <Grid item>
                        <Link href='#'>
                            <ListItemText primary="تماس با ما" />
                        </Link>
                    </Grid>
                </Grid>

            </Grid>
        </Box >
    );
}
