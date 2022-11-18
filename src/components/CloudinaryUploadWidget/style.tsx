import { Box, IconButton, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const styles = {
  boxStyle: {
    position: "relative",
    width: "120px",
    height: "90px",
    borderRadius: "4px",
    border: "2px dashed #ccc",
    flexShrink: 0
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: "-1",
    borderRadius: "6px"
  },
  emptyBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconButton: {
    width: "20px",
    height: "20px",
    border: "1px solid #1976d2",
    padding: 0,
    fontSize: "12px",
    backgroundColor: "#fff"
  }
};
export const InputUploadFile = styled("input")({
  opacity: 0,
  zIndex: "-1",
  position: "absolute",
  width: 120,
  height: 90
});
export const LableUploadFile = styled("label")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});
export const EditBox = styled(Box)({
  position: "absolute",
  top: "-10px",
  right: "-10px"
});
export const RemoveButton = styled(IconButton)({
  width: "20px",
  height: "20px",
  border: "1px solid #1976d2",
  padding: 0,
  fontSize: "12px",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none"
  }
});
export const ScrollGrid = styled(Grid)({
  gap: "10px",
  padding: "15px 0",
  flexWrap: "nowrap",
  overflowX: 'auto',
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
    borderRadius: "10px"
  },
  "&::-webkit-scrollbar-track": {
    marginTop: "75px",
    marginBottom: "75px",
    marginLeft: "4px",
    borderRadius: "10px"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#1976d2",
    borderRadius: "10px"
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#000"
  }
});
