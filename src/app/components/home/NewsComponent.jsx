import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";
import Box from "@mui/material/Box";

export default function NewsComponent({ src, year, month, day, title, href }) {
    return (
        <Link href={href}>
            <Grid container spacing={2} className="p-3" sx={{ alignItems: "center" }}>
                <Grid item xs={12} sm={5} className="grid-item">
                    <Image src={src} alt={title} width={1960} height={1080} />
                </Grid>
                <Grid item xs={12} sm={7} className="grid-item">
                    <Box className="flex flex-col" sx={{ fontSize: { xs: '18px', sm: '12px', md: '18px', lg: '20px' } }}>
                        <div className="flex flex-row mt-2">
                            <AiOutlineCalendar />
                            &nbsp;
                            <span style={{ lineHeight: '15px' }} >{year}/{month}/{day}</span>
                        </div>
                        <div className="text-blue-900">
                            {title}
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Link>
    )
}
