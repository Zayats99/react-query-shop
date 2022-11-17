import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  useCategories,
  useProductDelete,
  useProductUpdate,
  useProductCreate,
  useProducts
} from "../../hooks";
import { TFileImage } from "./../../types";
import { IProduct } from "../../services";
import { checkUploadedImage } from "../../utils";

import { CloudinaryUploadWidget } from "../CloudinaryUploadWidget/CloudinaryUploadWidget";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  MenuItem,
  InputAdornment
} from "@mui/material";

interface IProductModal {
  open: boolean;
  initialState?: IProduct;
  refetchProduct?: () => void;
  handleClose: () => void;
}

interface IModalState {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string | string[] | TFileImage[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px 32px"
};

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  price: Yup.number().required("Required!").positive("Not valid!"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(1500, "Too Long!")
    .required("Required!")
});

export function ProductModal({
  open,
  initialState,
  refetchProduct,
  handleClose
}: IProductModal) {
  const { categories } = useCategories();
  const { refetchProducts } = useProducts();
  const { createProduct } = useProductCreate();
  const { updateProduct } = useProductUpdate(String(initialState?.id));
  const { deleteProduct } = useProductDelete(String(initialState?.id));

  const [initialValues, setInitialValues] = useState({} as IModalState);

  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteProduct.mutateAsync();
    refetchProducts();
    navigate("/");
  };

  const handleSubmitForm = async (values: IModalState) => {
    initialState
      ? Promise.all(checkUploadedImage(values.images as TFileImage[])).then(
          async (images) => {
            await updateProduct.mutateAsync({ ...values, images });
            refetchProduct && refetchProduct();
            refetchProducts();
          }
        )
      : Promise.all(checkUploadedImage(values.images as TFileImage[])).then(
          (images) =>
            createProduct
              .mutateAsync({ ...values, images })
              .then(async () => await refetchProducts())
        );

    handleClose();
  };

  useEffect(() => {
    if (initialState) {
      const { id, category, ...values } = initialState;
      setInitialValues({ ...values, categoryId: initialState.category.id });
    } else {
      setInitialValues({
        title: "",
        price: 0,
        description: "",
        images: "",
        categoryId: 1
      });
    }
  }, [initialState]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {initialState ? "Edit" : "Create"} Product
          </Typography>

          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={ProductSchema}
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { mt: 2 }
                }}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <TextField
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  label="Product title"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  error={!!errors.title && touched.title}
                  helperText={errors.title}
                />
                <Grid item container>
                  <TextField
                    id="outlined-select-currency"
                    name="categoryId"
                    select
                    label="Category"
                    value={values.categoryId}
                    onChange={handleChange}
                    sx={{ width: "309px" }}
                  >
                    {categories &&
                      categories?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price > 0 && values.price}
                    label="Price"
                    variant="outlined"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    sx={{ width: "206px", ml: "auto" }}
                    error={!!errors.price && touched.price}
                    helperText={errors.price}
                  />
                </Grid>
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  sx={{ width: "100%" }}
                  error={!!errors.description && touched.description}
                  helperText={errors.description}
                />
                <CloudinaryUploadWidget
                  images={values.images}
                  onChangeImage={setFieldValue}
                />
                <Grid container sx={{ mt: "30px", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  {initialState && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    disabled={
                      isSubmitting ||
                      !!errors.title ||
                      !!errors.price ||
                      !!errors.description
                    }
                    sx={{ ml: "auto" }}
                  >
                    {initialState ? "Update" : "Create"}
                  </Button>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
