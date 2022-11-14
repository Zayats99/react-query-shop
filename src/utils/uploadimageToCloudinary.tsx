import axios from "axios";
import { TFileImage } from './../types/FileImage';
// const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET as string;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_UPLOAD_NAME as string;
const BASE_URL = `https://api.cloudinary.com/v1_1/dc11k1px5/upload`;

export const uploadImageToCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  const data = await axios.post(BASE_URL, formData);

  return data.data["secure_url"];
};
const getFileFromURLObject = async (
  url: string,
  fileName: string = "unknown",
  typeFile: string = "image/png"
) => {
  return await fetch(url)
    .then((r) => r.blob())
    .then((res) => new File([res], fileName, { type: typeFile }));
};
export const checkUploadedImage = (images: TFileImage[]) => {
  if(images.length === 0) return []
  return images.map(async (image) => {
    if (image.type) {
      return await getFileFromURLObject(image.url, image.name, image.type).then(file => uploadImageToCloudinary(file))
    } else {
      return image.url;
    }
  });
};

