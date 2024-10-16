import { FormControl, Grid } from '@mui/material';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GrUserAdmin } from 'react-icons/gr';
import prisma from '@/lib/prismaDB'
import { getUser } from '@/lib/getUser';


export default async function Profile() {
    const userId = (await getUser())?.user?.id
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user.id)
        redirect('/authentication')

    return (
        <FormControl className="w-full">
            <Grid container spacing={2} className='max-w-xl mx-auto m-3'>

                {
                    user.role === 'clubBoss' ?
                        <Link href='/clubBoss' className='text-cyan-700 text-lg underline flex items-center gap-2'>
                            ورود به پنل مدیریت
                            <GrUserAdmin />
                        </Link>
                        :
                        user.role === 'Admin' &&
                        <Link href='/ADMIN' className='text-cyan-700 text-lg underline flex items-center gap-2'>
                            ورود به پنل مدیریت
                            <GrUserAdmin />
                        </Link>
                }


                <Grid item xs={12} className='text-center text-red-500'>
                    مشخصات من
                </Grid>

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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
