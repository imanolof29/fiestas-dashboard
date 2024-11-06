import axios from "axios";
import { CategoryDto } from "../types/category";

export async function listCategories(): Promise<CategoryDto[]> {
    try {
        const response = await axios.get<CategoryDto[]>("http://192.168.68.110:3000/categories/find")
        return response.data
    } catch (e) {
        throw e
    }
}