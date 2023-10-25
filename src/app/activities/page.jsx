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
                            :: فعالیت های باشگاه
                        </Typography>
                        <Typography variant="p">
                            <div className="mt-2 py-1 sm:text-base text-sm">
                                الگوگیری اعضا از شخصیتهای فرهیخته کشور
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                تقویت باورهای دینی و تحکیم مبانی فرهنگ ملی  و بومی اعضا
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                آموزش اعضا در راستای ارتقای توانمندی های آنها
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                افزایش تعداد اعضای باشگاه و پوشش هرچه بیشتر واجدین شرایط
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                حمایت از طرح های پژوهشی در راستای افزایش کمی و کیفی فعالیتهای علمی آنها
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                هدایت توانمندی اعضا در راستای کارآفرینی و تولید فناوری
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                مدیریت منابع انسانی ،فیزیکی ،اطلاعاتی و تجهیزاتی باشگاه
                            </div>
                            <div className="py-1 sm:text-base text-sm">
                                تقویت روحیه آزاد اندیشی اعضا و تعمیق اطلاعات اجتماعی آنها
                            </div>
                        </Typography>
                    </Box>
                </Container>
            </div>
        </div>
    )
}
