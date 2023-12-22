import ClientSidePage from '@/components/admin/ClientSidePage';
import { getUser } from '@/lib/getUser';
import { notFound } from 'next/navigation';

export default async function AdminPage() {
    const session = await getUser()

    if (session?.user)
        return (
            <>
                <ClientSidePage />
            </>
        );
    notFound();
}
