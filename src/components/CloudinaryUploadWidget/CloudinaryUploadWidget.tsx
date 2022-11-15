import { FC, useState, useRef, ChangeEvent, useMemo } from "react";
import { Box, CardMedia, Grid } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import {
  convertImagesToFileImageType,
  EditBox,
  InputUploadFile,
  LableUploadFile,
  RemoveButton,
  styles
} from "./helper";
import { TFileImage } from "../../types/FileImage";

interface CloudinaryUploadWidgetProps {
  images?: string[] | string | TFileImage[];
  onChangeImage?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export const CloudinaryUploadWidget: FC<CloudinaryUploadWidgetProps> = ({ images, onChangeImage }) => {
  const initialsImagesArray = useMemo(() => convertImagesToFileImageType(images), [images]);
  const [image, _setImage] = useState<TFileImage[] | []>(initialsImagesArray);
  const inputFileRef = useRef<any>(null);

  const setImage = (newImage: TFileImage) => {
    _setImage([...image, newImage]);
    if (onChangeImage) {
      onChangeImage("images", [...image, newImage]);
    }
  };

  const handleOnChandge = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0];

      if (newImage) {
        setImage({
          url: URL.createObjectURL(newImage),
          type: newImage.type,
          name: newImage.name
        });
      }
    }
  };

  const handleRemoveImage = (item: string) => {
    _setImage(image.filter((img) => img.url !== item));
    if (onChangeImage) {
      onChangeImage("images", [...image.filter((img) => img.url !== item)]);
    }
  };

  return (
    <Grid container>
      <Grid item container sx={styles.gridContainer}>
        {image.length !== 0 &&
          image.map((item, index) => (
            <Box key={index} sx={styles.boxStyle}>
              <EditBox>
                <RemoveButton onClick={() => handleRemoveImage(item.url)}>
                  <ClearIcon fontSize="small" />
                </RemoveButton>
              </EditBox>
              <CardMedia sx={styles.img} component="img" image={item.url} />
            </Box>
          ))}
        <Grid sx={{ ...styles.boxStyle, ...styles.emptyBox }}>
          <LableUploadFile htmlFor="upload-input">
            <AddIcon />
          </LableUploadFile>
          <InputUploadFile id="upload-input" ref={inputFileRef} type="file" onChange={handleOnChandge} />
        </Grid>
      </Grid>
    </Grid>
  );
};
