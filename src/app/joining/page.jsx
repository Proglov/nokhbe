import { convertToFarsiNum } from '@/utils/funcs';
import LastNews from '../../components/events/LastNews'
import MenuNav from "@/components/home/MenuNav";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { GiClick } from "react-icons/gi";
import Link from 'next/link';

export default function page() {
    const src1 = '/img/home-main/IMG_20240818_223049_632.jpg';
    const src2 = '/img/home-main/IMG_20240818_223049_994.jpg';

    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <Grid container spacing={8} className="p-3">
                <Grid item xs={12} sm={7} md={8} className="grid-item">

                    <div>
                        <Container>
                            <Box className='mx-auto w-100 my-9 lg:mr-16 xl:mr-28'>
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
                    <div className="mt-2">
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={src1} placeholder="blur" width={600} height={600} alt="Activities" />
                    </div>
                    <div>
                        <Container>
                            <Box className='mx-auto w-100 my-9 lg:mr-16 xl:mr-28'>
                                <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                                    :: خدمات قابل ارائه
                                </Typography>
                                <Typography variant="p">
                                    <Typography className="mt-2" variant="h1" sx={{ fontSize: { xs: '15px', sm: '17px', md: '19px' } }}>
                                        خدمات قابل ارائه باشگاه به وزارتخانه ها، سازمان ها، نهادها، انجمن های علمی، صنفی و تخصصی، دانشگاه دولتی و غیردولتی
                                    </Typography>
                                    <div className="py-1 sm:text-base text-sm">
                                        شناسایی و جذب دانش آموزان ،دانشجویان و جوانانی که دارای استعداد سرشار در رشته های مختلف علمی باشند.
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        برگزاری انواع مسابقات علمی برای شناسایی و تشویق دانش آموزان و دانشجویان و جوانان نخبه و مستعد
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        تدوین و انتشار جزوات،کتب و نشریات علمی و آموزشی لازم
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        تشکیل جلسات سخنرانی و بحث و نقد علمی از طریق استادان و صاحبنظران
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        ایجاد و شرایط و تسهیلات مناسب برای مطالعات و تحقیقات علمی و تهیه و تولید و عرضا نتایج حاصل
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        اعطای جوایز،کمک هزینه و یا بورس تحصیلی به بعضا واجد شرایط
                                    </div>
                                </Typography>
                            </Box>
                        </Container>
                    </div>
                    <div className="mt-2">
                        <Image className="mx-auto rounded-3xl" src={src2} blurDataURL={src2} placeholder="blur" width={600} height={600} alt="Activities" />
                    </div>
                    <div>
                        <Container>
                            <Box className='mx-auto w-100 mt-8 lg:mr-16 xl:mr-28'>
                                <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                                    :: آیین نامه عضویت باشگاه
                                </Typography>
                                <Typography variant="p">
                                    <div className="mt-2 pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        در راستای تحقق وظایف محوله به منظور ایجاد شرایط مناسب برای حمایت و رشد شکوفایی استعدادهای کشور و درراستای ایجاد تحول در باشگاه نخبگان جوان و فرهیختگان آیین نامه عضویت  به شرح ذیل می باشد

                                        شرایط عمومی عضویت در باشگاه:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('1')}) داشتن صلاحیت عمومی پذیرش دانشجو و اعضای هیات علمی که در آیین نامه صلاحیت عمومی دانشگاه ارائه شده است.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('2')}) اعضا بنیاد ملی نخبگان در اولویت می باشند.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        تبصره {convertToFarsiNum('1')}) پذیرش و عضویت از تمامی دانشجویان و اعضا هیات علمی دانشگاه های دولتی و غیر دولتی سراسر کشور امکان پذیر می باشد.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        انواع عضویت درباشگاه :
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        نوع عضویت اولیه متقاضیان براساس مدارک ارائه شده در زمان ثبت نام تعیین میشود.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('1')}) عضو عادی
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('2')}) عضو استعدادهای درخشان
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('3')}) عضو نخبه
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('4')}) عضو افتخاری
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('5')}) عضو دانشجویی
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('6')}) عضو دانش آموزی
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('7')}) عضو کارشناس
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        لغو عضویت:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        هریک از موارد زیر منجر به لغو عضویت میگردد:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('1')}) از دست دادن شرایط اختصاصی و عمومی مصوب
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('2')}) سپری شدن مدت عضویت
                                    </div>

                                    <div className="pt-2 mb-8 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        {convertToFarsiNum('3')}) عدم تبعیت از مقررات باشگاه و آیین نامه های انضباطی
                                    </div>
                                </Typography>
                            </Box>
                        </Container>
                    </div>

                    <Link href='/authentication' className='w-full'>
                        <Button variant='contained' color='info' sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }} className="flex mx-auto">
                            برای عضویت کلیک
                            &nbsp;
                            <GiClick />
                            &nbsp;
                            کنید
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={5} md={4} className="grid-item">
                    <LastNews type='news' />
                </Grid>
            </Grid>

            <br />

        </div>
    )
}
