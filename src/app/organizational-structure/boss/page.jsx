import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src1 = '/img/zare.jpg';
    const src2 = '/img/zare.jpg';
    const src3 = '/img/zare.jpg';
    const src4 = '/img/zare.jpg';
    const src5 = '/img/zare.jpg';

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
                        کریم زارع (۱۳۲۹ شیراز) استاد تمام دانشگاه شهید بهشتی و دانشگاه آزاد اسلامی است. که در دوره چهارم مجلس شورای اسلامی نمایندگی شیراز در حوزه انتخابیه استان فارس را برعهده داشته‌است.
                        زارع قبلاً ریاست دانشگاه تربیت معلم (تهران-کرج-اراک-کاشان-یزد-زاهدان و …) و نخستین رئیس واحد در میان واحدهای دانشگاه آزاد اسلامی (واحد تبریز) بوده‌است. وی از سال ۱۳۹۱ با حکم دکتر فرهاد دانشجو تا شهریورماه سال ۱۳۹۶، به مدت ۵ سال، رئیس باشگاه پژوهشگران جوان و نخبگان بود. بعد از او با حکم دکتر فرهاد رهبر که رئیس وقت دانشگاه آزاد اسلامی بود، دکتر حبیب الله آراسته راد، به سمت رئیس باشگاه پژوهشگران جوان و نخبگان دانشگاه آزاد اسلامی منصوب شد. لازم به توضیح است که باشگاه پژوهشگران جوان و نخبگان دانشگاه آزاد اسلامی، که به صورت هیات امنایی اداره می شود و به نوعی از آن به عنوان دانشگاه آزاد اسلامی در مقیاس کوچک، یاد می شود؛ در سال ۱۳۷۷ با پیشنهاد دکتر سید محمدرضا هاشمی گلپایگانی، تاسیس شد. در نگارش اساس نامه این باشگاه، دو چهره به نام های دکتر محمود ملاباشی و دکتر محمد حسین سرورالدین که در نگارش اساس نامه دانشگاه آزاد اسلامی سهمی کلیدی داشتند، ایفای نقش کردند و اکنون به عنوان رئیس باشگاه نخبگان و فرهیختگان دانشگاه شمال فعال می باشد.
                    </div>
                </Container>
            </div>
            <div>
                <Container>
                    <Box className='mx-auto md:w-1/4 w-1/2 mt-9'>
                        <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                        <div className="text-center">ریاست باشگاه</div>
                    </Box>
                </Container>
                <Container>
                    <Box className='mx-auto flex flex-col'>
                        <div className="w-1/2" style={{ height: '35px', borderLeft: '2px solid black' }}></div>
                        <div className="w-2/3 mx-auto" style={{ height: '1px', borderTop: '2px solid black' }}></div>
                        <div className="flex justify-between" style={{ marginTop: '-2px' }}>
                            <div className="w-full">
                                <div className="w-1/2" style={{ height: '35px', borderLeft: '2px solid black' }}></div>
                            </div>
                            <div className="w-full">
                                <div className="w-1/2" style={{ height: '35px', borderLeft: '2px solid black' }}></div>
                            </div>
                            <div className="w-full">
                                <div className="w-1/2" style={{ height: '35px', borderLeft: '2px solid black' }}></div>
                            </div>
                        </div>
                    </Box>
                </Container>
                <Container>
                    <Box className='mx-auto'>
                        <div className="flex justify-center">

                            <div className="text-center md:w-1/4 w-1/3 mx-1">
                                <span className="text-center">معاون اجرایی</span>
                                <Image className="mx-auto rounded-3xl" src={src3} blurDataURL={src3} placeholder="blur" width={600} height={600} alt="Activities" />
                            </div>

                            <div className="text-center md:w-1/4 w-1/3 mx-1">
                                <span className="text-center">معاون هماهنگی</span>
                                <Image className="mx-auto rounded-3xl" src={src4} blurDataURL={src4} placeholder="blur" width={600} height={600} alt="Activities" />
                            </div>

                            <div className="text-center md:w-1/4 w-1/3 mx-1">
                                <span className="text-center sm:text-sm text-xs">معاون اقتصادی و اداری</span>
                                <Image className="mx-auto rounded-3xl" src={src5} blurDataURL={src5} placeholder="blur" width={600} height={600} alt="Activities" />
                            </div>
                        </div>
                    </Box>
                </Container>
            </div>
        </div>
    )
}
