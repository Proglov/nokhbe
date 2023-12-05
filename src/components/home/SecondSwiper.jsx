'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from '../../styles/home/SecSwiper.module.css'

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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [op0, setOp0] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setOp0(true);
            clearTimeout(timer);
            const nextIndex = (selectedImageIndex + 1) % items.length;
            setTimer(
                setTimeout(() => {
                    setOp0(false);
                    setSelectedImageIndex(nextIndex);
                }, 300)
            );
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [selectedImageIndex, timer]);

    const handleImageClick = (index) => {
        if (index !== selectedImageIndex) {
            clearTimeout(timer);
            setOp0(true);
            setTimeout(() => {
                setOp0(false);
                setResetTimer(true);
                setSelectedImageIndex(index);
            }, 300);
        }
    };

    useEffect(() => {
        if (resetTimer) {
            setResetTimer(false);
            const nextIndex = (selectedImageIndex + 1) % items.length;
            setTimer(
                setTimeout(() => {
                    setOp0(false);
                    setSelectedImageIndex(nextIndex);
                }, 5000)
            );
        }
    }, [resetTimer, selectedImageIndex]);

    return (
        <Box sx={{ marginTop: '-30px', padding: '10px' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ paddingTop: '50px' }}>
                <Grid item xs={12} lg={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        style={{ borderRadius: '10px' }}
                        src={items[selectedImageIndex].src}
                        width={1920}
                        height={1080}
                        alt="Main Picture"
                        className={`${styles.imageOpacity} ${op0 ? styles.imageOpacityHidden : ''}`}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        {items.map((item, index) => (
                            <Grid item key={index} xs={6} sm={4} md={3} lg={12}>
                                <Image
                                    style={{ borderRadius: '10px' }}
                                    src={item.src}
                                    blurDataURL={item.src}
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