import ClientSidePictureArchive from '@/components/pictureArchive/ClientSidePictureArchive'


export default function PicturesArchive({ searchParams }) {

    return (
        <ClientSidePictureArchive page={parseInt(searchParams?.page) || 1} perPage={parseInt(searchParams?.perPage) || 20} type={searchParams?.type || 'news'} />
    )
}