import HomeSwiper from "../components/home/HomeSwiper";
import SecondSwiper from "../components/home/SecondSwiper";
import MenuNav from "../components/home/MenuNav";
import Events from "../components/home/Events";
import News from "../components/home/News";
import Announcements from "../components/home/Announcements";
import { Grid } from "@mui/material";


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
        <Events />
      </section>
      <section className='mt-5' >
        <Grid container spacing={2} className="p-3">
          <Grid item xs={12} sm={7} md={8} className="grid-item">
            <News />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className="grid-item">
            <Announcements />
          </Grid>
        </Grid>
      </section>
    </>
  )
}
