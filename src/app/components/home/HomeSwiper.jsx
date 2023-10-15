'use client'
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from '../../../styles/swiper.module.css';
import { Autoplay, Navigation } from 'swiper/modules';
import MainMenu from './MainMenu';
import Image from 'next/image';

const items = [
    {
        src: '/img/home-main/IMG_20231004_155303_382.jpg',
    },
    {
        src: '/img/home-main/IMG_20231004_155314_303.jpg',
    },
    {
        src: '/img/home-main/IMG_20231004_155321_237.jpg',
    },
];

export default function HomeSwiper() {
    const onAutoplayTimeLeft = (s, time) => {
    };
    return (
        <div className={`${styles.paperam} mt-3 relative`}>
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
