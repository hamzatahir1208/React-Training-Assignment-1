import { USER_COLUMNS } from "../constants/columns";

export default function Table({
  data = [],
  handleDelete,
  deletingId = null,
  columns = USER_COLUMNS,
  sortBy,
  sortOrder = "asc",
  onSort,
  currentPage = 1,
  totalPages = 1,
  hasPrevPage = false,
  hasNextPage = false,
  onPageChange,
  loading = false,
}) {
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === safePage) return;
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const onDeleteClick = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${user.firstName} ${user.lastName}" (ID: ${user.id})?`
    );
    if (confirmed && handleDelete) {
      handleDelete(user.id);
    }
  };

  // Generate page numbers with windowing for clean pagination
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (safePage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  return (
    <>
      <div className="table-responsive position-relative">
        {loading && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center loading-overlay"
          >
            <div className="d-flex align-items-center gap-2 text-light bg-dark px-3 py-2 rounded-3 shadow">
              <div
                className="spinner-border spinner-border-sm text-info"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Fetching users...</span>
            </div>
          </div>
        )}

        <table className="table table-dark table-hover custom-table mb-0">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sortBy === col.sortKey;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    style={{
                      cursor: col.sortable ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (col.sortable && onSort) {
                        onSort(col.sortKey);
                      }
                    }}
                  >
                    <span className="d-inline-flex align-items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        isSorted ? (
                          sortOrder === "desc" ? (
                            <i
                              className="bi bi-arrow-down text-light"
                              aria-label="sorted descending"
                            ></i>
                          ) : (
                            <i
                              className="bi bi-arrow-up text-light"
                              aria-label="sorted ascending"
                            ></i>
                          )
                        ) : (
                          <i
                            className="bi bi-arrow-down-up text-secondary opacity-50 fs-6"
                            aria-label="sortable"
                          ></i>
                        )
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user) => {
                const isRowDeleting = deletingId === user.id;
                return (
                  <tr key={user.id}>
                    <td scope="row">{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        type="button"
                        className="btn text-light btn-small"
                        onClick={() => onDeleteClick(user)}
                        disabled={isRowDeleting}
                        aria-label={`Delete ${user.firstName} ${user.lastName}`}
                        title="Delete User"
                      >
                        {isRowDeleting ? (
                          <span
                            className="spinner-border spinner-border-sm text-danger"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <i className="bi bi-x-circle text-danger fs-5"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  {loading ? "Loading..." : "No results found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${!hasPrevPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(safePage - 1)}
              disabled={!hasPrevPage || loading}
            >
              Previous
            </button>
          </li>

          {getPageNumbers().map((pageItem, index) => {
            if (pageItem === "...") {
              return (
                <li key={`ellipsis-${index}`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            }
            return (
              <li
                key={pageItem}
                className={`page-item ${safePage === pageItem ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(pageItem)}
                  disabled={loading}
                >
                  {pageItem}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${!hasNextPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(safePage + 1)}
              disabled={!hasNextPage || loading}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
