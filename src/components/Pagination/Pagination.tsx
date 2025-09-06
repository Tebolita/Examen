import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <button 
                className="btn btn-primary me-2"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {'<'}
            </button>
            <span className="align-self-center">Página {currentPage} de {totalPages}</span>
            <button
                className="btn btn-primary ms-2"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'>'}
            </button>
        </div>
    )
};

export default Pagination;