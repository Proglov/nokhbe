import { Grid } from "@mui/material";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";

export default function NewsTop({ src, date, title, desc, showMore }) {
    return (
        <Grid container spacing={2} className="p-3" sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={10} lg={8} className="mt-2 mx-auto">
                <Image src={src} className='rounded-md' blurDataURL={'img/wait.png'} placeholder="blur" alt={title} width={1960} height={1080} />
            </Grid>
            <Grid item xs={12} md={10} lg={8} className="mt-2 mx-auto" sx={{ fontSize: { sm: '12px', md: '18px' } }}>
                <div className="flex flex-col">
                    <div className="flex flex-row mt-2">
                        <AiOutlineCalendar style={{ marginTop: '-3px' }} />
                        &nbsp;
                        <span style={{ lineHeight: '15px' }} >{date}</span>
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
