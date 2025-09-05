import { useEffect, useState, useCallback } from "react";
import { productService } from "../services/productService";
import { Product } from "../types/product";

export function useProducts(searchTerm?: string, filter?: string, order?: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts(searchTerm, filter, order);
            setProducts(data);

        } catch (err) {
            setError(`Error al cargar los productos: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, filter, order]);

    const addProduct = async (data: Product) => {
        try {
            const newProduct = await productService.addProduct(data);
            setProducts((prev) => [...prev, newProduct]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, loading, error, loadProducts, addProduct, setProducts };
}
