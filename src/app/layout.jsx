import './globals.css'
import CustomTheme from '../utils/CustomTheme'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import { EdgeStoreProvider } from '../lib/edgestore';

export const metadata = {
  title: 'نخبگان',
  description: 'سایت نخبگان',
}

export default function RootLayout({ children }) {

  return (
    <html lang="fa-IR" dir='rtl'>
      <body>
        <EdgeStoreProvider>
          <CustomTheme>
            <header>
              <Navbar />
            </header>
            {children}
            <footer className="mt-5">
              <Footer />
            </footer>
          </CustomTheme>
        </EdgeStoreProvider>
      </body>
    </html>
  )
}
