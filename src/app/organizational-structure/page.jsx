import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    return (
        <div>
            <div className="mt-2">
                <Image className="mx-auto rounded-3xl" src='/img/home-main/IMG_20231004_155303_382.jpg' width={600} height={600} alt="Activities" />
            </div>
            <div>

                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                            ساختار سازمانی
                        </Typography>
                    </Box>
                </Container>
            </div>
        </div>
    )
}
