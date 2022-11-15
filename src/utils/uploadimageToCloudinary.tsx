import axios from "axios";
import { TFileImage } from "./../types";

const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET as string;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_UPLOAD_NAME as string;
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  const data = await axios.post(BASE_URL, formData);
  return data.data["secure_url"];
};
const getFileFromURLObject = async (url: string, fileName: string = "unknown", typeFile: string = "image/png") => {
  return await fetch(url)
    .then((r) => r.blob())
    .then((res) => new File([res], fileName, { type: typeFile }))
};
export const checkUploadedImage = (images: TFileImage[]) => {
  if (images.length === 0) return [];
 //'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
  return images.map(async (image) => {
    if (image.type) {
      return await getFileFromURLObject(image.url, image.name, image.type).then(file => uploadImageToCloudinary(file))
    } else {
      return image.url;
    }
  });
};
