import ClientSidePage from '@/components/admin/ClientSidePage';
import { NextAuthOptions } from '@/lib/NextAuthOptions';
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation';

const API_URL = 'http://localhost:3000/';

export default async function AdminPage() {
    const session = await getServerSession(NextAuthOptions);

    if (session?.user)
        return (
            <>
                <ClientSidePage API_URL={API_URL} />
            </>
        );
    notFound();
}
