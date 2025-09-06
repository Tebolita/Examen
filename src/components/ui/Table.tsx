import React from "react";

type HeadTitleTable = {
    key: string;    
    value: string; 
};

interface TableProps {
    styleDiv?: string;
    styleTablet?: string;
    headTitleTable?: HeadTitleTable[];
    dataTitleTable?: Record<string, any>[];
    buttonPer?: ((data: Record<string, any>) => React.ReactNode) | React.ReactNode;
}

function Table({ styleDiv = "", styleTablet = "", headTitleTable = [], dataTitleTable = [], buttonPer  }: TableProps) {
    return (
        <div className={`position-relative ${styleDiv}`} >
            <table className={`table ${styleTablet}`} id="Data">
                <thead>
                    <tr>
                        {headTitleTable.map((title, index) => (
                            <th key={index} scope="col" className={title.key === "descripcion" ? "d-none d-md-table-cell" : title.key === "id" ? "d-none d-md-table-cell" : ""}>
                                {title.value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTitleTable.map((data, rowIndex) => (
                        <tr key={rowIndex}>
                            {headTitleTable.map((title, colIndex) => (
                                <td key={colIndex} className={title.key === "descripcion" ? "d-none d-md-table-cell w-25" : title.key === "id" ? "d-none d-md-table-cell" : ""} >
                                    {(() => {
                                        switch (title.key) {
                                            case "operaciones":
                                                return typeof buttonPer === "function" ? buttonPer(data) : buttonPer;
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
            {dataTitleTable.length == 0 && 
                <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center">No hay datos</p>
                </div>
            }
        </div>
    );
}

export default Table;