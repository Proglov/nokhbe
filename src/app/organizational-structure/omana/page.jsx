import LastNews from "@/components/events/LastNews";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
// import Link from "next/link";

export default function page() {
    // const src1 = '/img/members/nurian.jpg';
    // const src2 = '/img/members/ranjbar.jpg';
    // const src3 = '/img/members/razavi.jpg';
    // const src4 = '/img/members/zare.jpg';
    // const src5 = '/img/members/falahian.jpg';
    // const src6 = '/img/members/hashemi.jpg';
    // const src7 = '/img/members/roudi.jpg';
    // const src8 = '/img/members/rostami.jpg';
    // const src9 = '/img/members/sobhani.jpg';
    // const src10 = '/img/members/ahmadi.jpg';
    // const src11 = '/img/members/attar.jpg';
    // const src12 = '/img/members/lamei.jpg';
    // const src13 = '/img/members/yousef.jpg';


    const src = '/img/members/heyatomana.png';

    return (
        <Grid container spacing={8} className="p-3">
            <Grid item xs={12} sm={7} md={8} className="pr-8 lg:pr-24 xl:pr-32 2xl:pr-40">

                <div className="mt-4">
                    <Typography variant="h1" sx={{ fontSize: { xs: '18px', sm: '20px', md: '22px' } }}>
                        اعضا هیئت امنا
                    </Typography>
                </div>


                <Image className="mx-auto rounded-3xl" src={src} blurDataURL={'img/wait.png'} placeholder="blur" width={1000} height={1000} alt="Activities" />

                {/* <div className="my-6">
                    <Typography variant="h1" sx={{ fontSize: { xs: '15px', sm: '18px', md: '20px' } }}>
                        اعضا حقوقی
                    </Typography>
                </div>

                <Grid container gap={2}>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={200} height={100} alt="Activities" />
                        <Link href='https://fa.wikipedia.org/wiki/%D8%B9%D9%84%DB%8C%E2%80%8C%D9%85%D8%AD%D9%85%D8%AF_%D9%86%D9%88%D8%B1%DB%8C%D8%A7%D9%86#:~:text=%D9%86%D9%88%D8%B1%DB%8C%D8%A7%D9%86%20%D8%A8%DB%8C%D8%B4%20%D8%A7%D8%B2%20%D8%AF%D9%88%20%D8%AF%D9%87%D9%87,%D9%88%20%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%82%D9%84%DB%8C%D9%85%DB%8C%20%D9%85%D9%86%D8%B5%D9%88%D8%A8%20%D8%B4%D8%AF' className="p-1 text-center text-sm">
                            دکتر علیمحمد نوریان
                            <br />
                            رئیس هیئت امناء دانشگاه شمال
                            <br />
                            <br />
                            رئیس هیئت امناء باشگاه
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl mt-5" src={src2} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://fmsua.shomal.ac.ir/profile/Ranjbar'} className="p-1 text-center text-sm">
                            دکتر حسین رنجبر
                            <br />
                            رئیس دانشگاه شمال
                            <br />
                            <br />
                            نائب اول رئیس
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl mt-[-15px]" src={src3} blurDataURL={'img/wait.png'} placeholder="blur" width={240} height={100} alt="Activities" />
                        <Link href={'https://civilica.com/p/240413/'} className="p-1 text-center text-sm">
                            دکتر سید محمد حسین رضوی
                            <br />
                            مدیر عامل موسسه دانشگاهی شمال
                            <br />
                            <br />
                            نائب رئیس دوم
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl" src={src4} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'/organizational-structure/boss'} className="p-1 text-center text-sm">
                            دکتر کریم زارع
                            <br />
                            رئیس باشگاه نخبگان جوان و فرهیختگان دانشگاه شمال
                            <br />
                            <br />
                            دبیر هیئت امنا
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl" src={src5} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://fmsua.shomal.ac.ir/profile/Fallahian'} className="p-1 text-center text-sm">
                            دکتر سعید فلاحیان
                            <br />
                            معاون پژوهشی و فناوری دانشگاه
                            <br />
                            <br />
                            عضو هیئت امناء
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl" src={src6} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://fmsua.shomal.ac.ir/profile/kamangar'} className="p-1 text-center text-sm">
                            دکتر مهرداد هاشمی کمانگر
                            <br />
                            معاون آموزشی و تحصیلات تکمیلی دانشگاه
                            <br />
                            <br />
                            عضو هیئت امناء
                        </Link>
                    </Grid>

                    <Grid item xs={2.7}>
                        <Image className="mx-auto rounded-3xl" src={src7} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://fmsua.shomal.ac.ir/profile/Roudi'} className="p-1 text-center text-sm">
                            دکتر غلامعلی رودی
                            <br />
                            معاون دانشجویی و فرهنگی دانشگاه
                            <br />
                            <br />
                            عضو هیئت امناء
                        </Link>
                    </Grid>


                </Grid>

                <div className="mt-9">
                    <Typography variant="h1" sx={{ fontSize: { xs: '15px', sm: '18px', md: '20px' } }}>
                        اعضا حقیقی
                    </Typography>
                </div>
                <Grid container gap={2}>

                    <Grid item xs={2.7} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src8} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://civilica.com/p/182461/'} className="p-1 text-center text-sm">
                            دکتر عباسعلی رستمی
                            <br />
                            عضو هیئت موسس دانشگاه شمال
                            <br />
                            <br />
                            عضو دانشمند امناء
                        </Link>
                    </Grid>

                    <Grid item xs={2.7} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src9} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://fa.wikipedia.org/wiki/%D8%AD%D8%B3%DB%8C%D9%86_%D8%B3%D8%A8%D8%AD%D8%A7%D9%86%DB%8C%E2%80%8C%D9%86%DB%8C%D8%A7'} className="p-1 text-center text-sm">
                            دکتر حسین سبحانی نیا
                            <br />
                            نائب رئیس مجمع نمایندگان ادوار
                            <br />
                            <br />
                            عضو فرهیخته امناء
                        </Link>
                    </Grid>

                    <Grid item xs={2.7} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src10} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://civilica.com/p/339680/'} className="p-1 text-center text-sm">
                            دکتر فتاح احمدی
                            <br />
                            معاون اسبق وزیر دادگستری
                            <br />
                            <br />
                            عضو حقوقدان برجسته امناء
                        </Link>
                    </Grid>

                    <Grid item xs={2.7} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src11} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Typography className="p-1 text-center text-sm">
                            دکتر حسین عطار
                            <br />
                            مدیرعامل شرکت دارویی
                            <br />
                            <br />
                            عضو صنعتگر برجسته امناء
                        </Typography>
                    </Grid>

                    <Grid item xs={3.5} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src12} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Typography className="p-1 text-center text-sm">
                            سرکار خانم طاهره لامعی
                            <br />
                            رئیس سابق مرکز نسیبه
                            <br />
                            <br />
                            دبیر موفق آموزش و پرورش
                        </Typography>
                    </Grid>

                    <Grid item xs={3} className="mt-5">
                        <Image className="mx-auto rounded-3xl" src={src13} blurDataURL={'img/wait.png'} placeholder="blur" width={260} height={120} alt="Activities" />
                        <Link href={'https://rc.majlis.ir/fa/parliament_member/show/701991'} className="p-1 text-center text-sm">
                            عزت الله یوسفیان ملا
                            <br />
                            نماینده ۴ دوره حوزه انتخابیه آمل و لاریجان / از مدیران ارشد سابق قوه قضائیه
                            <br />
                            <br />
                            عضو فرهیخته امناء
                        </Link>
                    </Grid>

                </Grid> */}
            </Grid>
            <Grid item xs={12} sm={5} md={4} className="grid-item">
                <LastNews type='news' />
            </Grid>
        </Grid>
    )
}
