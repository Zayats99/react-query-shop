import axios from "axios"
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET as string
const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_UPLOAD_NAME
const BASE_URL = `https://api.cloudinary.com/v1_1/dc11k1px5/upload`

export const uploadImageToCloudinary = async (file: string) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", UPLOAD_PRESET)
  const data = await axios.post(BASE_URL, formData)

  return data.data["secure_url"]
}
export const checkUploadedImage = (images: string[]) => {
  return images.map((image) =>
    image.includes("blob") ? uploadImageToCloudinary(image) : image
  )
}
