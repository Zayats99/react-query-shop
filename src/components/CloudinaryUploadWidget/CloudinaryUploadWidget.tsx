import { FC, useState, useRef } from "react"
import { Box, CardMedia, Grid, IconButton } from "@mui/material"
import { EditBox, InputUploadFile, LableUploadFile, styles } from "./helper"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"

interface CloudinaryUploadWidgetProps {
  images?: string[] | string
  onChangeImage?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
}

export const CloudinaryUploadWidget: FC<CloudinaryUploadWidgetProps> = ({
  images,
  onChangeImage,
}) => {
  const initialImages = images
    ? Array.isArray(images)
      ? images
      : [images]
    : []

  const [image, _setImage] = useState<string[]>(initialImages)
  const [isActiveRemoveButtons, setIisActiveRemoveButtons] =
    useState<boolean>(false)
  const inputFileRef = useRef<any>(null)
  const cleanup = () => {
    image.map((img) => URL.revokeObjectURL(img))
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = null
    }
  }
  const setImage = (newImage: string) => {
    if (image) {
      cleanup()
    }
    _setImage([...image, newImage])
    if (onChangeImage) {
      onChangeImage("images", [...image, newImage])
    }
  }
  const handleOnChandge = async (e: any) => {
    const newImage = e.target.files[0]
    
    if (newImage) {
      console.log(newImage)
      setImage(URL.createObjectURL(newImage))
    }
  }
  const handleOpenImageMenu = () => {
    setIisActiveRemoveButtons(!isActiveRemoveButtons)
  }

  const handleRemoveImage = (item: string) => {
    _setImage(image.filter((img) => img !== item))
  }
  return (
    <Grid container>
      <Grid item container sx={styles.gridContainer}>
        {image.length !== 0 &&
          image.map((item, index) => (
            <Box key={index} sx={styles.boxStyle} onClick={handleOpenImageMenu}>
              {isActiveRemoveButtons && (
                <EditBox>
                  <IconButton
                    sx={{ ...styles.iconButton, marginLeft: "-10px" }}
                    onClick={() => handleRemoveImage(item)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </EditBox>
              )}
              <CardMedia sx={styles.img} component="img" image={item} />
            </Box>
          ))}
        {image.length < 3 || image.length === 0 ? (
          <Grid sx={{ ...styles.boxStyle, ...styles.emptyBox }}>
            <LableUploadFile htmlFor="upload-input">
              <AddIcon />
            </LableUploadFile>
            <InputUploadFile
              id="upload-input"
              ref={inputFileRef}
              type="file"
              onChange={handleOnChandge}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}
