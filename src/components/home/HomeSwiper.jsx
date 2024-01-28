'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from '../../styles/Home/Swiper.module.css';
import { Autoplay, Navigation } from 'swiper/modules';
import MainMenu from './MainMenu';
import Image from 'next/image';

const items = [
    {
        src: '/img/home-main/IMG_20231004_155303_382.jpg',
    },
    {
        src: '/img/home-main/IMG_20240128_231618_726.jpg',
    },
    {
        src: '/img/home-main/IMG_20240128_195206_989.jpg',
    },
];

export default function HomeSwiper() {
    const onAutoplayTimeLeft = (s, time) => {
    };
    return (
        <div className={`${styles.paperam} relative`}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className={styles.mySwiper}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={item.src}
                            blurDataURL={'img/wait.png'}
                            placeholder='blur'
                            width={1920}
                            height={1080}
                            alt="Picture of the university"
                        />

                    </SwiperSlide>
                ))}
            </Swiper>
            <MainMenu />
        </div>
    );
}
