import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/zare.jpg';
    const src2 = '/img/home-main/IMG_20240128_231607_615.jpg';

    return (
        <div>
            <div className="mt-4 mr-4">
                <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                    رئیس محترم باشگاه
                </Typography>
            </div>
            <div>
                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 my-9'>
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </Box>
                    <div style={{ textAlign: 'justify' }}>
                        کریم زارع (۱۳۲۹ شیراز) استاد تمام دانشگاه شهید بهشتی و دانشگاه آزاد اسلامی است. که در دوره چهارم مجلس شورای اسلامی نمایندگی شیراز در حوزه انتخابیه استان فارس را برعهده داشته‌است. زارع قبلاً ریاست دانشگاه تربیت معلم (تهران-کرج-اراک-کاشان-یزد-زاهدان و …) و نخستین رئیس واحد در میان واحدهای دانشگاه آزاد اسلامی (واحد تبریز) بوده‌است. وی از سال 1397 با حکم رئیس هیئت امناء دانشگاه شمال به سمت ریاست باشگاه نخبگان و فرهیختگان جوان شمال انتخاب گردید
                    </div>
                    <br />
                    <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    <br />
                </Container>
            </div>
        </div>
    )
}
