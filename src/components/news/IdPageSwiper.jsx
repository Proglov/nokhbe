'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';


export default function HomeSwiper({ items }) {
    return (
        <div>
            <Swiper
                effect='coverflow'
                spaceBetween={30}
                grabCursor={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 50,
                    depth: 50,
                    modifier: 1
                }}
                centeredSlides={true}
                navigation={true}
                modules={[Navigation, EffectCoverflow]}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={item}
                            blurDataURL={'img/wait.png'}
                            placeholder='blur'
                            width={1920}
                            height={1080}
                            alt="Picture of the university"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
