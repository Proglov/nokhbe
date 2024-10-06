'use client'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Button, Grid } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from '../CustomQuill';
import DOMPurify from 'dompurify'
import { useRef, useContext } from 'react';
import { useState } from 'react';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { MultiFileDropzone } from '../multi-image-dropzone';
import { tags } from '@/utils/tagsAndRoles';
import { uploadImage } from '@/actions/image';
import { capitalizeFirstLetter } from '@/utils/funcs';


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

export default function AddNew({ type, tag }) {
    const theme = useTheme();
    const checkBoxRef = useRef();

    const [fileStates, setFileStates] = useState([]);
    const [uploadRes, setUploadRes] = useState([]);

    const [eventAt, setEventAt] = useState(['', '', '']);

    const [AddNewData, setAddNewData] = useState({
        isSubmitting: false,
        error: '',
        success: '',
        formData: {
            tags: [],
            title: '',
            telegram: false,
            quillValue: ''
        }
    })

    const { setStaticProps, setInfoItems, currentInfoPage } = useContext(useAdminContext)

    const itemType = type === 'events' ? "رویداد" : type === 'news' ? "خبر" : "اطلاعیه"

    function updateFileProgress(key, progress) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setAddNewData(prevProps => {
            return {
                ...prevProps,
                formData: {
                    ...prevProps.formData,
                    [name]: type === 'checkbox' ? checked : value,
                },
                error: ''
            }
        })
    };

    const onEventAtHandler = (event, num) => {
        const value = parseInt(event.target.value);

        if (!isNaN(value)) {
            if (num === 1) {
                if (value >= 1 && value <= 12) {
                    setEventAt((prevArr) => {
                        const currArr = [...prevArr];
                        currArr[1] = value;
                        return currArr;
                    });
                } else {
                    setEventAt((prevArr) => {
                        const currArr = [...prevArr];
                        currArr[1] = 1;
                        return currArr;
                    });
                }
            } else if (num === 0) {
                if (value >= 1 && value <= 31) {
                    setEventAt((prevArr) => {
                        const currArr = [...prevArr];
                        currArr[0] = value;
                        return currArr;
                    });
                } else {
                    setEventAt((prevArr) => {
                        const currArr = [...prevArr];
                        currArr[0] = 1;
                        return currArr;
                    });
                }
            } else {
                setEventAt((prevArr) => {
                    const currArr = [...prevArr];
                    currArr[2] = value;
                    return currArr;
                });
            }
        }

    };

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        if (AddNewData.formData.title === '') {
            setAddNewData(prevProps => ({
                ...prevProps,
                error: `عنوان ${itemType} ضروری میباشد`,
                isSubmitting: false
            }));
            setTimeout(() => setAddNewData(prevProps => ({
                ...prevProps,
                error: '',
                isSubmitting: false
            })), 5000);
        } else if (!tag && AddNewData.formData.tags.length === 0) {
            setAddNewData(prevProps => ({
                ...prevProps,
                error: `انتخاب برچسب ${itemType} ضروری میباشد`,
                isSubmitting: false
            }));
            setTimeout(() => setAddNewData(prevProps => ({
                ...prevProps,
                error: '',
                isSubmitting: false
            })), 5000);
        } else if (AddNewData.formData.quillValue === '') {
            setAddNewData(prevProps => ({
                ...prevProps,
                error: `متن ${itemType} ضروری میباشد`,
                isSubmitting: false
            }));
            setTimeout(() => setAddNewData(prevProps => ({
                ...prevProps,
                error: ''
            })), 5000);
        } else if (type === "events" && (eventAt[0] === "" || eventAt[1] === "" || eventAt[2] === "")) {
            setAddNewData(prevProps => ({
                ...prevProps,
                error: "تاریخ را به صورت عدد وارد کنید",
                isSubmitting: false
            }));
            setTimeout(() => setAddNewData(prevProps => ({
                ...prevProps,
                error: ''
            })), 5000);
        } else if (type === "events" && eventAt[2] < 1395) {
            setAddNewData(prevProps => ({
                ...prevProps,
                error: "سال رویداد نمیتواند کمتر از 1395 باشد",
                isSubmitting: false
            }));
            setTimeout(() => setAddNewData(prevProps => ({
                ...prevProps,
                error: ''
            })), 5000);
        } else {

            let newBody = {};

            if (type === "events") {
                const day = eventAt[0] < 10 ? '0' + eventAt[0] : eventAt[0];
                const month = eventAt[1] < 10 ? '0' + eventAt[1] : eventAt[1];
                newBody.eventAt = eventAt[2] + '-' + month + '-' + day
            }

            newBody = {
                ...newBody,
                "title": AddNewData.formData.title,
                "description": DOMPurify.sanitize(AddNewData.formData.quillValue),
                "imagesURL": uploadRes,
                "tags": tag ? [tag] : AddNewData.formData.tags,
                "telegram": AddNewData.formData.telegram
            }

            fetch(`/api/${type}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(newBody)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('لطفا اتصال اینترنت خود را بررسی کنید');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data?.error?.name === "PrismaClientKnownRequestError") {
                        setAddNewData(prevProps => ({
                            ...prevProps,
                            isSubmitting: false,
                            error: data?.message + ' ; ' + data?.error?.meta?.message
                        }));
                    } else {
                        setAddNewData(prevProps => ({
                            ...prevProps,
                            success: `${itemType} با موفقیت اضافه شد!`,
                            formData: {
                                tags: [],
                                title: '',
                                telegram: false,
                                quillValue: '',
                            },
                            isSubmitting: false
                        }));
                        setFileStates([]);
                        setUploadRes([]);

                        //show success for five seconds
                        setTimeout(() => setAddNewData(prevProps => ({
                            ...prevProps,
                            success: ''
                        })), 5000);

                        // Add new negative status in statics
                        setStaticProps(prevProps => ({
                            ...prevProps,
                            [`${type}Count`]: prevProps[`${type}Count`] + 1,
                            [`negativeStatus${capitalizeFirstLetter(type)}Count`]: prevProps[`negativeStatus${capitalizeFirstLetter(type)}Count`] + 1
                        }));

                        newBody.id = data?.id
                        newBody.imagesURL = data?.imagesURL
                        newBody.imagesName = data?.imagesName
                        newBody.views = 0
                        newBody.createdAt = data.createdAt

                        if (currentInfoPage === 1) {
                            setInfoItems(prevItems => { return [newBody, ...prevItems] })
                        }

                        type === 'events' && setEventAt(['', '', ''])
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setAddNewData(prevProps => ({
                        ...prevProps,
                        error: 'خطایی رخ داده است',
                        isSubmitting: false
                    }));
                });
        }

    };

    return (
        <div className="mt-5">
            <FormControl className="w-full">
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <div>
                            <label className="block text-white mb-1 pr-4" htmlFor="inline-full-name">
                                عنوان {itemType}
                            </label>
                        </div>
                        <div>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                                name="title"
                                value={AddNewData.formData.title}
                                placeholder={`عنوان ${itemType} را وارد کنید`}
                                onChange={handleChange}
                            />
                        </div>
                    </Grid>

                    {
                        !!tag ?
                            <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                                برچسب: {' '}
                                {tag}
                            </Grid>
                            :
                            <Grid item xs={12} sm={12} md={12} lg={6} className="mt-2 relative">
                                <InputLabel
                                    id="demo-multiple-chip-label"
                                    className="absolute"
                                    sx={{ right: { lg: '8%', xs: '15%', sm: '10%', md: '6%' }, top: { lg: '35%', xs: '20%', sm: '19%', md: '30%' } }}
                                >
                                    برچسب ها
                                </InputLabel>
                                <Select
                                    style={{ height: '52px' }}
                                    name="tags"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 lg:mt-5 text-gray-700 leading-tight bg-white focus:bg-white focus:border-purple-500`}
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={AddNewData.formData.tags}
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
                                    {[...tags, 'ادمین', 'رئیس باشگاه'].map((tag) => (
                                        <MenuItem
                                            key={tag}
                                            value={tag}
                                            style={getStyles(tag, AddNewData.formData.tags, theme)}
                                        >
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                    }

                    <Grid item xs={12}>
                        <label
                            className="block mt-2 mb-1 text-slate-50" htmlFor="inline-image-upload">
                            آپلود تصویر
                        </label>

                        <MultiFileDropzone
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
                    </Grid>

                    {
                        type === 'events' &&
                        <Grid item xs={12}>
                            <label
                                className="block mt-2 mb-1 text-slate-50">
                                تاریخ رویداد
                            </label>
                            <div className='flex'>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                    id="inline-full-name"
                                    type="number"
                                    name="title"
                                    value={eventAt[0]}
                                    placeholder="روز"
                                    onChange={e => onEventAtHandler(e, 0)}
                                />
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                    id="inline-full-name"
                                    type="number"
                                    name="title"
                                    value={eventAt[1]}
                                    placeholder="ماه"
                                    onChange={e => onEventAtHandler(e, 1)}
                                />
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-2"
                                    id="inline-full-name"
                                    type="number"
                                    name="title"
                                    value={eventAt[2]}
                                    placeholder="سال"
                                    onChange={e => onEventAtHandler(e, 2)}
                                />
                            </div>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        <CustomQuill
                            onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
                            value={AddNewData.formData.quillValue}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <label className="text-slate-50 text-sm ml-2" htmlFor="telegram">
                            ارسال به شبکه های اجتماعی
                        </label>
                        <input
                            type="checkbox"
                            ref={checkBoxRef}
                            name="telegram"
                            checked={AddNewData.formData.telegram}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            className='mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded'
                            type="submit"
                            disabled={AddNewData.isSubmitting}
                            onClick={onSubmitForm}
                        >
                            ارسال
                        </Button>
                    </Grid>
                </Grid>

            </FormControl>
            <div className='w-full text-center'>
                {AddNewData.isSubmitting && <div className='text-green-700 bg-slate-200 mt-3 rounded-xl text-center'>
                    در حال ارسال ...
                </div>}
                {AddNewData.success !== '' ? <div className='text-green-700 mt-3 bg-slate-200 text-center rounded-xl'>
                    {AddNewData.success}
                </div> : AddNewData.error !== '' ? <div className='text-red-600 mt-3 bg-slate-200 text-center rounded-xl'>
                    {AddNewData.error}
                </div> : ''}
            </div>
        </div>
    );
}
