import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

axios.defaults.baseURL = API_URL;

export interface ICategory {
	id: number;
	name: string;
	image: string;
}

export const CategoryService = {
	async getAll() {
		return axios.get<ICategory[]>("/categories?limit=0");
	},
	async getById(id: string) {
		return axios.get<ICategory>(`/categories/${id}`);
	},
};
