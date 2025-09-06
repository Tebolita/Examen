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
import { jsPDF } from 'jspdf'
import  {  autoTable  }  from  'jspdf-autotable'
import html2canvas from "html2canvas";
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



    const [showModal, setShowModal] = useState(false);
    const [idProduct, setIdProduct] = useState(0);
    const [updateProductState, setUpdateProductState] = useState(false);
    const [deleteProductState, setDeleteProductState] = useState(false);

    const { 
        products, loading, error,  oneProduct,
        addProduct, setOneProduct, updateProduct, deleteProduct
    } = useProducts(search, filter, order, idProduct);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5;

    const totalPages = Math.ceil(products.length / perPage);
    const displayedProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleShowModal = () => {
        setUpdateProductState(false);
        setDeleteProductState(false);
        setShowModal(!showModal)
        setOneProduct(undefined); //Quitamos el producto para dejar limpio el formulario
        setIdProduct(0)
    }

    const hadleCrud = (id: number, type: string) => {
        switch (type) {
            case "show":
                setUpdateProductState(false);
                setDeleteProductState(false);
                break;
            case "update":
                setUpdateProductState(true);
                setDeleteProductState(false);
                break;
            case "delete":
                setUpdateProductState(false);
                setDeleteProductState(true);
                break;                
            default:
                break;
        }
        setIdProduct(id);
        setShowModal(!showModal);
    } 

    const handleProduct = async (data: Product) => {
        if (updateProductState){
            await updateProduct(data);
            setShowModal(false);
            showAlert("Se actulizo el producto de manera correcta", "success")
        }else if(deleteProductState){
            await deleteProduct(idProduct);
            setShowModal(false);
            showAlert("El producto ha sido eliminado correctamente", "success")
        }else{
            await addProduct(data);
            setShowModal(false);
            showAlert("Se registro el producto de manera correcta", "success")
        }

    };

    const exportarPDF = () => {
        const doc = new jsPDF();

        autoTable(doc, {
            html: "#Data",
            columns: [{header: 'ID', dataKey: 'id'}, 
                {header: 'Nombre', dataKey: 'nombre'},
                {header: 'Descripción', dataKey: 'descripcion'},
                {header: 'Precio', dataKey: 'precio'},
                {header: 'Cantidad', dataKey: 'cantidad'},]
        });

        doc.save(`Reporte ${new Date(Date.now()).toUTCString()}.pdf`);
    };


    const exportarPDFImage = async () => {
        const element = document.getElementById("Data");

        // Ocultar columna
        const cols = element?.querySelectorAll("tr > *:nth-child(7)");
        cols?.forEach(col => col.style.display = "none");

        const doc = new jsPDF();
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save(`Reporte ${new Date(Date.now()).toUTCString()}.pdf`);

        // Restaurar columnas visibles
        cols?.forEach(col => col.style.display = "");
    };

    

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

  return (
    <>
         
        {/* Modal para mostrar el formulario */}
        <Modal show={showModal} 
        onClose={() => setShowModal(false)} 
        title={
            updateProductState ? "Actualizar Producto" :
            deleteProductState ? "Eliminar Producto" :
            !updateProductState && !deleteProductState ? "Ver producto" :
            "Agregar Producto"
        } >
            {<ProductForm 
                onSubmit={handleProduct}
                productData={oneProduct ?? undefined}
                upProduct={updateProductState}
                delProduct={deleteProductState}
            />}
        </Modal>

        <div className="container pt-4">
            <div className="card text-center">
                <div className="card-header bg-dark">
                    <nav className="navbar ">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <FilterSearch styleInput="bg-dark text-white placeholder-gris border border-secondary" styleDiv="w-100" onPageChange={setSearch} />
                            <Filter styleSelect="text-start bg-dark text-white placeholder-gris border border-secondary" styleDiv="mt-2" dataFilter={dataFilter} onselectionchange={setChangeFilter} />
                            <div className="btn btn-success ms-2 mt-2" onClick={handleShowModal} >Agregar Producto</div>
                            <div className="btn btn-primary ms-2 mt-2" onClick={exportarPDF} >Exportar a PDF/Texto</div>
                            <div className="btn btn-warning ms-2 mt-2" onClick={exportarPDFImage} >Exportar a PDF/Imagen</div>
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
                    <Table 
                        styleDiv="table-responsive" 
                        styleTablet="table-hover" 
                        headTitleTable={headTitleTable} 
                        dataTitleTable={displayedProducts}
                        buttonPer={(product) => (
                            <div>
                                <button className="btn btn-success m-1" onClick={() => hadleCrud(product.id, "show")}>Mostrar</button>
                                <button className="btn btn-primary m-1" onClick={() => hadleCrud(product.id, "update")}>Actualizar</button>
                                <button className="btn btn-danger m-1" onClick={() => hadleCrud(product.id, "delete")}>Eliminar</button>
                            </div>
                        )}
                    />
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