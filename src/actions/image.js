'use server'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getUser } from '@/lib/getUser'
import sharp from 'sharp';
import { encString, extractIdFromFilename } from '@/utils/funcs';
import crypto from 'crypto'
import { debugServerActionError, getUserRole } from '@/utils/APIUtilities';
import { addTemporaryImage } from './temporaryImage';


const s3 = new S3Client({
    region: "default",
    endpoint: process.env.LIARA_ENDPOINT,
    credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY
    },
});


export const uploadImage = async (formData) => {
    try {
        //check if they're admin
        const userRole = await getUserRole()
        const session = await getUser()
        if (userRole !== 'Admin')
            return debugServerActionError({ message: "Unauthorized", name: null, status: 403 })

        const file = formData.get("images")

        if (file.size === 0) return debugServerActionError({ message: 'please send an image!', name: null, status: 404 }
        )
        if (file.size > 5 * 1024 * 1024) return debugServerActionError({ message: 'image should be at most 5 MB', name: null, status: 404 })

        const buffer = Buffer.from(await file.arrayBuffer())

        // resize
        const newBuffer = await sharp(buffer).resize({ height: 600, width: 800, fit: "contain" }).toBuffer()
        //name
        const date = new Date();
        const now = date.getTime();
        const imageName = now + "_" + encString(session.user?.id) + "_" + crypto.randomBytes(32).toString('hex');
        const params = {
            Body: newBuffer,
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: imageName,
            ContentType: file.type
        };

        await s3.send(new PutObjectCommand(params));

        //add in the temporary image
        await addTemporaryImage(imageName)

        // revalidatePath('/ADMIN')
        return debugServerActionError({ message: "Successfully Added", name: imageName, status: 201 })

    } catch (error) {
        return debugServerActionError({ message: error, name: null, status: 500 })
    }
}

export const getImage = async (filename) => {

    try {
        const params = {
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: filename,
        };

        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3, command);
        return debugServerActionError({
            url,
            message: "success full",
            status: 200
        })

    } catch (error) {
        return debugServerActionError({
            url: null,
            message: error,
            status: 500
        })
    }
}

export const getImages = async (filenames) => {

    try {
        let urls = [];

        for (let filename of filenames) {
            const params = {
                Bucket: process.env.LIARA_BUCKET_NAME,
                Key: filename,
            };

            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command);
            urls.push(url)
        }
        return debugServerActionError({
            urls,
            message: "success full",
            status: 200
        })


    } catch (error) {
        return debugServerActionError({
            urls: null,
            message: error,
            status: 500
        })
    }
}

export const deleteImage = async (filename) => {
    try {
        const userRole = await getUserRole()
        const session = await getUser()
        if (userRole !== 'Admin' && extractIdFromFilename(filename) !== session.user.id)
            return debugServerActionError({ message: "Unauthorized", status: 403 })

        const params = {
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: filename,
        };

        await s3.send(new DeleteObjectCommand(params));

        return debugServerActionError({
            status: 201,
            message: "Successfully Deleted"
        })
    } catch (error) {
        return debugServerActionError({
            status: 500,
            message: error
        })
    }

}

export const deleteImages = async (filenames) => {
    try {
        const userRole = await getUserRole()
        const session = await getUser()
        if (userRole !== 'Admin')
            return debugServerActionError({ message: "Unauthorized", status: 403 })

        for (const filename of filenames) {
            if (extractIdFromFilename(filename) !== session.user.id) {
                return debugServerActionError({
                    status: 403,
                    message: "you are not authorized"
                })
            }
        }

        const files2Delete = [];
        for (const filename of filenames) {
            files2Delete.push({
                "Key": filename
            })
        }
        const params = {
            "Bucket": process.env.LIARA_BUCKET_NAME,
            "Delete": {
                "Objects": files2Delete
            },
        };

        await s3.send(new DeleteObjectsCommand(params));

        return debugServerActionError({
            status: 201,
            message: "Successfully Deleted"
        })
    } catch (error) {
        return debugServerActionError({
            status: 500,
            message: error,
        })
    }

}

export const getTrueImagesUrl = async (input) => {
    if (Array.isArray(input)) {
        const nwObj = [];

        for (const item of input) {
            if (item.imagesURL.length !== 0) {
                const { urls } = await getImages(item.imagesURL);

                const updatedItem = {
                    ...item,
                    imagesURL: urls,
                    imagesName: item.imagesURL
                };

                nwObj.push(updatedItem);
            } else {
                nwObj.push(item);
            }

        }

        return nwObj;
    } else if (typeof input === 'object') {
        if (input.imagesURL.length !== 0) {
            const { urls } = await getImages(input.imagesURL);

            return {
                ...input,
                imagesURL: urls,
                imagesName: input.imagesURL
            };
        }
        return input
    }

    return null; // Invalid input
};