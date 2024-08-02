import { Grid } from "@mui/material";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import { dateInFarsi } from "@/utils/funcs";
import HomeSwiper from "@/components/home/HomeSwiper";

export default function NewsTop({ src, date, title, desc, showMore }) {
    return (
        <Grid container spacing={2} className="p-3" sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={10} lg={8} className="mt-2 mx-auto">
                {
                    showMore && (
                        src?.length > 1 ?
                            <HomeSwiper sources={src} />
                            :
                            <Image src={src[0] || '/img/no-pic.png'} className='rounded-md' blurDataURL={'img/wait.png'} placeholder="blur" alt={title} width={1960} height={1080} />
                    )
                }
                {
                    !showMore &&
                    <Image src={src[0] || '/img/no-pic.png'} className='rounded-md' blurDataURL={'img/wait.png'} placeholder="blur" alt={title} width={1960} height={1080} />
                }
            </Grid>
            <Grid item xs={12} md={10} lg={8} className="mt-2 mx-auto" sx={{ fontSize: { sm: '12px', md: '18px' } }}>
                <div className="flex flex-col">
                    <div className="flex flex-row mt-2">
                        <AiOutlineCalendar style={{ marginTop: '-3px' }} />
                        &nbsp;
                        {
                            date.includes('-') && <span dir="ltr" style={{ lineHeight: '10px' }} >{(dateInFarsi(date))}</span>
                        }
                        {
                            !date.includes('-') && <span style={{ lineHeight: '10px' }} >{date}</span>
                        }

                    </div>
                    <div className="text-blue-900">
                        {title}
                    </div>
                    <div>
                        {
                            !showMore ?
                                <div
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: 'vertical',
                                        maxWidth: '100%',
                                    }}
                                />
                                :
                                <div
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                />

                        }

                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
