import { SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";

import { EditProductModal } from "../components";
import { Backdrop, CircularProgress, Grid, Box, ButtonBase, Typography, Button } from "@mui/material";
import { useProduct } from "../hooks";

function Product() {
	const { id } = useParams();

	const { isLoading, product } = useProduct(id);
	// console.log(product);

	const [currentImg, setCurrentImg] = useState(0);

	function swithPhotoHandler(i: SetStateAction<number>) {
		setCurrentImg(i);
	}

	return (
		<>
			{isLoading ? (
				<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<Grid container sx={{ height: "calc(100vh-96px)" }}>
					<Grid item container xs={12} md={7} justifyContent="center" alignItems="center">
						<Typography gutterBottom variant="h3" sx={{ m: "0 auto 10px 30px" }}>
							{product?.title}
						</Typography>
						<Box
							component="img"
							sx={{
								width: 750,
								maxWidth: { xs: 350, md: 750 },
							}}
							alt={product?.title}
							src={product?.images[currentImg]}
						/>
						<Grid item container justifyContent="center" alignItems="center" sx={{ p: 1, gap: "10px" }}>
							{product?.images.map((img, index) => (
								<ButtonBase key={index} onClick={() => swithPhotoHandler(index)}>
									<Box
										component="img"
										sx={{
											width: 120,
										}}
										alt={product?.title}
										src={img}
									/>
								</ButtonBase>
							))}
						</Grid>
					</Grid>
					<Grid
						item
						container
						justifyContent="center"
						alignItems="flex-start"
						direction="column"
						xs={12}
						md={5}
						sx={{ p: 3 }}
					>
						{product && <EditProductModal initialState={product} />}
						<Typography gutterBottom variant="body2">
							Category: {product?.category.name}
						</Typography>
						<Typography gutterBottom variant="body2">
							Description: {product?.description}
						</Typography>

						<Typography gutterBottom variant="body2">
							Price: {product?.price}$
						</Typography>
						<Button variant="contained" sx={{ ml: "auto", height: "40px", mt: "auto" }}>
							ADD TO CART
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
}

export { Product };
