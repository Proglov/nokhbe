'use client'
import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { TabContext } from "./SignAndLog";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const router = useRouter();
    const { setTabValue } = useContext(TabContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [forgetMode, setForgetMode] = useState(false)

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
        }

    }

    const toggleForgetMode = () => {
        setForgetMode(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (formData.password === '' || formData.email === '') {
            toast.error('لطفا تمامی فیلد ها را تکمیل نمایید')
            setIsSubmitting(false)
            return
        }
        if (formData.password.length < 8) {
            toast.error('رمز عبور حداقل شامل هشت کاراکتر میباشد')
            setIsSubmitting(false)
            return
        }

        //Next-Auth API GOES HERE
        const signInData = await signIn('credentials', {
            emailOrUsername: formData.email,
            password: formData.password,
            redirect: false
        })
        if (signInData?.error) {
            toast.error('رمزعبور یا نام کاربری یا ایمیل نادرست است')
        } else {
            router.push('/');
            router.refresh();
        }

        setFormData({
            email: '',
            password: ''
        })
        setIsSubmitting(false)
    }

    const onForgetHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (formData.email === '') {
            toast.error('لطفا ایمیل یا نام کاربری خود را وارد نمایید')
            setIsSubmitting(false)
            return
        }
        fetch('api/user/forget', {
            method: 'POST',
            body: JSON.stringify({
                emailOrUsername: formData.email
            }),
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    toast.error('مشکلی در اتصال اینترنت رخ داده است!')
                }
                setIsSubmitting(false)
                if (data.message === "وارد کردن ایمیل یا نام کاربری الزامیست") {
                    toast.error("وارد کردن ایمیل یا نام کاربری الزامیست")
                } else if (data.message === "کاربری با این مشخصات پیدا نشد") {
                    toast.error("کاربری با این مشخصات پیدا نشد")
                } else if (data.message === "موفقیت آمیز بود!") {
                    toast.success('رمزعبور شما تغییر یافت. لطفا ایمیل خود را بررسی نمایید')
                }
            })
            .catch(() => {
                toast.error('مشکلی در اتصال اینترنت رخ داده است!!')
                setIsSubmitting(false)
            })

    }


    return (
        <div className="flex flex-col items-center justify-center px-6 mx-auto mt-1">
            <div className="w-full bg-white rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {!forgetMode ? "ورود به حساب کاربری" : "فراموشی رمز عبور"}
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleFormChange} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" placeholder="ایمیل یا نام کاربری خود را وارد کنید" required />
                        </div>

                        {
                            !forgetMode &&
                            <div>
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleFormChange} placeholder="رمز عبور" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:ring-blue-500" required />
                            </div>
                        }

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color='success'
                            className='text-lg'
                            onClick={(e) => {
                                if (forgetMode) onForgetHandler(e)
                                else handleSubmit(e)
                            }}
                            disabled={isSubmitting}
                        >
                            <span style={{ fontFamily: 'Shabnam' }}>
                                {!forgetMode ? "ورود" : "درخواست بازیابی رمزعبور"}
                            </span>
                        </Button>
                        <Grid container className='my-3'>
                            <Grid item xs>
                                <button style={{ color: 'red' }} onClick={toggleForgetMode}>
                                    {!forgetMode ? "فراموشی رمز عبور" : "بازگشت"}
                                </button>
                            </Grid>
                            <Grid item>
                                <button onClick={() => setTabValue(1)} style={{ color: 'blue' }}>
                                    تاکنون ثبت نام نکرده اید؟
                                </button>
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