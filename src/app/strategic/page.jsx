import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/home-main/IMG_20240128_231605_077.jpg';

    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <div>
                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                </Container>
            </div>
        </div>
    )
}
