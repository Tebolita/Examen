import React from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../types/product";


interface Props {
    onSubmit: (data: Product) => void;
}

const ProductFrom: React.FC<Props> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <input
                className="form-control mb-2"
                placeholder="Nombre del producto"
                {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}

            <input
                type="number"
                className="form-control mb-2"
                placeholder="Precio"
                {...register("precio", { 
                    required: "El precio es obligatorio", 
                    valueAsNumber: true,
                    min: { value: 0, message: "El precio debe ser mayor o igual a 0" }
                })}
            />
            {errors.precio && <span className="text-danger">{errors.precio.message}</span>}

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese la descripcion"
                {...register("descripcion", { required: "la descripcion es obligatoria" })}
            />
            {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}

            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    );
};

export default ProductFrom;