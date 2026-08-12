import { useState, useMemo, useEffect } from "react";

export default function Table({ data, handleDelete, searchTerm, sortField, sortOrder }) {

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;

    const processedData = useMemo(() => {
        let result = [...data];

        if (searchTerm.trim()) {
            result = result.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        result.sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];

            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) {
                return sortOrder === "asc" ? -1 : 1;
            }

            if (valueA > valueB) {
                return sortOrder === "asc" ? 1 : -1;
            }

            return 0;
        });

        return result;
    }, [data, searchTerm, sortField, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(processedData.length / rowsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * rowsPerPage;

    const currentData = processedData.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <table className="table table-dark table-hover custom-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((user) => (
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button type="button" className="btn text-light btn-small" onClick={() => handleDelete(user.id)} >
                                        <i className="bi bi-x-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No results found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className="pagination justify-content-center">

                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                            }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => goToPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}

                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                        }`}
                >
                    <button
                        className="page-link"
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>

            </ul>
        </>
    );
}