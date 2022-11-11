import { useMutation } from "react-query";
import { IProductUpdateData, ProductService } from "../services";

export const useProductUpdate = (id:string | undefined) => {
	const updateProduct = useMutation((data:IProductUpdateData) => ProductService.update(String(id), data));

	return { updateProduct };
};
