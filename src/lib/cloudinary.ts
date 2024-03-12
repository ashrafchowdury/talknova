import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloud = async (file: string) => {
  try {
    if (!file) return null;

    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    return { error: "Encounter error while trying to upload the file" };
  }
};

export const deleteFileFromCloud = async (id: string) => {
  try {
    if (!id) return null;

    const response = await cloudinary.uploader.destroy(id);

    return response;
  } catch (error) {
    return { error: "Encounter error while trying to delete the file" };
  }
};
