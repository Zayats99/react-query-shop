import { useNavigate } from "react-router-dom";

import { Button, CardActionArea, CardActions, Card, CardMedia, Typography, CardContent, Divider } from "@mui/material";
import { useProductDelete } from "../../hooks";

interface IProductCard {
	id: number;
	title: string;
	price: number;
	category: {
		id: number;
		name: string;
		image: string;
	};
	images: string[] | string;
	refetchProducts: () => void;
}

export function ProductCard({ id, title, price, category, images, refetchProducts }: IProductCard) {
	const navigate = useNavigate();

	const { deleteProduct } = useProductDelete(String(id));

	function clickHandler() {
		navigate(`/product/${id}`);
	}
	async function deleteHandler() {
		await deleteProduct.mutateAsync();
		await refetchProducts();
	}

	return (
		<Card>
			<CardActionArea onClick={clickHandler}>
				<CardMedia
					component="img"
					height="250"
					image={images ? images[0] : ""}
					alt={title}
					sx={{ objectFit: "contain", p: 1 }}
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						sx={{
							textOverflow: "ellipsis",
							overflow: "hidden",
							display: "-webkit-box",
							WebkitLineClamp: "1",
							WebkitBoxOrient: "vertical",
						}}
					>
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Price: {price}$
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Category: {category?.name}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Divider />
			<CardActions sx={{ justifyContent: "space-between" }}>
				<Button size="small" color="error" onClick={deleteHandler}>
					Delete
				</Button>
				<Button size="small" color="primary" onClick={clickHandler}>
					BUY
				</Button>
			</CardActions>
		</Card>
	);
}
