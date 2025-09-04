import  FilterSearch  from "../../components/ui/FilterSearch"
import Filter from '../../components/ui/Filter'
import Table from '../../components/ui/Table'
import '../../styles/Components.css'


import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
// import ProductForm from './ProductForm';
import Pagination from '../../components/Pagination/Pagination';
// import { Product } from '../../types/product';

const Products: React.FC = () => {

    const [search, setSearch] = useState('');
    const [changeFilter, setChangeFilter] = useState('');
    const [filter, setFilter] = useState('');
    const [order, setOrder] = useState('');


    const dataFilter = [
        { value: 'precio-asc', label: 'Precio: de menor a mayor' },
        { value: 'precio-desc', label: 'Precio: de mayor a menor' },
        { value: 'name-asc', label: 'Nombre: A a Z' },
        { value: 'name-desc', label: 'Nombre: Z a A' },
    ];

    const headTitleTable =  [
        { key: 'id', value: 'ID' },
        { key: 'nombre', value: 'Nombre' },
        { key: 'descripcion', value: 'Descripción' },
        { key: 'precio', value: 'Precio' },
        { key: 'cantidad', value: 'Cantidad' },
        { key: 'imagen', value: 'Imagen' },
        { key: 'operaciones', value: 'Operaciones' },
    ];

    const { products, loading, error } = useProducts(search, filter, order);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(products.length / perPage);
    const displayedProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        setFilter(changeFilter.split('-')[0]);
        setOrder(changeFilter.split('-')[1]);
        console.log(filter, order);
    }, [changeFilter]);
    
    // const handleAddProduct = (data: Product) => {
    //     setProducts((prev) => [...prev, { ...data, id: Date.now() }]);
    // }


  return (
    <>
        {error && <p className="text-danger">{error}</p>}
        <div className="container pt-4">
            <div className="card text-center">
                <div className="card-header bg-dark">
                    <nav className="navbar ">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <FilterSearch styleInput="bg-dark text-white placeholder-gris border border-secondary" styleDiv="w-100" onPageChange={setSearch} />
                            <Filter styleSelect="text-start bg-dark text-white placeholder-gris border border-secondary" styleDiv="mt-2" dataFilter={dataFilter} onselectionchange={setChangeFilter} />
                            <div className="btn btn-success ms-2 mt-2" >Agregar Producto</div>
                            <div className="btn btn-primary ms-2 mt-2" >Exportar a pdf</div>
                        </div>
                    </nav>
                </div>
                <div className="card-body navbar-dark ">
                    {loading
                    ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> 
                    : 
                        <Table styleDiv="table-responsive" styleTablet=" table-hover" headTitleTable={headTitleTable} dataTitleTable={displayedProducts} /> 
                    }  
                </div>
                <div className="card-footer text-muted">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    /> 
                </div>
            </div>
        </div>
    </>
  )
}

export default Products;