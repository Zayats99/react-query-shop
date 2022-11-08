import { useState } from "react";
import { Formik } from "formik";
import { IProduct } from "../../services/product.service";
import { useCategories } from "../../hooks";

import { Box, Button, Typography, Modal, TextField, Grid, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface IEditProductModal {
	initialState: IProduct;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	padding: "20px 32px",
};

export function EditProductModal({ initialState }: IEditProductModal) {
	const { isLoading, categories } = useCategories();
	// console.log(response);
	const { id, ...initialValues } = initialState;

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// console.log(initialValues);

	return (
		<>
			<Button onClick={handleOpen} sx={{ ml: "auto", height: "40px", p: 0, mb: "auto" }}>
				<EditIcon fontSize="large" />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Edit Product
					</Typography>

					<Formik
						initialValues={{ ...initialValues }}
						// validate={(values) => {
						// 	const errors = {};
						// 	if (!values.email) {
						// 		errors.email = "Required";
						// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						// 		errors.email = "Invalid email address";
						// 	}
						// 	return errors;
						// }}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
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
							/* and other goodies */
						}) => (
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
								<TextField
									id="outlined-select-currency"
									name="category"
									select
									label="Category"
									value={values.category.id}
									onChange={handleChange}
									sx={{ width: "100%" }}
								>
									{categories?.map((option) => (
										<MenuItem key={option.id} value={option.id}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
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
								<Grid container sx={{ mt: "30px", gap: "10px" }}>
									<Button variant="outlined" color="primary" onClick={handleClose}>
										Cancel
									</Button>
									<Button variant="outlined" color="error">
										Delete
									</Button>
									<Button
										variant="contained"
										type="submit"
										color="success"
										disabled={isSubmitting}
										sx={{ ml: "auto" }}
									>
										Update
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
