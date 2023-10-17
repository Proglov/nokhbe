'use client'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const items = [
    {
        src: '/img/home-slider/IMG_20231004_155758_828.jpg',
    },
    {
        src: '/img/home-slider/IMG_20231004_155759_101.jpg',
    },
    {
        src: '/img/home-slider/IMG_20231004_155800_260.jpg',
    },
];

export default function SecondSwiper() {
    const [selectedImage, setSelectedImage] = useState(items[0].src);

    const handleImageClick = (index) => {
        setSelectedImage(items[index].src);
    };

    return (
        <Box sx={{ marginTop: '-30px', padding: '10px' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ paddingTop: '50px' }}>
                <Grid item xs={12} lg={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        style={{ borderRadius: '10px' }}
                        src={selectedImage}
                        width={1920}
                        height={1080}
                        alt="Main Picture"
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {items.map((item, index) => (
                            <Grid item key={index} xs={6} sm={4} md={3} lg={12}>
                                <Image
                                    style={{ borderRadius: '10px' }}
                                    src={item.src}
                                    width={1920}
                                    height={1080}
                                    alt="Picture of the university"
                                    onClick={() => handleImageClick(index)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}