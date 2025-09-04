import { Product } from "../types/product";


const API_URL = 'http://localhost:3001/products';

export const productService = {
    async getProducts(search?: string, filter?: string, order?: string): Promise<Product[]> {
        const res = await fetch(search ? 
            `${API_URL}${search ? `?q=${search}` : ''}${filter ? `&_sort=${filter}` : ''}${order ? `&_order=${order}` : ''}` 
            : API_URL);
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
    },

    async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Error al agregar producto');
        return res.json();
    },

    async deleteProduct(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar producto');
    }   
};