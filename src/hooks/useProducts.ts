import { useQuery } from "react-query";
import { ProductService } from "../services";

export const useProducts = () => {
  const {
    isLoading,
    data: response,
    refetch: refetchProducts,
    isFetching
  } = useQuery("product list", () => ProductService.getAll(), {
    onError: (error: any) => {
      alert(error.message);
    }
  });

  return { isLoading, response, refetchProducts, isFetching };
};
