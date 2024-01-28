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
                                    :: آشنایی با باشگاه نخبگان جوان وفرهیختگان دانشگاه شمال
                                </Typography>
                                <Typography variant="p">
                                    <div className="mt-2 pt-1 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        نظر به تأکید مقام‌ معظم‌رهبری در استفاده صحیح و مناسب از ظرفیت‌های علمی نخبگان در راستای توسعه کشور و لزوم حرکت انقلابی در مسیر رفع موانع و مشکلات تولید دانش و جنبش نرم‌افزاری در سال 1398،باشگاه نخبگان جوان و فرهیختگان برای پیوند و هماهنگی بین کارگروه های استارتاپی،نخبگان ،فرهیختگان،فناوران و سرمایه گزاران در راستای هوشمند سازی تشکیل شد.
                                    </div>

                                    <div className="mt-2 pt-1 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        برنامه‌ریزی و سیاستگذاری برای شناسایی، هدایت، حمایت مادی و معنوی نخبگان (در دو طیف مستعدان برتر و نخبه)، جذب، حفظ و به‌کارگیری و پشتیبانی از آنان در راستای ارتقاء تولید علم، فناوری، هنر، ادب و فرهنگ و توسعه علمی و متوازن کشور و احراز جایگاه برتر علمی، فناوری و اقتصادی در منطقه براساس سند چشم انداز کشور در افق 1404، هدف غایی باشگاه نخبگان جوان و فرهیختگان  محسوب می‌شود.
                                    </div>

                                    <div className="mt-2 pt-1 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        در همین راستا، حمایت‌های این باشگاه  به صورت متنوع با مخاطب قرار دادن همۀ اجتماعات نخبگانی در حوزه‌های مختلف، ارائه شده است که از آن جمله می‌توان به حمایت از دانشجویان و دانش‌آموختگان‌برتر دانشگاهی، اعضای هیئت‌علمی، مخترعان و نوآوران و برگزیدگان هنری، ادبی، قرآنی و حوزوی، اشاره کرد.
                                    </div>

                                    <div className="mt-2 mb-8 pt-1 sm:text-base text-sm" style={{ textAlign: 'justify' }}>
                                        توجه و برنامه‌ریزی امور فرهنگی و فرهنگساز از دیگر رسالت های باشگاه است که عمده فعالیت‌های این بخش عبارتند از:
                                        برنامه‌های تربیتی-آموزشی مانند برپایی کارگاه‌‌های توانمندسازی و مهارت‌آموزی با هدف توسعۀ زیست‌بوم کارآفرینی و اشتغال‌زایی نخبگانی؛ برگزاری نشست اجتماعات نخبگانی ؛ اجرای طرح دوست علمی در رشته‌های مختلف با حضور مستعدان‌برتر دانشگاهی و با هدف ارائۀ آموزش‌های لازم به دانش‌آموزان مناطق مختلف کشور خاصه مناطق کم‌برخوردار و محروم، انجام بازدیدهای تخصصی و فرهنگی متناسب با رشته و علاقۀ اجتماع نخبگانی (مستعدان برتر و نخبگان)، برگزاری نکوداشت سرآمدان ایرانی در حوزه‌های مختلف و برپایی اردوهای جهادی به منظور تزریق تفکر نخبگانی به بخش‌های مورد نیاز با رویکرد محرومیت‌زدایی.
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
