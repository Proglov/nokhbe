import ClientSidePage from '@/components/admin/ClientSidePage';
import { getUserRole } from '@/utils/APIUtilities';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';


export default async function AdminPage() {
    const userRole = await getUserRole()

    if (userRole === "Admin") return <ClientSidePage />;

    const headersList = headers()
    const referer = headersList.get('referer')
    const host = headersList.get('host')

    const userCameFromHomePage = !!referer ? referer.endsWith(host + '/') : false

    if (userCameFromHomePage) {
        redirect('/')
    }

    notFound();
}
