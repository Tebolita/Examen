import { FaSearch } from "react-icons/fa";


function FilterSearch({ styleDiv = "", styleInput = "", onPageChange }: { styleDiv?: string; styleInput?: string; onPageChange: (value: string) => void }) {
    return (
        <div className={`position-relative ${styleDiv}`}>
            <input
                className={`form-control rounded-pill pe-5 ${styleInput}`}
                type="search"
                placeholder="Buscar"
                name="search"
                id="searchInput"
                onChange={e => onPageChange(e.target.value)}
            />
            <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                style={{ pointerEvents: "none" }}
            >
                <FaSearch size={20} color="#6c757d" />
            </span>
        </div>
    );
}

export default FilterSearch