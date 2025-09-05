import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../types/product";

interface Props {
    onSubmit: (data: Product) => void;
}

const ProductFrom: React.FC<Props> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Product>();

    const [preView, setPreView] = useState('')

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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="row g-2">
                <div className="col-md">
                    <div className="form-floating">
                        <img 
                        src={preView ? preView : "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg"}
                        className="w-100 h-100" />
                    </div>
                </div>

                <div className="col-md d-flex justify-content-center align-items-center ">
                    <div className="mb-3">
                        <label className="mb-3 text-black" ><i className="bi bi-image"></i> Registrar Imagen</label>
                        <input 
                            className="form-control form-control-sm" 
                            type="file"
                            accept="image/*"   
                            required                              
                            onChange={previewFile}
                        />
                        {errors.imagen && <span className="text-danger">{errors.imagen.message}</span>}
                    </div>
                </div>

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
                />
                  <label >Ingresa el nombre del producto</label>
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
                />
                  <label >Ingresa la descripción del producto</label>
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
                />
                <label >Ingresa el precio del producto</label>
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
                        value: 0,
                        min: { value: 0, message: "la cantidad debe ser mayor o igual a 0" }

                    })}
                />
                <label >Ingresa la cantidad del producto</label>
                {errors.cantidad && <span className="text-danger">{errors.cantidad.message}</span>}
            </div> 

            <button type="submit" className="btn btn-primary w-100">Crear Producto</button>
        </form>
    );
};

export default ProductFrom;