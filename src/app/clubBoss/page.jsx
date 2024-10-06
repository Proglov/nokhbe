import ClientSidePage from '@/components/admin/ClientSidePage';
import { getUserRoleAndClubs } from '@/utils/APIUtilities';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';


export default async function AdminPage() {
    const { role, clubs } = await getUserRoleAndClubs()

    if (role === "clubBoss") return <ClientSidePage role='clubBoss' clubs={clubs} />;

    const headersList = headers()
    const referer = headersList.get('referer')
    const host = headersList.get('host')

    const userCameFromHomePage = !!referer ? referer.endsWith(host + '/') : false

    if (userCameFromHomePage) {
        redirect('/')
    }

    notFound();
}
