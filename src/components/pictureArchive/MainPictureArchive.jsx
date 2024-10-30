import { Button, Grid, Pagination, Stack } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ModalImages from "./ModalImages"
import ClientSideButton from "./ClientSideButton"


const Component = ({ title, imagesURL }) => {
    return (
        <Grid item xs={10} sm={3.5} md={2} lg={1.8} xl={1.5}>
            <ClientSideButton links={imagesURL}>
                <Image src={imagesURL[0] || '/img/no-pic.png'} className='rounded-md' blurDataURL={'img/wait.png'} placeholder="blur" alt={title} width={1960} height={1080} />
                {title}
            </ClientSideButton>
        </Grid>
    )
}

export default function MainPictureArchive({ type, data, loading, error, lastPage, page, perPage }) {
    const router = useRouter()


    return (
        <div className="text-justify">
            <div className="mt-2 mb-4 flex gap-2 justify-center">
                <Link href={`/picturesArchive?type=news&page=1&perPage=${perPage}`}>
                    <Button size="small" variant="contained" color="primary" className="text-xs sm:text-base md:text-lg">آرشیو تصاویر اخبار</Button>
                </Link>
                <Link href={`/picturesArchive?type=events&page=1&perPage=${perPage}`}>
                    <Button size="small" variant="contained" color="success" className="text-slate-50 text-xs sm:text-base md:text-lg">آرشیو تصاویر رویدادها</Button>
                </Link>
                <Link href={`/picturesArchive?type=announcements&page=1&perPage=${perPage}`}>
                    <Button size="small" variant="contained" color="info" className="text-xs sm:text-base md:text-lg">آرشیو تصاویر اطلاعیه ها</Button>
                </Link>
            </div>

            {
                loading ?
                    <>
                        کمی منتظر بمانید ...
                    </>
                    :
                    !!error ?
                        <>
                            خطا در اتصال به شبکه !
                        </>
                        :
                        !data?.length ?
                            <>
                                اطلاعاتی جهت نمایش وجود ندارد!
                            </>
                            :
                            <ModalImages>
                                <Grid container gap={2} justifyContent={'start'} className="mr-3">
                                    {
                                        data.map((item, i) => {
                                            if (item?.imagesURL?.length)
                                                return <Component key={i} title={item?.title} imagesURL={item?.imagesURL} href={`/${type}/${item?.id}`} />
                                            return
                                        })
                                    }
                                </Grid>
                            </ModalImages>
            }


            {
                lastPage !== 1 &&
                <Stack spacing={2} dir='ltr'>
                    <Pagination count={lastPage} page={page} onChange={(_, newPage) => router.push(`/picturesArchive?type=${type}&page=${newPage}&perPage=${perPage}`)} variant="outlined" color="primary" className='flex justify-center' />
                </Stack>
            }
        </div>
    )
}
