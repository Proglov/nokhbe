'use client'
import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Chip from '@mui/material/Chip';
import Link from "next/link";
import { useContext, useState } from "react";
import { TabContext } from "./SignAndLog";
import { ToastContainer, toast } from "react-toastify";
import { tags } from "@/utils/tags";
import "react-toastify/dist/ReactToastify.css";
import Box from '@mui/material/Box';
import { useTheme } from "@emotion/react";

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

export default function SignUp() {
    const theme = useTheme();
    const [levelIsOne, setLevelIsOne] = useState(true);
    const { setTabValue } = useContext(TabContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [formData2, setFormData2] = useState({
        fullName: '',
        nationalCode: '',
        mobileNumber: '',
        phoneNumber: '',
        address: '',
        postalCode: '',
        biography: '',
        education: '',
        abilities: '',
        club: []
    });

    const toggleLevel = () => setLevelIsOne(prev => !prev);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setFormData(prevForm => ({
                ...prevForm,
                email: value
            }));
        } else if (name === 'password') {
            setFormData(prevForm => ({
                ...prevForm,
                password: value
            }));
        } else if (name === 'confirmPassword') {
            setFormData(prevForm => ({
                ...prevForm,
                confirmPassword: value
            }));
        } else if (name === 'username') {
            setFormData(prevForm => ({
                ...prevForm,
                username: value
            }));
        }

    }
    const handleFormChange2 = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setFormData2(prevForm => ({
                ...prevForm,
                fullName: value
            }));
        } else if (name === 'abilities') {
            setFormData2(prevForm => ({
                ...prevForm,
                abilities: value
            }));
        } else if (name === 'address') {
            setFormData2(prevForm => ({
                ...prevForm,
                address: value
            }));
        } else if (name === 'biography') {
            setFormData2(prevForm => ({
                ...prevForm,
                biography: value
            }));
        } else if (name === 'club') {
            setFormData2(prevForm => ({
                ...prevForm,
                club: value
            }));
        } else if (name === 'education') {
            setFormData2(prevForm => ({
                ...prevForm,
                education: value
            }));
        } else if (name === 'mobileNumber') {
            setFormData2(prevForm => ({
                ...prevForm,
                mobileNumber: value
            }));
        } else if (name === 'nationalCode') {
            setFormData2(prevForm => ({
                ...prevForm,
                nationalCode: value
            }));
        } else if (name === 'phoneNumber') {
            setFormData2(prevForm => ({
                ...prevForm,
                phoneNumber: value
            }));
        } else if (name === 'postalCode') {
            setFormData2(prevForm => ({
                ...prevForm,
                postalCode: value
            }));
        }

    }

    const checkFirstLevel = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (formData.password === '' || formData.username === '' || formData.confirmPassword === '' || formData.email === '') {
            toast.error('لطفا تمامی فیلد ها را تکمیل نمایید')
            setIsSubmitting(false)
            return
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!emailRegex.test(formData.email)) {
            toast.error('ایمیل وارد شده معتبر نمیباشد')
            setIsSubmitting(false)
            return
        }
        if (formData?.username.length < 8) {
            toast.error('نام کاربری باید حداقل شامل هشت کاراکتر باشد')
            setIsSubmitting(false)
            return
        }
        if (formData.password.length < 8) {
            toast.error('رمز عبور باید حداقل شامل هشت کاراکتر باشد')
            setIsSubmitting(false)
            return
        }
        if (formData.confirmPassword === formData.password) {
            toggleLevel();
        } else {
            toast.error('رمزعبور با تکرار رمزعبور مطابقت ندارد')
        }
        setIsSubmitting(false)
    }

    const checkSecondLevel = () => {
        if (formData2.abilities === '' || formData2.address === '' || formData2.biography === '' || formData2.club.length === 0 || formData2.education === '' || formData2.fullName === '' || formData2.mobileNumber === '' || formData2.nationalCode === '' || formData2.phoneNumber === '' || formData2.postalCode === '' || formData2.abilities === ' ' || formData2.address === ' ' || formData2.biography === ' ' || formData2.education === ' ' || formData2.fullName === ' ' || formData2.mobileNumber === ' ' || formData2.nationalCode === ' ' || formData2.phoneNumber === ' ' || formData2.postalCode === ' ') {
            toast.error('لطفا تمامی فیلد ها را تکمیل نمایید')
            return false
        }

        if (formData2.mobileNumber[0] !== '0' || formData2.mobileNumber[1] !== '9' || formData2.mobileNumber.length !== 11) {
            toast.error('شماره تلفن همراه باید به این صورت باشد: 09XXXXXXXXX')
            return false
        }
        const phoneRegex = /^0\d{2,3}\d{8}$/;
        if (!phoneRegex.test(formData2.phoneNumber)) {
            toast.error('تلفن ثابت وارد شده صحیح نمیباشد! نمونه صحیح: 02101234567')
            return false
        }
        const postalRegex = /^[0-9]{10}$/;
        if (!postalRegex.test(formData2.postalCode)) {
            toast.error('کد پستی دارای ده رقم است!')
            return false
        }
        if (formData2.address.length < 10) {
            toast.error('لطفا آدرس خود را به صورت کامل بنویسید')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isTrue = checkSecondLevel();
        if (!isTrue) return

        setIsSubmitting(true)

        setFormData2(() => ({
            fullName: '',
            nationalCode: '',
            mobileNumber: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            biography: '',
            education: '',
            abilities: '',
            club: []
        }));

        //API 
        fetch('api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData2.fullName,
                nationalCode: formData2.nationalCode,
                mobileNumber: formData2.mobileNumber,
                phoneNumber: formData2.phoneNumber,
                address: formData2.address,
                postalCode: formData2.postalCode,
                biography: formData2.biography,
                education: formData2.education,
                abilities: formData2.abilities,
                club: formData2.club
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    toast.error('مشکلی در اتصال اینترنت رخ داده است!')
                }
                if (data.message === "کاربری با این ایمیل قبلا وارد شده است") {
                    toast.error("کاربری با این ایمیل قبلا وارد شده است")
                } else if (data.message === "این نام کاربری قبلا استفاده شده است") {
                    toast.error("این نام کاربری قبلا استفاده شده است")
                } else {
                    //redirect
                    toast.success('با موفقیت ثبت نام شدید ! تا لحظاتی دیگر به صفحه ی ورود منتقل میشوید...')
                    setTimeout(() => {
                        setFormData(prevForm => ({
                            ...prevForm,
                            isSuccessfull: false
                        }));
                        setTabValue(0)
                    }, 5000);
                }
            })
            .catch(() => {
                toast.error('مشکلی در اتصال اینترنت رخ داده است!!')
            })

        setIsSubmitting(false)
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-1">
            <div className="w-full bg-white rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl">
                        ثبت نام
                    </h1>
                    {
                        levelIsOne ?
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <input type="email" name="email" id="email" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="ایمیل خود را وارد کنید" required onChange={handleFormChange} value={formData.email} />
                                </div>

                                <div>
                                    <input type="text" name="username" id="username" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="نام کاربری خود را وارد کنید" required onChange={handleFormChange} value={formData.username} />
                                </div>

                                <div>
                                    <input type="password" name="password" id="password" placeholder="رمز عبور" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" required onChange={handleFormChange} value={formData.password} />
                                </div>

                                <div>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="تکرار رمز عبور" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" required onChange={handleFormChange} value={formData.confirmPassword} />
                                </div>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color='success'
                                    className='text-lg'
                                    disabled={isSubmitting}
                                    onClick={(e) => checkFirstLevel(e)}
                                >
                                    <span style={{ fontFamily: 'Shabnam' }}>
                                        مرحله بعد
                                    </span>
                                </Button>

                                <Grid container className='my-3'>
                                    <Grid item>
                                        <Link href="#" onClick={() => setTabValue(0)} style={{ color: 'blue' }}>
                                            قبلا ثبت نام کرده اید؟
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                            :
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <input type="text" name="name" id="name" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="نام و نام خانوادگی / نام سازمان / شرکت" required onChange={handleFormChange2} value={formData2.fullName} />
                                </div>

                                <div>
                                    <input type="text" name="nationalCode" id="nationalCode" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="کدملی / شناسه ملی" required onChange={handleFormChange2} value={formData2.nationalCode} />
                                </div>

                                <div>
                                    <input type="text" name="mobileNumber" id="mobileNumber" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="تلفن همراه: 09XXXXXXXXX" required onChange={handleFormChange2} value={formData2.mobileNumber} />
                                </div>

                                <div>
                                    <input type="text" name="phoneNumber" id="phoneNumber" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="تلفن ثابت" required onChange={handleFormChange2} value={formData2.phoneNumber} />
                                </div>

                                <div>
                                    <textarea class="resize-none rounded-md border border-solid mغ-2 w-full" name="address" required id="address" onChange={handleFormChange2} value={formData2.address} placeholder="  آدرس" />
                                </div>

                                <div>
                                    <input type="text" name="postalCode" id="postalCode" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="کد پستی" required onChange={handleFormChange2} value={formData2.postalCode} />
                                </div>

                                <div>

                                    <textarea class="resize-none rounded-md border border-solid mغ-2 w-full" name="biography" id="biography" placeholder="بیوگرافی و رزومه شخصی / مجموعه" required onChange={handleFormChange2} value={formData2.biography} />
                                </div>

                                <div>
                                    <input type="text" name="education" id="education" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="تحصیلات و افتخارات" required onChange={handleFormChange2} value={formData2.education} />
                                </div>

                                <div>
                                    <input type="text" name="abilities" id="abilities" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="خدمت و توانایی ها" required onChange={handleFormChange2} value={formData2.abilities} />
                                </div>

                                <div>
                                    <InputLabel
                                        id="demo-multiple-chip-label">
                                        باشگاه و کارگروه جهت فعالیت و عضویت
                                    </InputLabel>
                                    <Select
                                        name="club"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 lg:mt-5 text-gray-700 leading-tight bg-white focus:bg-white focus:border-purple-500`}
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={formData2.club}
                                        onChange={handleFormChange2}
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
                                        {tags.map((tag) => (
                                            <MenuItem
                                                key={tag}
                                                value={tag}
                                                style={getStyles(tag, formData2.club, theme)}
                                            >
                                                {tag}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="flex">
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="outlined"
                                        color='error'
                                        className='text-lg mx-1'
                                        disabled={isSubmitting}
                                        onClick={toggleLevel}
                                    >
                                        <span style={{ fontFamily: 'Shabnam' }}>
                                            مرحله قبل
                                        </span>
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color='success'
                                        className='text-lg mx-1'
                                        disabled={isSubmitting}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        <span style={{ fontFamily: 'Shabnam' }}>
                                            ثبت نام
                                        </span>
                                    </Button>
                                </div>
                            </form>
                    }

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}