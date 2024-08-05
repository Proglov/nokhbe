'use server'
import prisma from '@/lib/prismaDB'
import { debugServerActionError } from '@/utils/APIUtilities'
import { deleteImages } from './image'

export const addTemporaryImage = async (filename) => {
    try {
        await prisma.temporaryImage.create({ data: { name: filename } })
        return debugServerActionError({ message: 'success', status: 201 })
    } catch (error) {
        return debugServerActionError({ message: error, status: 500 })
    }
}

export const deleteOldTemporaryImages = async (cutoffDate) => {
    try {
        const files = await prisma.temporaryImage.findMany({
            where: {
                createdAt: {
                    lt: cutoffDate,
                },
            },
        });
        const filenames = files.map(obj => obj.name)
        await deleteImages(filenames)
        await prisma.temporaryImage.deleteMany({
            where: {
                createdAt: {
                    lt: cutoffDate,
                },
            },
        });
        return debugServerActionError({ message: 'temporary images deleted', status: 200 })
    } catch (error) {
        return debugServerActionError({ message: error, status: 500 })
    }

}