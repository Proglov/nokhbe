import { Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src2 = '/img/home-main/IMG_20240128_231607_615.jpg';

    return (
        <div>
            <div className="mt-10 text-center">
                <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                    شورای راهبری باشگاه نخبگان جوان و فرهیختگان شمال
                </Typography>
            </div>
            <div>
                <Container>
                    <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    <br />
                </Container>
            </div>
        </div>
    )
}
