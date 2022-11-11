import { Box, Button } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface UploadWidgetProps {}

const UploadWidget: FC<UploadWidgetProps> = () => {
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET as string;
  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_UPLOAD_NAME as string;
  // dc11k1px5
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleGetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const handleUploadImageToCloudinary = () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'post',
        body: data
      }).then((res)=> res.json()).then((data => setUrl(data.url))).catch((err)=> console.log(err))
    }
  };
  console.log(url)
  return (
    <Box>
      <input type="file" onChange={handleGetImage} />
      <Button onClick={handleUploadImageToCloudinary}>upload</Button>
    </Box>
  );
};

export default UploadWidget;
