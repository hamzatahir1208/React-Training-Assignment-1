import { useEffect, useState } from "react";
import { createLoadingSelector } from "../../redux/reducers/loadingReducer";
import { connect } from "react-redux";
import Layout from "../../app/Layout";
import Table from "../../components/Table";
import UserModal from "../users/UserModal";
import { USER_COLUMNS } from "../../constants/columns";
import {
  fetchUsers,
  changePage,
  changeLimit,
  changeSearch,
  changeSort,
  changeSortBy,
  changeOrder,
  deleteUserAndRefresh,
  clearActionError,
  addUserAndRefresh,
} from "../../redux/actions/userActions";

const sortableColumns = USER_COLUMNS.filter((col) => col.sortable);

const Dashboard = (props) => {
  const {
    users,
    fetchUsers,
    changePage,
    changeLimit,
    changeSearch,
    changeSort,
    changeSortBy,
    changeOrder,
    deleteUserAndRefresh,
    clearActionError,
    addUserAndRefresh,
    isAdding,
  } = props;
  const [modalError, setModalError] = useState("");
  const totalPages = Math.max(1, Math.ceil(users.total / users.limit));
  const hasPrevPage = users.page > 1;
  const hasNextPage = users.page < totalPages;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Layout>
      <div className="dashboard p-5">
        <div className="content p-3">
          <div>
            <h1 className="mb-0">Dashboard</h1>
            <small className="text-secondary">
              Total Users: {users.total}{" "}
              {users.total > 0 && `(Page ${users.page} of ${users.totalPages})`}
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

        {users.actionError && (
          <div
            className="alert alert-danger alert-dismissible fade show mt-3"
            role="alert"
          >
            {users.actionError}
            <button
              type="button"
              className="btn-close"
              onClick={() => clearActionError()}
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
              value={users.search}
              onChange={(e) => changeSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <select
              className="form-select input-feild"
              value={users.sortBy}
              onChange={(e) => changeSortBy(e.target.value)}
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
              value={users.order}
              onChange={(e) => changeOrder(e.target.value)}
              aria-label="Select sort order"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="col-md-2 mb-3">
            <select
              className="form-select input-feild"
              value={users.limit}
              onChange={(e) => changeLimit(e.target.value)}
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
          {users.error && <div className="text-center text-danger py-4">{users.error}</div>}
          {!users.error && (
            <Table
              data={users.data}
              currentPage={users.page}
              totalPages={totalPages}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={changePage}
              sortBy={users.sortBy}
              sortOrder={users.order}
              onSort={changeSort}
              handleDelete={deleteUserAndRefresh}
              deletingId={users.deletingId}
              columns={USER_COLUMNS}
              loading={users.loading}
            />
          )}
        </div>
      </div>

      <UserModal isAdding={isAdding} error={modalError} setError={setModalError} onSubmit={addUserAndRefresh} />
    </Layout>
  );
}

const loadingSelector = createLoadingSelector("ADD_USER");

const mapStateToProps = (state) => ({
  users: state.users,
  isAdding: loadingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  changePage: (page) => dispatch(changePage(page)),
  changeLimit: (limit) => dispatch(changeLimit(limit)),
  changeSearch: (term) => dispatch(changeSearch(term)),
  changeSort: (field) => dispatch(changeSort(field)),
  changeSortBy: (field) => dispatch(changeSortBy(field)),
  changeOrder: (order) => dispatch(changeOrder(order)),
  deleteUserAndRefresh: (id) => dispatch(deleteUserAndRefresh(id)),
  addUserAndRefresh: (user) => dispatch(addUserAndRefresh(user)),
  clearActionError: () => dispatch(clearActionError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
