'use client'
import { Box } from '@mui/material';
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import Component from './Component';
import Loading from '../Loading';

export default function InfiniteScroll({ previousItems, type, url, perPage }) {
    const { ref, inView } = useInView();

    const [items, setItems] = useState(previousItems)
    const [currentPage, setCurrentPage] = useState(2)
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetchItems = async (page) => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await fetch(`${url}page=${page}&perPage=${perPage}`);
            const data = await response.json()

            if (!!data[type])
                setItems((prev) => [...prev, ...data[type]])
            else throw new Error('');
            if (!data[type].length) setIsFinished(true);
            setCurrentPage(page + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView && !isFinished) {
            fetchItems(currentPage);
        }
    }, [inView, currentPage, isFinished]);

    return (
        <div>
            <Box className="flex flex-wrap justify-evenly">
                {items?.map((item) => (
                    <Component key={item.id} item={item} type={type} />
                ))}
            </Box>

            <Box className='w-full text-center mt-3' ref={ref}>
                {!isFinished && <Loading />}
            </Box>
        </div>
    )
}