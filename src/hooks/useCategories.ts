import { useQuery } from "react-query";
import { CategoryService, ICategory } from "../services";

export const useCategories = () => {
	const { isLoading, data: categories } = useQuery("categories list", () => CategoryService.getAll(), {
		onError: (error: any) => {
			alert(error.message);
		},
		select: ({ data }): ICategory[] => data,
	});

	return { isLoading, categories };
};
