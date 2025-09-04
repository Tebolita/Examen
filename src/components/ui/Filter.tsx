type dataFilterOptions = {
    value: string;
    label: string;
};

interface FilterProps {
    styleDiv?: string;
    styleSelect?: string;
    dataFilter?: dataFilterOptions[];
    onselectionchange: (value: string) => void;
}


function Filter({ styleDiv = "", styleSelect = "", dataFilter = [], onselectionchange }: FilterProps) {
    return (
        <div className={`position-relative ${styleDiv}`}>
            <select className={`form-select ${styleSelect}`} aria-label="Default select example" onChange={e => onselectionchange(e.target.value)}>
                <option selected>Selecciona un filtro</option>
                {dataFilter.map((filter, index) => (
                    <option key={index} value={filter?.value}>{filter?.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Filter