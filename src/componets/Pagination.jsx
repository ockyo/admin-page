import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const maxVisiblePages = 5;
   
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"

                    >
                        Previous
                    </button>
                </li>
                {startPage > 1 && <span className="px-3 py-2">...</span>}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === page ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : "text-gray-500 bg-white"}`}
                        onClick={() => onPageChange(page)}

                    >
                        {page}
                    </button>
                ))}
                {endPage < totalPages && <span className="px-3 py-2">...</span>}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </li>

            </ul>
        </nav>
    );
};

export default Pagination;
