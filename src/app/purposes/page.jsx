import MenuNav from "@/components/home/MenuNav";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
    return (
        <div>
            <nav className="mt-1">
                <MenuNav />
            </nav>
            <div className="mt-2">
                <Image className="mx-auto rounded-3xl" src='/img/home-main/IMG_20231004_155303_382.jpg' width={600} height={600} alt="Activities" />
            </div>
            <div>

                <Container>
                    <Box className='mx-auto md:w-3/5 w-100 mt-8'>
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
                    <Box className='mx-auto md:w-3/5 w-100 mt-2 mb-9'>
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
        </div>
    )
}
