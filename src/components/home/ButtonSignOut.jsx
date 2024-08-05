'use client'
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function ButtonSignOut() {

    return (
        <Link href={'/'}>
            <button onClick={() => {
                setTimeout(() => {
                    signOut();
                }, 100);
            }}>
                خروج از حساب
            </button>
        </Link>
    )
}
