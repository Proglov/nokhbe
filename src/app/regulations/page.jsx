import LastNews from "@/components/events/LastNews";
import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src = '/img/home-main/IMG_20231004_155303_382.jpg'
    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <Grid container spacing={8} className="p-3">
                <Grid item xs={12} sm={7} md={8} className="grid-item">
                    <div className="mt-2">
                        <Image className="mx-auto rounded-3xl" src={src} blurDataURL={'img/wait.png'} placeholder="blur" width={600} height={600} alt="Activities" />
                    </div>
                    <div>
                        <Container>
                            <Box className='mx-auto w-100 mt-8'>
                                <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                                    :: آیین نامه عضویت باشگاه
                                </Typography>
                                <Typography variant="p">
                                    <div className="mt-2 pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        در راستای تحقق وظایف محوله به منظور ایجاد شرایط مناسب برای حمایت و رشد شکوفایی استعدادهای کشور و درراستای ایجاد تحول در باشگاه نخبگان جوان و فرهیختگان آیین نامه عضویت  به شرح ذیل می باشد

                                        شرایط عمومی عضویت در باشگاه:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        1)داشتن حداکثر 35 سال سن
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        2)داشتن صلاحیت عمومی پذیرش دانشجو و اعضای هیات علمی که در آیین نامه صلاحیت عمومی دانشگاه ارائه شده است.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        3)اعضا بنیاد ملی نخبگان در اولویت می باشند.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        تبصره 1) پذیرش و عضویت از تمامی دانشجویان و اعضا هیات علمی دانشگاه های دولتی و غیر دولتی سراسر کشور امکان پذیر می باشد.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        انواع عضویت درباشگاه :
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        نوع عضویت اولیه متقاضیان براساس مدارک ارائه شده در زمان ثبت نام تعیین میشود.
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        1)عضو عادی
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        2)عضو استعدادهای درخشان
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        3)عضو نخبه
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        4)عضو افتخاری
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        لغو عضویت:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        هریک از موارد زیر منجر به لغو عضویت میگردد:
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        1)از دست دادن شرایط اختصاصی و عمومی مصوب
                                    </div>

                                    <div className="pt-2 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        2)سپری شدن مدت عضویت
                                    </div>

                                    <div className="pt-2 mb-8 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        3)عدم تبعیت از مقررات باشگاه و آیین نامه های انضباطی
                                    </div>
                                </Typography>
                            </Box>
                        </Container>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5} md={4} className="grid-item">
                    <LastNews type='news' />
                </Grid>
            </Grid>

            <br />

        </div>
    )
}
