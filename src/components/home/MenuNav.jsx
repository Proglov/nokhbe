import { Divider } from '@mui/material';
import styles from '../../styles/Home/MenuNav.module.css'
import Link from 'next/link';
import { Introduction, NewsAndEvents } from './MenuNavClientComponents';

export default async function MenuNav() {

    return (
        <nav className="sticky bg-blue-950 mt-[70px] sm:mt-20 lg:mt-24">
            <div className="max-w-screen-xl px-4 mx-auto" style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '62px' }}>
                <div className="flex justify-space-evenly">
                    <ul className={`flex flex-row space-x-2 ${styles.customSize}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Introduction />

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center'>
                            <Link href="/clubs" className="text-slate-50"> &nbsp; &nbsp;باشگاه های تخصصی &nbsp;</Link>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center'>
                            <Link href='/joining' className="text-slate-50">
                                خدمات و عضویت
                            </Link>
                        </li>

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <NewsAndEvents />

                        <Divider orientation='vertical' sx={{ backgroundColor: 'white', height: '50%' }} />

                        <li className='text-center text-slate-50'>
                            <Link href='/contact'>
                                تماس با ما
                            </Link>
                        </li>

                    </ul>
                </div>
            </div >
        </nav >
    )
}