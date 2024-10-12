import { FormControl, Grid } from '@mui/material';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getMe = async () => {
    try {
        const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getMe`, { cache: 'no-store', method: 'GET', headers: headers() });

        if (!resUser.ok) {
            throw new Error('Failed to fetch data');
        }

        const user = await resUser.json();
        return user.user;
    } catch (error) {
        return {}
    }
}

export default async function Profile() {
    const user = await getMe()

    if (!user.id)
        redirect('/authentication')

    return (
        <FormControl className="w-full">
            <Grid container spacing={2} className='max-w-xl mx-auto m-3'>

                {
                    user.role === 'clubBoss' ?
                        <Link href='/clubBoss'>
                            ورود به پنل مدیریت
                        </Link>
                        :
                        user.role === 'Admin' &&
                        <Link href='/ADMIN'>
                            ورود به پنل مدیریت
                        </Link>
                }


                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        نام کاربری
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.username}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        ایمیل
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.email}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        نام کامل
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.fullName}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        کد ملی
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.nationalCode}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        شماره همراه
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.mobileNumber}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        شماره تلفن
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.phoneNumber}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        آدرس
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.address}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        کد پستی
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.postalCode}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        بیوگرافی
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.biography}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        تحصیلات
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.education}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        توانایی ها
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user.abilities}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className='text-start text-sm mb-1'>
                        کارگروه (ها)
                    </div>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-store-name"
                        type="text"
                        disabled
                        value={user?.club?.join(' ، ')}
                    />
                </Grid>

            </Grid>

        </FormControl>
    )
}
