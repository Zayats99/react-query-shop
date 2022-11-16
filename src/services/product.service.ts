import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

axios.defaults.baseURL = API_URL;

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[] | string;
}

export interface IProductUpdateData {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const ProductService = {
  async getAll() {
    return axios.get<IProduct[]>("/products");
  },
  async getById(id: string) {
    return axios.get<IProduct>(`/products/${id}`);
  },
  async update(id: string, data: IProductUpdateData) {
    return axios.put(`/products/${id}`, data);
  },
  async create(data: IProductUpdateData) {
    return axios.post(`/products`, data);
  },
  async delete(id: string) {
    return axios.delete(`/products/${id}`);
  }
};
