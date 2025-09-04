type HeadTitleTable = {
    key: string;    
    value: string; 
};

interface TableProps {
    styleDiv?: string;
    styleTablet?: string;
    headTitleTable?: HeadTitleTable[];
    dataTitleTable?: Record<string, any>[];
}

function Table({ styleDiv = "", styleTablet = "", headTitleTable = [], dataTitleTable = [] }: TableProps) {
    return (
        <div className={`position-relative ${styleDiv}`}>
            <table className={`table ${styleTablet}`}>
                <thead>
                    <tr>
                        {headTitleTable.map((title, index) => (
                            <th key={index} scope="col">{title.value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTitleTable.map((data, rowIndex) => (
                        <tr key={rowIndex}>
                            {headTitleTable.map((title, colIndex) => (
                                <td key={colIndex} className={title.key === "descripcion" ? "w-25" : ""} >
                                    {(() => {
                                        switch (title.key) {
                                            case "operaciones":
                                                return (
                                                    <div>
                                                        <div className="btn btn-primary m-1">Editar</div>
                                                        <div className="btn btn-danger m-1">Eliminar</div>
                                                    </div>
                                                );
                                            case "imagen":
                                                return (
                                                    <img
                                                        src={data[title.key]}
                                                        alt={data['nombre']}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        role="button"
                                                    />
                                                );
                                            default:
                                                return data[title.key];
                                        }
                                    })()}
                                </td>
                                
                            ))}                  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;