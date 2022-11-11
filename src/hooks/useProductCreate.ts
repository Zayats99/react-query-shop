import { useMutation } from "react-query";
import { IProductUpdateData, ProductService } from "../services";

export const useProductCreate = () => {
	const createProduct = useMutation((data: IProductUpdateData) => ProductService.create(data));

	return { createProduct };
};
