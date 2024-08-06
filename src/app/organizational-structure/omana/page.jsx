import LastNews from "@/components/events/LastNews";
import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/home-main/IMG_20240128_231614_116.jpg';

    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <Grid container spacing={8} className="p-3">
                <Grid item xs={12} sm={7} md={8} className="grid-item">
                    <div className="mt-4 mr-8">
                        <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                            اعضا هیئت امنا
                        </Typography>
                    </div>
                    <div>

                        <Container>
                            <Box className='mx-auto my-9'>
                                <Image className="mx-auto rounded-xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                            </Box>
                        </Container>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5} md={4} className="grid-item">
                    <LastNews type='news' />
                </Grid>
            </Grid>

            <br />

        </div>
    )
}
