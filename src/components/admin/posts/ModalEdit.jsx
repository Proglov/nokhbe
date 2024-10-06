"use client"
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useContext, useRef } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '../CustomQuill';
import { ModalEditContext } from './InfoPage';
import Image from 'next/image';
import { MultiFileDropzone } from '../multi-image-dropzone';
import { tags as tagOptions } from '@/utils/tagsAndRoles'
import { uploadImage } from '@/actions/image';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(tagOptions, tags, theme) {
    return {
        fontWeight: tags.indexOf(tagOptions) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

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

export default function ModalEdit({ isAdmin }) {
    const { isModalEditOpen, setIsModalEditOpen, type, selectedItem, setSelectedItem, fileStates,
        setFileStates, setUploadRes, updateFileProgress, editItem, setImagesToDelete, imagesToDelete } = useContext(ModalEditContext)

    let dd = '', mm = '', yy = '';
    if (selectedItem?.eventAt) {
        for (let i = 0; i < 4; i++) yy += selectedItem?.eventAt[i]
        for (let i = 5; i < 7; i++) mm += selectedItem?.eventAt[i]
        for (let i = 8; i < 10; i++) dd += selectedItem?.eventAt[i]
    }

    const theme = useTheme();
    const checkBoxRef = useRef();

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'telegram') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                telegram: event.target.checked,
            }));
        } else if (name === 'title') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                title: value,
            }));
        } else if (name === 'tags') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                tags: typeof value === 'string' ? value.split(',') : value,
            }));
        } else if (name === 'quillValue') {
            setSelectedItem(prevSelectedItem => ({
                ...prevSelectedItem,
                description: value,
            }));
        }
    };

    const handleClose = () => {
        setIsModalEditOpen(false);
        setFileStates([]);
        setUploadRes([]);
    };

    const onEventAtHandler = (event, num) => {
        const value = parseInt(event.target.value);

        if (!isNaN(value)) {
            if (num === 1) {
                if (value >= 1 && value <= 12) {
                    let newMM = '';
                    let newStr = (' ' + selectedItem.eventAt).slice(1);

                    if (value < 10) {
                        newMM += '0' + value;
                    } else {
                        newMM += value;
                    }

                    newStr = newStr.slice(0, 5) + newMM + newStr.slice(7);

                    setSelectedItem(prev => ({
                        ...prev,
                        eventAt: newStr
                    }));

                } else {
                    let newMM = '01';
                    let newStr = (' ' + selectedItem.eventAt).slice(1);
                    newStr = newStr.split('');

                    for (let i = 5; i < 7; i++) {
                        newStr[i] = newMM[i - 5];
                    }

                    newStr = newStr.join('');

                    setSelectedItem(prev => ({
                        ...prev,
                        eventAt: newStr
                    }));
                }
            } else if (num === 0) {
                if (value >= 1 && value <= 31) {
                    let newDD = '';
                    let newStr = (' ' + selectedItem.eventAt).slice(1);
                    newStr = newStr.split('');

                    if (value < 10) {
                        newDD += '0' + value;
                    } else {
                        newDD += value;
                    }

                    for (let i = 8; i < 10; i++) {
                        newStr[i] = newDD[i - 8];
                    }

                    newStr = newStr.join('');

                    setSelectedItem(prev => ({
                        ...prev,
                        eventAt: newStr
                    }));

                } else {
                    let newDD = '01';
                    let newStr = (' ' + selectedItem.eventAt).slice(1);
                    newStr = newStr.split('');

                    for (let i = 8; i < 10; i++) {
                        newStr[i] = newDD[i - 8];
                    }

                    newStr = newStr.join('');

                    setSelectedItem(prev => ({
                        ...prev,
                        eventAt: newStr
                    }));
                }
            } else {
                const newYY = value.toString();
                let newStr = (' ' + selectedItem.eventAt).slice(1);
                newStr = newStr.split('');

                const len = newYY.length;
                let newNewYY = '';

                for (let i = 0; i < 4 - len; i++) {
                    newNewYY += '0';
                }

                newNewYY += newYY;

                for (let i = 0; i < 4; i++) {
                    newStr[i] = newNewYY[i];
                }

                newStr = newStr.join('');

                setSelectedItem(prev => ({
                    ...prev,
                    eventAt: newStr
                }));

            }
        }

    };

    const itemType = type === 'events' ? "رویداد" : type === 'news' ? "خبر" : "اطلاعیه"


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
                        {
                            isAdmin ?
                                'ویرایش'
                                :
                                'مشاهده'
                        }
                        {' '}
                        {itemType}
                    </Typography>

                    <div className="mt-5">
                        <FormControl className="w-full">
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <div>
                                        <label className="block text-gray-800 mb-1 pr-4" htmlFor="inline-full-name">
                                            عنوان {itemType}
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            name="title"
                                            value={selectedItem.title}
                                            placeholder="عنوان خبر را وارد کنید"
                                            onChange={handleChange}
                                            disabled={!isAdmin}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12} className="mt-2">
                                    <div>
                                        <label className="block text-gray-800 mb-1 pr-4" htmlFor="idemo-multiple-chip">
                                            برچسب ها
                                        </label>
                                    </div>
                                    <Select
                                        name="tags"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:bg-white focus:border-purple-500`}
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={selectedItem.tags}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        disabled={!isAdmin}
                                        MenuProps={MenuProps}
                                    >
                                        {tagOptions.map((tag) => (
                                            <MenuItem
                                                key={tag}
                                                value={tag}
                                                style={getStyles(tag, selectedItem.tags, theme)}
                                            >
                                                {tag}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                {
                                    type === 'events' &&
                                    <Grid item xs={12} className="mt-2">
                                        <label
                                            className="block mt-2 mb-1 text-black">
                                            تاریخ رویداد
                                        </label>
                                        <div className='flex'>
                                            <input
                                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                                id="inline-full-name"
                                                type="number"
                                                name="title"
                                                value={dd}
                                                placeholder="روز"
                                                onChange={e => onEventAtHandler(e, 0)}
                                                disabled={!isAdmin}
                                            />
                                            <input
                                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                                id="inline-full-name"
                                                type="number"
                                                name="title"
                                                value={mm}
                                                placeholder="ماه"
                                                onChange={e => onEventAtHandler(e, 1)}
                                                disabled={!isAdmin}
                                            />
                                            <input
                                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                                id="inline-full-name"
                                                type="number"
                                                name="title"
                                                value={yy}
                                                placeholder="سال"
                                                onChange={e => onEventAtHandler(e, 2)}
                                                disabled={!isAdmin}
                                            />
                                        </div>
                                    </Grid>
                                }

                                <Grid item xs={12}>
                                    <div className='mt-2'>
                                        تصاویر ارسال شده:
                                        <div>
                                            {
                                                !selectedItem.imagesURL?.length ?
                                                    <>
                                                        تصویری موجود نیست
                                                    </>
                                                    :
                                                    selectedItem.imagesURL.map((url, i) => {
                                                        return (
                                                            <div className='bg-blue-50' style={{ width: '300px' }}
                                                                key={i}>
                                                                <Image
                                                                    src={url}
                                                                    blurDataURL={'img/wait.png'}
                                                                    placeholder="blur"
                                                                    alt='عکس ارسال شده'
                                                                    width={300}
                                                                    height={200} />

                                                                {
                                                                    isAdmin &&
                                                                    <Button variant='outlined' color='error' className='mt-1 mb-4 w-full'
                                                                        onClick={() => {
                                                                            const idx = imagesToDelete.findIndex((item) => item === selectedItem?.imagesName[i])
                                                                            if (idx === -1) {
                                                                                setImagesToDelete(prev => [
                                                                                    ...prev,
                                                                                    selectedItem?.imagesName[i]
                                                                                ]);
                                                                            }
                                                                            setSelectedItem(prev => ({
                                                                                ...prev,
                                                                                imagesURL: prev?.imagesURL?.filter(theUrl => theUrl !== url),
                                                                                imagesName: prev?.imagesName?.filter(theUrl => theUrl !== selectedItem?.imagesName[i]),
                                                                            }))
                                                                        }}
                                                                    >
                                                                        حذف عکس بالا
                                                                    </Button>
                                                                }

                                                                <br />
                                                            </div>
                                                        )
                                                    })

                                            }
                                        </div>
                                    </div>
                                    <br />
                                    {
                                        isAdmin &&
                                        <>
                                            <label
                                                className="block mt-2 mb-1  text-gray-800" htmlFor="inline-image-upload">
                                                افزودن تصویر:
                                            </label>
                                            <div className='bg-slate-300 overflow-hidden0 rounded'>
                                                <MultiFileDropzone
                                                    width={100}
                                                    height={100}
                                                    value={fileStates}
                                                    onChange={(files) => {
                                                        setFileStates(files);
                                                    }}
                                                    onFilesAdded={async (addedFiles) => {
                                                        setFileStates(prev => [...prev, ...addedFiles]);
                                                        await Promise.all(
                                                            addedFiles.map(async (addedFileState) => {
                                                                try {

                                                                    //Add an animation
                                                                    let temp = 0;
                                                                    const interval = setInterval(() => {
                                                                        updateFileProgress(addedFileState.key, temp);
                                                                        if (++temp === 50) clearInterval(interval)
                                                                    }, 10);

                                                                    const formDate = new FormData()
                                                                    formDate.append("images", addedFileState.file)
                                                                    const res = await uploadImage(formDate);
                                                                    if (interval) clearInterval(interval)
                                                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                                                    setUploadRes((uploadRes) => [
                                                                        ...uploadRes,
                                                                        res?.name
                                                                    ]);
                                                                } catch (err) {
                                                                    updateFileProgress(addedFileState.key, 'ERROR');
                                                                }
                                                            }),
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </>
                                    }
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomQuill
                                        onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
                                        value={selectedItem.description}
                                    />
                                </Grid>

                                <Grid item xs={12} className='flex items-center'>
                                    <label className="text-gray-800 text-sm font-bold ml-2" htmlFor="telegram">
                                        ارسال به شبکه های اجتماعی:
                                    </label>
                                    {
                                        isAdmin ?
                                            <input
                                                type="checkbox"
                                                ref={checkBoxRef}
                                                name="telegram"
                                                checked={selectedItem.telegram}
                                                onChange={handleChange}
                                                disabled={!isAdmin}
                                            />
                                            :
                                            !!selectedItem.telegram ?
                                                <FaCheck color='green' />
                                                :
                                                <RxCross2 color='red' size='20px' />
                                    }
                                </Grid>

                            </Grid>
                        </FormControl>
                    </div>

                    <div className={`mt-2 flex ${isAdmin ? 'justify-between' : 'justify-end'}`}>
                        {
                            isAdmin ?
                                <>
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
                                </>
                                :
                                <Button onClick={handleClose} variant='outlined'
                                    className='p-0 m-1'
                                    sx={{ color: 'red', borderColor: 'red' }}>
                                    بازگشت
                                </Button>
                        }
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
