import { useState } from "react";

export default function Table({ data, handelDelete }) {

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;

    const currentData = data.slice(
        startIndex,
        startIndex + rowsPerPage
    );

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
                    {currentData.map((user) => (
                        <tr key={user.id}>
                            <td scope="row">{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button type="button" className="btn text-light btn-small" onClick={() => handelDelete(user.id)} >
                                    <i className="bi bi-x-circle"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination justify-content-center">

                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
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
                            onClick={() => setCurrentPage(index + 1)}
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
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>

            </ul>
        </>
    );
}