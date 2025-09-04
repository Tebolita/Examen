type dataFilterOptions = {
    value: string;
    label: string;
};

interface FilterProps {
    styleDiv?: string;
    styleSelect?: string;
    dataFilter?: dataFilterOptions[];
}


function Filter({ styleDiv = "", styleSelect = "", dataFilter = [] }: FilterProps) {
    return (
        <div className={`position-relative ${styleDiv}`}>
            <select className={`form-select ${styleSelect}`} aria-label="Default select example">
                <option selected>Selecciona un filtro</option>
                {dataFilter.map((filter, index) => (
                    <option key={index} value={filter?.value}>{filter?.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Filter