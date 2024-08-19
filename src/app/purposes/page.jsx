import LastNews from "@/components/events/LastNews";
import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    const src = '/img/home-slider/IMG_20231004_155759_101.jpg'

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
                            <Box className='mx-auto w-100 mt-8 lg:mr-16 xl:mr-24 2xl:mr-32'>
                                <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                                    :: ماموریت باشگاه
                                </Typography>
                                <Typography variant="p">
                                    <div className="mt-2 py-1 sm:text-base text-sm">
                                        شناسایی، جذب، پرورش، حمایت و هدايت و اعتلای سطح علمی دانش آموزان، دانشجويان و جوانان با استعداد كشور
                                    </div>
                                </Typography>
                            </Box>
                        </Container>

                        <br />

                        <Container>
                            <Box className='mx-auto w-100 mt-2 mb-9 lg:mr-16 xl:mr-24 2xl:mr-32'>
                                <Typography variant="h1" sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}>
                                    :: اهداف باشگاه نخبگان جوان و فرهیختگان دانشگاه شمال
                                </Typography>
                                <Typography variant="p">
                                    <div className="mt-2 py-1 sm:text-base text-sm">
                                        بروز و ظهور خلاقيت های اعضاء در زمينه های گوناگون علمی، پژوهشی، آموزشی و كارآفرينی
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        ارتقای سطح كيفی اعضاء در ابعاد مختلف فرهنگی، آموزشی و پژوهشی
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        توسعه روحيه گروه گرائی در بين اعضاء و ساماندهی آنها در فعاليتهای دستجمعی
                                    </div>
                                    <div className="py-1 sm:text-base text-sm">
                                        هدايت و تقويت استعدادهای اعضاء در جهت تأمين نيازهای علمی – پژوهشی كشور
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

        </div>
    )
}
