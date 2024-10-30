'use client'
import { createContext, useState } from "react";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import Image from "next/image";
import HomeSwiper from "../home/HomeSwiper";


export const ModalContext = createContext();

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid red',
    boxShadow: '0px 0px 10px 1px red',
    p: 4,
};

export default function ModalImages({ children }) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [refs, setRefs] = useState([])
    const handleClose = () => setIsModalDeleteOpen(false);

    return (
        <ModalContext.Provider value={{ setIsModalDeleteOpen, setRefs }}>
            {children}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalDeleteOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalDeleteOpen}>
                    <Box sx={ModalStyle} className='rounded-3xl'>

                        <HomeSwiper sources={refs} />

                        <div className='mt-2 flex justify-between'>
                            <Button onClick={handleClose} variant='outlined'
                                className='p-0 m-1'
                                sx={{ color: 'red', borderColor: 'red' }}>
                                بازگشت
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </ModalContext.Provider>
    );
}