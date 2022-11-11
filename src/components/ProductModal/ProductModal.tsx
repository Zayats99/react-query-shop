import { useState } from "react";
import { Formik } from "formik";
import { IProduct } from "../../services/product.service";
import { useCategories, useProductDelete, useProductUpdate, useProductCreate } from "../../hooks";

import { Box, Button, Typography, Modal, TextField, Grid, MenuItem, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProductModal {
	open: boolean;
	initialState?: IProduct;
	refetch?: () => void;
	handleClose: () => void;
}

interface IModalState {
	title: string;
	price: number;
	description: string;
	categoryId: number;
	images: string | string[];
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	boxShadow: 24,
	padding: "20px 32px",
};

export function ProductModal({ open, initialState, refetch, handleClose }: IProductModal) {
	const { categories } = useCategories();
	const { createProduct } = useProductCreate();
	const { updateProduct } = useProductUpdate(String(initialState?.id));
	const { deleteProduct } = useProductDelete(String(initialState?.id));

	const [initialValues, setInitialValues] = useState({} as IModalState);

	const navigate = useNavigate();
	const handleDelete = async () => {
		await deleteProduct.mutateAsync();
		navigate("/");
	};

	useEffect(() => {
		if (initialState) {
			const { id, category, ...values } = initialState;
			setInitialValues({ ...values, categoryId: initialState.category.id });
		} else {
			setInitialValues({ title: "", price: 0, description: "", images: "", categoryId: 1 });
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
						{initialState ? 'Edit' : 'Create'} Product
					</Typography>

					<Formik
						initialValues={{ ...initialValues }}
						onSubmit={async (values) => {
							const img = typeof values.images === "string" ? values.images.split(",") : values.images;
							const modifiedValues = { ...values, images: img };
							if (initialState) {
								await updateProduct.mutateAsync(modifiedValues);
								refetch && refetch();
							} else {
								await createProduct.mutateAsync(modifiedValues);
							}

							handleClose();
						}}
					>
						{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
							<Box
								component="form"
								sx={{
									"& > :not(style)": { mt: 2 },
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
											startAdornment: <InputAdornment position="start">$</InputAdornment>,
										}}
										sx={{ width: "206px", ml: "auto" }}
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
								/>
								<TextField
									name="images"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.images}
									label="Images"
									variant="outlined"
									helperText="Please fill this field with image URLs divided by commas"
									sx={{ width: "100%" }}
								/>
								<Grid container sx={{ mt: "30px", gap: "10px" }}>
									<Button variant="outlined" color="primary" onClick={handleClose}>
										Cancel
									</Button>
									{initialState && (
										<Button variant="outlined" color="error" onClick={handleDelete}>
											Delete
										</Button>
									)}

									<Button
										variant="contained"
										type="submit"
										color="success"
										disabled={isSubmitting}
										sx={{ ml: "auto" }}
									>
										{initialState ? 'Update' : 'Create'}
										
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
