import { Table as BootstrapTable } from "react-bootstrap";
import { USER_COLUMNS } from "../constants/columns";
import UserTableRow from "./UserTableRow";
import TablePagination from "./TablePagination";

export default function Table({
  data = [],
  handleDelete,
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
  return (
    <>
      <div className="table-responsive position-relative">
        {loading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center loading-overlay">
            <div className="d-flex align-items-center gap-2 text-light bg-dark px-3 py-2 rounded-3 shadow">
              <div className="spinner-border spinner-border-sm text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Loading ...</span>
            </div>
          </div>
        )}

        <BootstrapTable dark hover className={`custom-table mb-0 ${loading ? "opacity-50 table-loading" : ""}`}>
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sortBy === col.sortKey;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={col.sortable ? "cursor-pointer" : "cursor-default"}
                    onClick={() => {
                      if (col.sortable && onSort) {
                        onSort(col.sortKey);
                      }
                    }}
                  >
                    <span className="d-inline-flex align-items-center gap-1">
                      {col.label}
                      {col.sortable &&
                        (isSorted ? (
                          sortOrder === "desc" ? (
                            <i className="bi bi-arrow-down text-light" aria-label="sorted descending"></i>
                          ) : (
                            <i className="bi bi-arrow-up text-light" aria-label="sorted ascending"></i>
                          )
                        ) : (
                          <i className="bi bi-arrow-down-up text-secondary opacity-50 fs-6" aria-label="sortable"></i>
                        ))}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user) => (
                <UserTableRow key={user.id} user={user} onDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  {loading ? "Loading..." : "No results found"}
                </td>
              </tr>
            )}
          </tbody>
        </BootstrapTable>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        onPageChange={onPageChange}
        disabled={loading}
      />
    </>
  );
}
