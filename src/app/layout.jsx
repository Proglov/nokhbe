import './globals.css'
import CustomTheme from './CustomTheme'

export const metadata = {
  title: 'نخبگان',
  description: 'سایت نخبگان',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir='rtl'>
      <body>
        <CustomTheme>
          {children}
        </CustomTheme>
      </body>
    </html>
  )
}
