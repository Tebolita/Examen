import  FilterSearch  from "../../components/ui/FilterSearch"
import Filter from '../../components/ui/Filter'
import Table from '../../components/ui/Table'
import Modal from "../../components/ui/Modal"
import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductForm from './ProductForm';
import Pagination from '../../components/Pagination/Pagination';
import { Product } from "../../types/product"
import showAlert from "../../utils/showAlert"
import '../../styles/Components.css'


const Products: React.FC = () => {

    const [search, setSearch] = useState('');
    const [changeFilter, setChangeFilter] = useState('');
    const [filter, setFilter] = useState('');
    const [order, setOrder] = useState('');



    const dataFilter = [
        { value: 'precio-asc', label: 'Precio: de menor a mayor' },
        { value: 'precio-desc', label: 'Precio: de mayor a menor' },
        { value: 'nombre-asc', label: 'Nombre: A a Z' },
        { value: 'nombre-desc', label: 'Nombre: Z a A' },
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

    const { products, loading, error, addProduct } = useProducts(search, filter, order);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(products.length / perPage);
    const displayedProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal)
    }
    
    useEffect(() => {
        if (error) {
            showAlert(error, "error");
        }
    }, [error]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        if (changeFilter) {
            const [newFilter, newOrder] = changeFilter.split('-');
            setFilter(newFilter);
            setOrder(newOrder);
        }
    }, [changeFilter]);
    
    const handleAddProduct = async (data: Product) => {
        await addProduct(data);
        setShowModal(false);
        showAlert("Se registro el producto de manera correcta", "success")
    };


  return (
    <>
         
        {/* {error && <p className="text-danger" >{error}</p>} */}
        <Modal show={showModal} onClose={() => setShowModal(false)} title="Agregar Productos" >
            {<ProductForm onSubmit={handleAddProduct}/>}
        </Modal>
        <div className="container pt-4">
            <div className="card text-center">
                <div className="card-header bg-dark">
                    <nav className="navbar ">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <FilterSearch styleInput="bg-dark text-white placeholder-gris border border-secondary" styleDiv="w-100" onPageChange={setSearch} />
                            <Filter styleSelect="text-start bg-dark text-white placeholder-gris border border-secondary" styleDiv="mt-2" dataFilter={dataFilter} onselectionchange={setChangeFilter} />
                            <div className="btn btn-success ms-2 mt-2" onClick={handleShowModal} >Agregar Producto</div>
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