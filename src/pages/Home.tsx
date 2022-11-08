import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { ProductCard } from "../components";
import { useProducts } from "../hooks";

export function Home() {
	const { isLoading, response } = useProducts();

	return (
		<>
			{isLoading ? (
				<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : response?.data.length ? (
				<Grid container spacing={2}>
					{response.data.map(({ id, title, price, category, images }) => (
						<Grid key={id} item xs={3}>
							<ProductCard id={id} title={title} price={price} category={category} images={images} />
						</Grid>
					))}
				</Grid>
			) : (
				<div>Elements not found...</div>
			)}
		</>
	);
}
