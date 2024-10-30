"use client"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import { ModalEditContext } from './InfoPage';


const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: 800,
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid purple',
    boxShadow: '0px 0px 10px 1px purple',
    p: 4,
};

export default function ModalEdit() {
    const { isModalEditOpen, setIsModalEditOpen, setSelectedItem, selectedItem, editItem, type } = useContext(ModalEditContext)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSelectedItem(prevSelectedItem => ({
            ...prevSelectedItem,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setIsModalEditOpen(false);
    };

    const itemType = type === 'books' ? "کتاب" : "مقاله"

    return (
        <Modal
            className='overflow-y-scroll'
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalEditOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}>
            <Fade in={isModalEditOpen}>
                <Box sx={ModalStyle} className='rounded-3xl'>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        ویرایش {' '}
                        {itemType}
                    </Typography>

                    <div className="mt-5">
                        <FormControl className="w-full">
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <div>
                                        <label className="block mb-1 pr-4" htmlFor="inline-full-name">
                                            عنوان {itemType}
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="name"
                                            value={selectedItem.name}
                                            placeholder={`عنوان ${itemType} را وارد کنید`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <div>
                                        <label className="block mb-1 pr-4" htmlFor="inline-full-name">
                                            نویسنده
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="writer"
                                            value={selectedItem.writer}
                                            placeholder={`نویسنده ${itemType} را وارد کنید`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <div>
                                        <label className="block mb-1 pr-4" htmlFor="inline-full-name">
                                            دسته بندی
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="category"
                                            value={selectedItem.category}
                                            placeholder={`دسته بندی ${itemType} را وارد کنید`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <div>
                                        <label className="block mb-1 pr-4" htmlFor="inline-full-name">
                                            {
                                                type === 'documents' ? "نام مجله" : "انتشارات"
                                            }
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="pubOrMag"
                                            value={selectedItem.pubOrMag}
                                            placeholder={`${type === 'documents' ? "نام مجله" : "انتشارات"} را وارد کنید`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <div>
                                        <label className="block mb-1 pr-4" htmlFor="inline-full-name">
                                            لینک
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="link"
                                            value={selectedItem.link}
                                            placeholder={`لینک ${itemType} را وارد کنید`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Grid>

                            </Grid>
                        </FormControl>
                    </div>

                    <div className={'mt-2 flex justify-between'}>
                        <Button
                            onClick={() => { editItem(selectedItem) }}
                            variant='outlined'
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
    );
}