import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src = '/img/home-main/IMG_20231004_155303_382.jpg'
    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <div className="mt-2">
                <Image className="mx-auto rounded-3xl" src={src} placeholder="blur" blurDataURL={'img/wait.png'} width={600} height={600} alt="Activities" />
            </div>
            <div>

                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 mt-8'>
                        <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                            :: تماس با ما
                        </Typography>
                        <Typography variant="p">
                            <div className="mt-2 pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                دفتر مرکزی : مازندران، آمل، کیلومتر ۵ جاده هراز، دو راهی امامزاده عبدالله،دانشگاه شمال
                            </div>

                            <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                تلفن تماس: ۰۱۱۴۴۲۰۳۷۱۱
                            </div>

                            <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                فکس :   ۰۱۱۴۴۲۰۳۷۵۵
                            </div>

                            <div className="mb-8 pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                پست الکترونیکی: info@yesc.ir
                            </div>

                        </Typography>
                    </Box>
                </Container>

            </div>
        </div>
    )
}
