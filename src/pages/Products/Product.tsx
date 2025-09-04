import  FilterSearch  from "../../components/ui/FilterSearch"
import Filter from '../../components/ui/Filter'
import Table from '../../components/ui/Table'
import '../../styles/Components.css'

function Product() {
    const dataFilter = [
        { value: 'price-asc', label: 'Precio: de menor a mayor' },
        { value: 'price-desc', label: 'Precio: de mayor a menor' },
        { value: 'name-asc', label: 'Nombre: A a Z' },
        { value: 'name-desc', label: 'Nombre: Z a A' },
    ];

    const headTitleTable = [
        { key: 'id', value: 'ID' },
        { key: 'nombre', value: 'Nombre' },
        { key: 'apellido', value: 'Apellido' },
        { key: 'Operaciones', value: 'Operaciones' },
    ];

    const dataTitleTable = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez',  Operaciones: <div ><div className="btn btn-primary m-1">Editar</div><div className="btn btn-danger">Eliminar</div></div>  },
        { id: 2, nombre: 'Ana', apellido: 'García',  Operaciones: <div ><div className="btn btn-primary m-1">Editar</div><div className="btn btn-danger">Eliminar</div></div>  },
    ];

  return (
    <>
        <div className="container pt-4">
            <div className="card text-center">
                <div className="card-header bg-dark">
                    <nav className="navbar ">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <FilterSearch styleInput="bg-dark text-white placeholder-gris border border-secondary" styleDiv="w-100" />
                            <Filter styleSelect="text-start bg-dark text-white placeholder-gris border border-secondary" styleDiv="mt-2" dataFilter={dataFilter} />
                        </div>
                    </nav>
                </div>
                <div className="card-body navbar-dark ">
                    <Table styleDiv="table-responsive" styleTablet=" table-hover" headTitleTable={headTitleTable} dataTitleTable={dataTitleTable} />
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>
        </div>
    </>
  )
}

export default Product