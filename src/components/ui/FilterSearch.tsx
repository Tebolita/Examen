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
                <i className="bi bi-search" color="white"></i>
            </span>
        </div>
    );
}

export default FilterSearch