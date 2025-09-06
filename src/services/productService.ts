import { Product } from "../types/product";


const API_URL = 'http://localhost:3001/products';

export const productService = {
    async getProducts(search?: string, filter?: string, order?: string): Promise<Product[]> {
        const res = await fetch(
            `${API_URL}?${search ? `q=${search}&` : ''}${filter ? `_sort=${filter}` : ''}${order ? `&_order=${order}` : ''}`);
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
    },

    async addProduct(product: Product): Promise<Product> {
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
        }); 
        if (!res.ok) throw new Error('Error al agregar producto');
        return res.json();
    },

    async getProductsId(id: number): Promise<Product[]> {
        const res = await fetch(`${API_URL}/${id}`);   
        if (!res.ok) throw new Error('Error al obtener el producto');
        return res.json();
    },

    async deleteProduct(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar producto');
    },

    async updateProduct(product: Product): Promise<Product> {
        const res = await fetch(`${API_URL}/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Error al agregar producto');
        return res.json();
    },


};