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
	images: string[];
}

export const ProductService = {
	async getAll() {
		return axios.get<IProduct[]>("/products?limit=10&offset=1");
	},
	async getById(id:string) {
		return axios.get<IProduct>(`/products/${id}`);
	},
};
