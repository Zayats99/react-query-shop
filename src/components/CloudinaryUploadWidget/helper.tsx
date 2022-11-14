import { Box } from "@mui/material"
import { styled } from "@mui/system"

import { TFileImage } from "../../types/FileImage"

export const styles = {
  gridContainer: {
    justifyContent: "center",
    gap: "10px",
  },
  boxStyle: {
    position: "relative",
    width: "150px",
    height: "100px",
    borderRadius: "15px",
    border: "2px dashed #ccc",
    // overflow: 'hidden'
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: '-1'
  },
  emptyBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    width: "35px",
    height: "35px",
    border: "1px solid #1976d2",
    padding: 0,
    backgroundColor: "#fff",
  },
}
export const InputUploadFile = styled("input")({
  opacity: 0,
  zIndex: "-1",
  position: "absolute",
})
export const LableUploadFile = styled("label")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})
export const EditBox = styled(Box)({
    position: "absolute",
    top: "-20px",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
})

export const convertImagesToFileImageType = (img: string[] | string | TFileImage[] | undefined) => {
  if (!img) return [];
 
  return Array.isArray(img)
    ? img.some((item: any) => typeof item === "string")
      ? (img.map((item) => ({ url: item })) as TFileImage[])
      : (img as TFileImage[])
    : [{ url: img }];
};
