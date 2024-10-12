import HomeSwiper from "../components/home/HomeSwiper";
import SecondSwiper from "../components/home/SecondSwiper";
import MenuNav from "../components/home/MenuNav";
import Events from "../components/home/Events";
import News from "../components/home/News";
import Announcements from "../components/home/Announcements";
import { Grid, Skeleton } from "@mui/material";
import { Suspense } from "react";

const Loading = () => (
  <Grid container spacing={2} className="p-6 shadow-lg shadow-cyan-100">
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} className="grid-item" key={index}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Grid>
    ))}
  </Grid>
)

export default function Home() {
  return (
    <>
      <nav className="my-1">
        <MenuNav />
      </nav>
      <main>
        <HomeSwiper />
      </main>
      <section>
        <SecondSwiper />
      </section>
      <section className='mt-5' >
        <Suspense fallback={<Loading />}>
          <Events />
        </Suspense>
      </section>
      <section className='mt-5' >
        <Grid container spacing={2} className="p-3">
          <Grid item xs={12} sm={7} md={8} className="grid-item">
            <Suspense fallback={<Loading />}>
              <News />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={5} md={4} className="grid-item">
            <Suspense fallback={<Loading />}>
              <Announcements />
            </Suspense>
          </Grid>
        </Grid>
      </section>
    </>
  )
}