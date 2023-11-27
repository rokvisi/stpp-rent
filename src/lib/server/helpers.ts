import { put, del } from "@vercel/blob";

export function atLeastOneFieldUpdated(obj: any) {
    for (const val of Object.values(obj)) {
        if (val !== undefined) return true;
    }
    return false;
}

export async function getRequestFormData(request: Request) {
    try {
        return await request.formData();
    } catch (e) {
        return null; //? Invalid request body or somehow already consumed.
    }
}

export async function getRequestJson(request: Request) {
    try {
        return await request.json();
    } catch (e) {
        return null; //? Invalid request body or somehow already consumed.
    }
}

export function isValidImage(file: File) {
    return file['type'].startsWith('image/') && !file['type'].startsWith('image/svg');
}

export async function uploadImageToVercel(filename: string, file: File) {
    if (!isValidImage(file)) return null; // Invalid file type

    try {
        const { url } = await put(filename, file, { access: "public" });
        return url;
    }
    catch {
        return null; //? Service unavailable or broken file.
    }
}

export async function deleteImageFromVercel(filename: string) {
    try {
        await del(filename);
        return true;
    }
    catch {
        return false; //? Service unavailable or non-existant file.
    }
}

export async function updateImageOrNothing(oldImageUrl: string, newImage: File | null) {
    if (newImage === null) return null;

    //* Delete the existing image.
    await deleteImageFromVercel(oldImageUrl)

    //* Upload new image.
    const uploadResult = await uploadImageToVercel(newImage.name, newImage);

    return uploadResult;
}
