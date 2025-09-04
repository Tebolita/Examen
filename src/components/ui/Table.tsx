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
                                <td key={colIndex}>{data[title.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;