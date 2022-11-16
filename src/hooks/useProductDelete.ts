import { useMutation } from "react-query";
import { ProductService } from "../services";

export const useProductDelete = (id: string | undefined) => {
  const deleteProduct = useMutation(() => ProductService.delete(String(id)));

  return { deleteProduct };
};
