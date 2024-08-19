import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/members/zare.jpg';
    const src2 = '/img/home-main/IMG_20240128_231607_615.jpg';
    const src3 = '/img/members/zare-life.jpg';

    return (
        <div>
            <div className="mt-10 text-center">
                <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                    رئیس باشگاه نخبگان جوان و فرهیختگان دانشگاه شمال
                </Typography>
            </div>
            <div>
                <Container>
                    <Box className='mx-auto w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                    <Image className="mx-auto rounded-3xl" src={src3} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    <br />
                    <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    <br />
                </Container>
            </div>
        </div>
    )
}
