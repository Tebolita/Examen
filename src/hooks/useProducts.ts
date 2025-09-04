import { useEffect, useState, useCallback, useMemo } from "react";
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

    const totalStock = useMemo(
        () => products.reduce((acc, p) => acc + p.cantidad, 0),
        [products]
    );

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, loading, error, totalStock, loadProducts, setProducts };
}
