import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Previous
                    </button>
                </li>


                {[...Array(totalPages)].map((_, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onPageChange(index + 1)}
                            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1
                                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                    : "text-gray-500 bg-white"
                                }`}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
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
