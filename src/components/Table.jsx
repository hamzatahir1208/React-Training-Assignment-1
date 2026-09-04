import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "react-bootstrap";
import UserRowActions from "./UserRowActions";
import "../styles/Table.css";

export default function Table({
  data = [],
  handleDelete,
  totalRows = 0,
  page = 1,
  limit = 10,
  sortBy,
  order = "asc",
  onSortChange,
  onPageChange,
  onLimitChange,
  resetPaginationToggle,
  loading = false,
}) {
  const columns = useMemo(
    () => [
      { id: "id", name: "#", selector: (row) => row.id, sortable: true },
      { id: "firstName", name: "First Name", selector: (row) => row.firstName, sortable: true },
      { id: "lastName", name: "Last Name", selector: (row) => row.lastName, sortable: true },
      { id: "age", name: "Age", selector: (row) => row.age, sortable: true },
      { id: "email", name: "Email", selector: (row) => row.email, sortable: true },
      { id: "role", name: "Role", selector: (row) => row.role, sortable: true },
      {
        id: "actions",
        name: "Action",
        cell: (row) => <UserRowActions user={row} onDelete={handleDelete} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        sortable: false,
      },
    ],
    []
  );

  const handleSort = (column, sortDirection) => {
    if (!column.sortable) return;
    onSortChange(column.id, sortDirection);
  };

  return (
    <DataTable
      className="user-data-table"
      colorMode="dark"
      columns={columns}
      data={data}
      keyField="id"
      highlightOnHover
      responsive
      progressPending={loading}
      progressComponent={
        <div className="d-flex align-items-center gap-2 text-light py-4">
          <Spinner animation="border" size="sm" variant="info" />
          <span>Loading...</span>
        </div>
      }
      noDataComponent={<div className="text-center py-4 text-light">No results found</div>}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationDefaultPage={page}
      paginationPerPage={limit}
      paginationRowsPerPageOptions={[5, 10, 25, 50]}
      paginationResetDefaultPage={resetPaginationToggle}
      onChangePage={onPageChange}
      onChangeRowsPerPage={onLimitChange}
      sortServer
      defaultSortFieldId={sortBy}
      defaultSortAsc={order === "asc"}
      onSort={handleSort}
    />
  );
}
