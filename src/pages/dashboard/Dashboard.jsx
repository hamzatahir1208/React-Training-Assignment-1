import Layout from "../../app/Layout";
import Table from "../../components/Table";
import UserModal from "../users/UserModal";
import { useUsers } from "../../hooks/useUsers";
import { USER_COLUMNS } from "../../constants/columns";

export default function Dashboard() {
  const {
    users,
    total,
    page,
    limit,
    search,
    sortBy,
    order,
    totalPages,
    hasPrevPage,
    hasNextPage,
    loading,
    error,
    isAdding,
    deletingId,
    actionError,
    setActionError,
    setPage,
    setLimit,
    setSearch,
    setSort,
    setSortBy,
    setOrder,
    handleAddUser,
    handleDeleteUser,
  } = useUsers({ limit: 10 });

  const sortableColumns = USER_COLUMNS.filter((col) => col.sortable);

  return (
    <Layout>
      <div className="dashboard p-5">
        <div className="content p-3">
          <div>
            <h1 className="mb-0">Dashboard</h1>
            <small className="text-secondary">
              Total Users: {total} {total > 0 && `(Page ${page} of ${totalPages})`}
            </small>
          </div>
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#userModal"
            aria-label="Add User"
          >
            <i className="bi bi-plus-circle text-light fs-2"></i>
          </button>
        </div>

        {actionError && (
          <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
            {actionError}
            <button
              type="button"
              className="btn-close"
              onClick={() => setActionError(null)}
              aria-label="Close"
            />
          </div>
        )}

        <div className="row mt-4 align-items-center">
          <div className="col-md-5 mb-3">
            <input
              type="text"
              className="form-control input-feild"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Select sort field"
            >
              {sortableColumns.map((col) => (
                <option key={col.sortKey} value={col.sortKey}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <select
              className="form-select input-feild"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              aria-label="Select sort order"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <select
              className="form-select input-feild"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              aria-label="Select page size"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          {error && (
            <div className="text-center text-danger py-4">{error}</div>
          )}
          {!error && (
            <Table
              data={users}
              currentPage={page}
              totalPages={totalPages}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={setPage}
              sortBy={sortBy}
              sortOrder={order}
              onSort={setSort}
              handleDelete={handleDeleteUser}
              deletingId={deletingId}
              columns={USER_COLUMNS}
              loading={loading}
            />
          )}
        </div>
      </div>

      <UserModal onAdd={handleAddUser} isAdding={isAdding} />
    </Layout>
  );
}
