"use client"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { ModalConfirmContext } from './InfoPage';
import Image from 'next/image';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid green',
    boxShadow: '0px 0px 10px 1px green',
    p: 4,
};

export default function ModalConfirm({ type, id, title, description, imageURL, tags, createdBy }) {
    const { isModalConfirmOpen, setIsModalConfirmOpen, confirmItem } = useContext(ModalConfirmContext)
    const handleClose = () => setIsModalConfirmOpen(false);

    const itemType = type === 'events' ? "رویداد" : type === 'news' ? "خبر" : "اطلاعیه"

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalConfirmOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isModalConfirmOpen}>
                    <Box sx={ModalStyle} className='rounded-3xl'>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            آیا این {itemType} را تایید میکنید؟
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            عنوان: {title}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            متن:
                            <div
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            برچسب ها:
                            <br />
                            <ul className='pr-3'>
                                {tags.map((tag, i) => {
                                    return (
                                        <li key={i}>{tag}</li>
                                    )
                                })}
                            </ul>
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            ایجاد شده توسط: {createdBy}
                        </Typography>
                        <div className='mt-2'>
                            تصویر ارسال شده:
                            {
                                !!imageURL ?
                                    <div className='bg-black' style={{ width: '200px' }}>
                                        <Image
                                            src={imageURL}
                                            blurDataURL={'img/wait.png'}
                                            placeholder="blur"
                                            alt='عکس ارسال شده'
                                            width={200}
                                            height={200} />
                                    </div>
                                    : <div className='text-sm text-red-400'>تصویری موجود نمیباشد</div>
                            }

                        </div>

                        <div className='mt-2 flex justify-between'>
                            <Button onClick={() => { confirmItem(id); handleClose() }} variant='outlined'
                                className='p-0 m-1'
                                sx={{ color: 'green', borderColor: 'green' }}>
                                تایید
                            </Button>
                            <Button onClick={handleClose} variant='outlined'
                                className='p-0 m-1'
                                sx={{ color: 'red', borderColor: 'red' }}>
                                لغو
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}