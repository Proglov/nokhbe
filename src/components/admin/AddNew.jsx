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
import CustomQuill from './CustomQuill';
import DOMPurify from 'dompurify'
import { useRef, useContext } from 'react';
import { useState } from 'react';
import { useAdminContext } from '@/hooks/useAdminHooks';
import { useEdgeStore } from '../../lib/edgestore';
import { SingleImageDropzone } from './single-image-dropzone';
import { siteAPI } from '@/utils/API';


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

const tagOptions = [
    'تجارت الکترونیک',
    'انرژی های نو و تجدید پذیر',
    'علوم آب و پساب های صنعتی',
    'نانو ساختار و فناوری های مربوطه',
    'هواپیمایی و هوانوردی',
    'محیط زیست (انسانی - طبیعی)',
    'منابع طبیعی و کشاورزی',
    'نفت و گاز',
    'سیستم های هوشمند کاربردی',
    'کارآفرینی و اقتصاد توسعه',
    'معدن و بهسازی گوهر سنگ ها',
    'مدیریت و طراحی سیستم ها',
    'پاتولوژی و گیاهان دارویی',
    'کارآفرینی کسب و کارهای مجازی',
    'ریاضیات و مطالعات علمی و دینی',
    'علوم و فناوری های نوین و همگرا',
    'تدوین دانشنامه علوم کیمیا در ایران',
    'حقوق و حوزه های جدید',
    'ره آموز در علوم انسانی',
    'فرهنگ و ادب ایران',
    'طب سنتی و داروهای گیاهی',
    'مهندسی و برنامه ریزی حمل و نقل',
    'معماری و گرایش های مربوطه',
    'شیمی فیزیک',
    'امور اقتصادی و مالی',
    'ادمین',
    'رئیس باشگاه',
];

function getStyles(tagOptions, tags, theme) {
    return {
        fontWeight: tags.indexOf(tagOptions) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

export default function AddNew({ type }) {
    const theme = useTheme();
    const checkBoxRef = useRef();

    const [file, setFile] = useState(null);
    const { edgestore } = useEdgeStore();

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

    const { setStaticProps, setInfoItems, currentInfoPage, controlPanelsPage } = useContext(useAdminContext)

    const itemType = type === 'events' ? "رویداد" : type === 'news' ? "خبر" : "اطلاعیه"

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

    const onSubmitForm = async () => {
        setAddNewData(prevProps => ({
            ...prevProps,
            isSubmitting: true
        }));

        //add the image to the db
        let imageURL = '';
        if (!!file) {
            const imageRes = await edgestore.myPublicImages.upload({ file })
            imageURL = imageRes.url;
        }


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
        } else if (AddNewData.formData.tags.length === 0) {
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
        } else {
            fetch(`${siteAPI}/api/${type}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    "title": AddNewData.formData.title,
                    "description": DOMPurify.sanitize(AddNewData.formData.quillValue),
                    "imageURL": imageURL,
                    "tags": AddNewData.formData.tags,
                    "createdBy": "ADMIN",
                    "telegram": AddNewData.formData.telegram
                })
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
                        setFile(null);

                        //show success for five seconds
                        setTimeout(() => setAddNewData(prevProps => ({
                            ...prevProps,
                            success: ''
                        })), 5000);

                        // Add new negative status in statics
                        if (type === 'news') {
                            setStaticProps(prevProps => ({
                                ...prevProps, newsCount: prevProps.newsCount + 1,
                                negativeStatusNewsCount: prevProps.negativeStatusNewsCount + 1
                            }));

                            if (currentInfoPage === 1 && controlPanelsPage === 0) {
                                setInfoItems(prevItems => {
                                    return [{
                                        id: data?.id,
                                        title: AddNewData.formData.title,
                                        description: DOMPurify.sanitize(AddNewData.formData.quillValue),
                                        imageURL,
                                        tags: AddNewData.formData.tags,
                                        createdBy: "ADMIN",
                                        views: 0,
                                        telegram: AddNewData.formData.telegram,
                                        createdAt: new Date()
                                    },
                                    ...prevItems]
                                })
                            }

                        } else if (type === 'events') {
                            setStaticProps(prevProps => ({
                                ...prevProps, eventsCount: prevProps.eventsCount + 1,
                                negativeStatusEventsCount: prevProps.negativeStatusEventsCount + 1
                            }));

                            if (currentInfoPage === 1 && controlPanelsPage === 2) {
                                setInfoItems(prevItems => {
                                    return [{
                                        id: data?.id,
                                        title: AddNewData.formData.title,
                                        description: DOMPurify.sanitize(AddNewData.formData.quillValue),
                                        imageURL,
                                        tags: AddNewData.formData.tags,
                                        createdBy: "ADMIN",
                                        views: 0,
                                        telegram: AddNewData.formData.telegram,
                                        createdAt: new Date()
                                    },
                                    ...prevItems]
                                })
                            }
                        } else {
                            setStaticProps(prevProps => ({
                                ...prevProps, announcementsCount: prevProps.announcementsCount + 1,
                                negativeStatusAnnouncementsCount: prevProps.negativeStatusAnnouncementsCount + 1,
                            }));

                            if (currentInfoPage === 1 && controlPanelsPage === 1) {
                                setInfoItems(prevItems => {
                                    return [{
                                        id: data?.id,
                                        title: AddNewData.formData.title,
                                        description: DOMPurify.sanitize(AddNewData.formData.quillValue),
                                        imageURL,
                                        tags: AddNewData.formData.tags,
                                        createdBy: "ADMIN",
                                        views: 0,
                                        telegram: AddNewData.formData.telegram,
                                        createdAt: new Date()
                                    },
                                    ...prevItems]
                                })
                            }
                        }
                    }
                })
                .catch((err) => {
                    setAddNewData(prevProps => ({
                        ...prevProps,
                        error: err,
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
                                value={AddNewData.formData.title}
                                placeholder={`عنوان ${itemType} را وارد کنید`}
                                onChange={handleChange}
                            />
                        </div>
                    </Grid>

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
                            {tagOptions.map((tag) => (
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

                    <Grid item xs={12}>
                        <CustomQuill
                            onChange={(value) => handleChange({ target: { name: 'quillValue', value } })}
                            value={AddNewData.formData.quillValue}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <label
                            className="block mt-2 mb-1  text-slate-50" htmlFor="inline-image-upload">
                            آپلود تصویر
                        </label>

                        <SingleImageDropzone
                            width={200}
                            height={200}
                            value={file}
                            dropzoneOptions={{
                                maxSize: 1024 * 1024 * 2
                            }}
                            onChange={(file) => {
                                setFile(file);
                            }}
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
