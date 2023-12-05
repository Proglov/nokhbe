'use client'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ButtonSignOut() {
    const router = useRouter();

    return (
        <button onClick={() => {
            router.push('/');
            setTimeout(() => {
                signOut();
            }, 100);
        }}>
            خروج از حساب
        </button>
    )
}
