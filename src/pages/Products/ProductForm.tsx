import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../types/product";

interface Props {
    onSubmit: (data: Product) => void;
    productData?: Product
    upProduct?: boolean
    delProduct?:boolean
}

const ProductFrom: React.FC<Props> = ({ onSubmit, productData, upProduct, delProduct }) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Product>();

    const [preView, setPreView] = useState("plac")

    const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreView(reader.result as string);
            setValue("imagen", reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    //Resetear el formulario
    useEffect(() => {
    if (productData) {
        reset(productData);
        setPreView(productData.imagen || "");
    } else {
        reset({
        nombre: "",
        descripcion: "",
        precio: undefined,
        cantidad: undefined,
        imagen: ""
        });
        setPreView("");
    }
    }, [productData, reset]);  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="row g-2">
                <div className="col-md">
                    <div className="form-floating">
                        <img 
                        src={
                            productData?.imagen
                            ? productData.imagen
                            : preView || "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg"
                        }
                        className="w-50 h-50" 
                        />
                    </div>
                </div>

                {productData && !upProduct ? null : 
                    <div className="col-md d-flex justify-content-center align-items-center ">
                        <div className="mb-3">
                            <label className="mb-3 text-black" ><i className="bi bi-image"></i>
                            {upProduct ? " Actualizar imagen" : " Registrar Imagen"} </label>
                            <input 
                                className="form-control form-control-sm" 
                                type="file"
                                accept="image/*"   
                                required={upProduct ? false : true}
                                onChange={previewFile}
                            />
                            {errors.imagen && <span className="text-danger">{errors.imagen.message}</span>}
                        </div>
                    </div>
                }
            </div>

            <div className="form-floating mb-1">   
                <input
                    type="text"
                    className="form-control mb-2 mt-2"
                    placeholder="Nombre"
                    {...register("nombre", { 
                        required: "El nombre es obligatorio", 
                        minLength: {value: 3, message:"El minimo de caracteres es de 3"},
                        maxLength: {value: 80, message: "El máximo de caracteres es de 80"},
                    })}
                    defaultValue={productData && productData.nombre }
                    disabled = {productData && !upProduct || productData && !upProduct  ? true : false}
                />
                  <label >{productData?.nombre ? "nombre" : "Ingresa el nombre del producto"}</label>
                {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
            </div>

            <div className="form-floating mb-1">   
                <input
                    type="text"
                    className="form-control mb-2 mt-2"
                    placeholder="Descripcion"
                    {...register("descripcion", { 
                        maxLength: {value: 500, message: "El máximo de caracteres es de 500"},
                    })}
                    defaultValue={productData && productData.descripcion }
                    disabled = {productData && !upProduct || productData && !upProduct  ? true : false}                    
                />
                <label >{productData?.descripcion ? "descripcion" : "Ingresa la descripción del producto"}</label>
                {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
            </div>


            <div className="form-floating mb-1">   
                <input
                    type="number"
                    className="form-control mb-2 mt-2"
                    placeholder="Precio"
                    {...register("precio", { 
                        required: "El precio es obligatorio", 
                        valueAsNumber: true,
                        min: { value: 1, message: "El precio debe ser mayor o igual a 1" }
                    })}
                    defaultValue={productData && productData.precio }
                    disabled = {productData && !upProduct || productData && !upProduct  ? true : false}                       
                />
                <label >{productData?.precio ? "precio" : "Ingresa el precio del producto"}</label>
                {errors.precio && <span className="text-danger">{errors.precio.message}</span>}
            </div>  

            <div className="form-floating mb-1">   
                <input
                    type="number"
                    className="form-control mb-2 mt-2"
                    placeholder="Cantidad"
                    {...register("cantidad", { 
                        required: "El precio es obligatorio", 
                        valueAsNumber: true,
                        min: { value: 0, message: "la cantidad debe ser mayor o igual a 0" }
                    })}
                    defaultValue={productData && productData.cantidad }
                    disabled = {productData && !upProduct || productData && !upProduct  ? true : false}                       
                />
                <label >{productData?.cantidad ? "Cantidad" : "Ingresa la cantidad del producto"}</label>
                {errors.cantidad && <span className="text-danger">{errors.cantidad.message}</span>}
            </div> 
            
            {(upProduct || delProduct || (!productData && !upProduct && !delProduct)) && (
                <button type="submit" className={`btn ${upProduct ? "btn-primary" : delProduct ? "btn-danger" : "btn-success"} w-100`}>
                    {upProduct ? "Actualizar Producto"
                    : delProduct ? "Eliminar producto"
                    : "Crear Producto"}
                </button>
            )}
            
        </form> 
    );
};

export default ProductFrom;