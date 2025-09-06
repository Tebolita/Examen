import { useEffect, useState, useCallback } from "react";
import { productService } from "../services/productService";
import { Product } from "../types/product";

export function useProducts(searchTerm?: string, filter?: string, order?: string, id?: number) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [oneProduct, setOneProduct] = useState<Product | undefined>(undefined);

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

    const getOneProduct = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (id != 0){
                const data = await productService.getProductsId(id ? id : 0);
                setOneProduct(Array.isArray(data) ? data[0] : data);
            }else{
                setOneProduct(undefined);
            }
        } catch (err) {
            setError(`Error al cargar el producto: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateProduct = async (data: Product) => {
        try {
            await productService.updateProduct(data);
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await productService.deleteProduct(id);
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        if (id) {
            getOneProduct();
        }
    }, [id, getOneProduct]);    

    return { products, oneProduct, loading, error, loadProducts, addProduct, setProducts, getOneProduct, setOneProduct, updateProduct, deleteProduct };
}
