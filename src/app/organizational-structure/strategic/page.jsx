import LastNews from "@/components/events/LastNews";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function page() {
    const src1 = '/img/members/nurian.jpg';
    const src3 = '/img/members/razavi.jpg';
    const src8 = '/img/members/rostami.jpg';

    return (
        <div>
            <Grid container spacing={8} className="p-3">
                <Grid item xs={12} sm={7} md={8} className="grid-item mt-6">

                    <Typography className="text-center mb-5">
                        شورایعالی راهبردی باشگاه نخبگان جوان و فرهیختگان دانشگاه شمال مصوب هیئت موسس و مجمع عمومی موسسه
                    </Typography>

                    <Grid container gap={2}>

                        <Grid item xs={3.7} className="mt-7">
                            <Image className="mx-auto rounded-3xl mt-[-15px]" src={src3} blurDataURL={'img/wait.png'} placeholder="blur" width={200} height={100} alt="Activities" />
                            <Link href={'https://civilica.com/p/240413/'} className="p-1 text-center text-sm">
                                دکتر سید محمد حسین رضوی
                                <br />
                                مدیر عامل موسسه دانشگاهی شمال
                            </Link>
                        </Grid>

                        <Grid item xs={3.7} className="mt-3">
                            <Image className="mx-auto rounded-3xl" src={src1} blurDataURL={'img/wait.png'} placeholder="blur" width={200} height={100} alt="Activities" />
                            <Link href='https://fa.wikipedia.org/wiki/%D8%B9%D9%84%DB%8C%E2%80%8C%D9%85%D8%AD%D9%85%D8%AF_%D9%86%D9%88%D8%B1%DB%8C%D8%A7%D9%86#:~:text=%D9%86%D9%88%D8%B1%DB%8C%D8%A7%D9%86%20%D8%A8%DB%8C%D8%B4%20%D8%A7%D8%B2%20%D8%AF%D9%88%20%D8%AF%D9%87%D9%87,%D9%88%20%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%82%D9%84%DB%8C%D9%85%DB%8C%20%D9%85%D9%86%D8%B5%D9%88%D8%A8%20%D8%B4%D8%AF' className="p-1 text-center text-sm">
                                دکتر علیمحمد نوریان
                                <br />
                                رئیس هیئت امناء دانشگاه شمال
                            </Link>
                        </Grid>

                        <Grid item xs={3.7} className="mt-3">
                            <Image className="mx-auto rounded-3xl" src={src8} blurDataURL={'img/wait.png'} placeholder="blur" width={200} height={100} alt="Activities" />
                            <Link href={'https://civilica.com/p/182461/'} className="p-1 text-center text-sm">
                                دکتر عباسعلی رستمی
                                <br />
                                عضو هیئت موسس دانشگاه شمال
                            </Link>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={5} md={4} className="grid-item">
                    <LastNews type='news' />
                </Grid>
            </Grid>

            <br />

        </div>
    )
}
