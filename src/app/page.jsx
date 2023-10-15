import Navbar from "./components/home/Navbar";
import HomeSwiper from "./components/home/HomeSwiper";
import SecondSwiper from "./components/home/SecondSwiper";
import SecondNav from "./components/home/SecondNav";
import Events from "./components/home/Events";
import News from "./components/home/News";
import Announcements from "./components/home/Announcements";
import { Grid } from "@mui/material";
import Footer from "./components/home/Footer";
import styles from './styles.module.css'

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <nav className={styles.smallScreenNav}>
        <SecondNav />
      </nav>
      <main>
        <HomeSwiper />
      </main>
      <section>
        <SecondSwiper />
      </section>
      <nav className={`static ${styles.mdScreenNav}`}>
        <SecondNav />
      </nav>
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
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  )
}
