import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/home-main/IMG_20231004_155303_382.jpg';
    const src2 = '/img/home-main/IMG_20231004_155303_382.jpg';
    const src3 = '/img/home-main/IMG_20231004_155303_382.jpg';

    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <div className="mt-4 mr-4">
                <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                    اعضا هیئت امنا
                </Typography>
            </div>
            <div>

                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src3} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                </Container>
            </div>
        </div>
    )
}
