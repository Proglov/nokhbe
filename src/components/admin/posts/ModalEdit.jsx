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
import { useEdgeStore } from '../../../lib/edgestore';

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

export default function ModalEdit() {
    const theme = useTheme();
    const checkBoxRef = useRef();
    const { edgestore } = useEdgeStore();

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

    const { isModalEditOpen, setIsModalEditOpen, type, selectedItem, setSelectedItem, fileStates,
        setFileStates, setUploadRes, updateFileProgress, editItem, setImagesToDelete } = useContext(ModalEditContext)
    const handleClose = () => {
        setIsModalEditOpen(false);
        setFileStates([]);
        setUploadRes([]);
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
                        ویرایش {itemType}
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

                                <Grid item xs={12}>
                                    <div className='mt-2'>
                                        تصویر ارسال شده:
                                        <div>
                                            {
                                                selectedItem.imagesURL.map((url, i) => {
                                                    return (
                                                        <div className='bg-blue-50' style={{ width: '300px' }}>
                                                            <Image
                                                                key={i}
                                                                src={url}
                                                                blurDataURL={'img/wait.png'}
                                                                placeholder="blur"
                                                                alt='عکس ارسال شده'
                                                                width={300}
                                                                height={200} />

                                                            <Button variant='outlined' color='error' className='mt-1 mb-4 w-full'
                                                                onClick={() => {
                                                                    setImagesToDelete(prev => ({
                                                                        ...prev,
                                                                        url
                                                                    }));
                                                                    setSelectedItem(prev => ({
                                                                        ...prev,
                                                                        imagesURL: prev.imagesURL.filter(theUrl => theUrl !== url)
                                                                    }))
                                                                }}
                                                            >
                                                                حذف عکس بالا
                                                            </Button>

                                                            <br />
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                    </div>
                                    <br />
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
                                                setFileStates([...fileStates, ...addedFiles]);
                                                await Promise.all(
                                                    addedFiles.map(async (addedFileState) => {
                                                        try {
                                                            const res = await edgestore.myPublicImages.upload({
                                                                file: addedFileState.file,
                                                                options: {
                                                                    temporary: true
                                                                },
                                                                onProgressChange: async (progress) => {
                                                                    updateFileProgress(addedFileState.key, progress);
                                                                    if (progress === 100) {
                                                                        // wait 1 second to set it to complete
                                                                        // so that the user can see the progress bar at 100%
                                                                        await new Promise((resolve) => setTimeout(resolve, 1000));
                                                                        updateFileProgress(addedFileState.key, 'COMPLETE');
                                                                    }
                                                                },
                                                            });
                                                            setUploadRes((uploadRes) => [
                                                                ...uploadRes,
                                                                {
                                                                    url: res.url,
                                                                    filename: addedFileState.file.name,
                                                                },
                                                            ]);
                                                        } catch (err) {
                                                            updateFileProgress(addedFileState.key, 'ERROR');
                                                        }
                                                    }),
                                                );
                                            }}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomQuill
                                        onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
                                        value={selectedItem.description}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <label className="text-gray-800 text-sm font-bold ml-2" htmlFor="telegram">
                                        ارسال به شبکه های اجتماعی
                                    </label>
                                    <input
                                        type="checkbox"
                                        ref={checkBoxRef}
                                        name="telegram"
                                        checked={selectedItem.telegram}
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                        </FormControl>
                    </div>



                    <div className='mt-2 flex justify-between'>
                        <Button
                            onClick={() => { handleClose(); editItem(selectedItem) }}
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
