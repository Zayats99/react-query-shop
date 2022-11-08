import { useNavigate } from "react-router-dom";

import { Button, CardActionArea, CardActions, Card, CardMedia, Typography, CardContent, Divider } from "@mui/material";
import { IProduct } from "../../services/product.service";

export function ProductCard({ id, title, price, category, images }: Partial<IProduct>) {
	const navigate = useNavigate();

	function clickHandler() {
		navigate(`/product/${id}`);
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
						Price: {price}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Category: {category?.name}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Divider />
			<CardActions>
				<Button size="small" color="primary" onClick={clickHandler}>
					BUY
				</Button>
			</CardActions>
		</Card>
	);
}
