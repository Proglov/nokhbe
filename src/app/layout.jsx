import './globals.css'
import CustomTheme from '../utils/CustomTheme'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'

export const metadata = {
  title: 'نخبگان',
  description: 'سایت نخبگان',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir='rtl'>
      <body>
        <CustomTheme>
          <header>
            <Navbar />
          </header>
          {children}
          <footer className="mt-5">
            <Footer />
          </footer>
        </CustomTheme>
      </body>
    </html>
  )
}
