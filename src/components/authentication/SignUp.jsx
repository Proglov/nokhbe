'use client'
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import { TabContext } from "./SignAndLog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
    const { setTabValue } = useContext(TabContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

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

    const handleSubmit = async (e) => {
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
            setFormData(() => ({
                email: '',
                password: '',
                confirmPassword: '',
                username: ''
            }));

            //API 
            const response = await fetch('api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
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

        } else {
            toast.error('رمزعبور با تکرار رمزعبور مطابقت ندارد')
        }
        setIsSubmitting(false)
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-1">
            <div className="w-full bg-white rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl">
                        ثبت نام
                    </h1>
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
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color='success'
                            className='text-lg'
                            disabled={isSubmitting}
                            onClick={(e) => handleSubmit(e)}
                        >
                            <span style={{ fontFamily: 'Shabnam' }}>
                                ثبت نام
                            </span>
                        </Button>

                        <div className="text-red-600">
                            {formData.error}
                        </div>
                        {
                            formData.isSuccessfull &&
                            <div className="text-green-500">

                            </div>
                        }

                        <Grid container className='my-3'>
                            <Grid item>
                                <Link href="#" onClick={() => setTabValue(0)} style={{ color: 'blue' }}>
                                    قبلا ثبت نام کرده اید؟
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
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