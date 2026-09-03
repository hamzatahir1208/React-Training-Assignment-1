import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { createLoadingSelector } from "../../redux/reducers/loadingReducer";
import Layout from "../../app/Layout";
import Table from "../../components/Table";
import TableControls from "../../components/TableControls";
import UserModal from "../users/UserModal";
import { USER_COLUMNS, LOADING_TYPES } from "../../constants";
import {
  fetchUsers,
  // changePage,
  // changeLimit,
  // changeSearch,
  // changeSort,
  // changeSortBy,
  // changeOrder,
  // deleteUserAndRefresh,
  // addUserAndRefresh,
} from "../../redux/actions/userActions";
import useUsers from "../../hooks/useUsers";

const sortableColumns = USER_COLUMNS.filter((col) => col.sortable);

const Dashboard = (props) => {
  const {
    users,
    isFetching,
    isAdding,
    fetchUsers,
    // changePage,
    // changeLimit,
    // changeSearch,
    // changeSort,
    // changeSortBy,
    // changeOrder,
    // deleteUserAndRefresh,
    // addUserAndRefresh,
  } = props;

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalError, setModalError] = useState("");

  // const totalPages = Math.max(1, Math.ceil(users.total / users.limit));
  // const hasPrevPage = users.page > 1;
  // const hasNextPage = users.page < totalPages;

  const {
    setPage,
    setLimit,
    setSearch,
    setSort,
    setSortBy,
    setOrder,
    nextPage,
    prevPage,
    reload
  } = useUsers({
    initialOptions: {
      page: 1,
      limit: 10,
      search: "",
      sortBy: "id",
      order: "asc"
    },
    fetchUsers
  });

  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]);

  return (
    <Layout>
      <Container fluid className="dashboard p-5">
        <div className="content p-3 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="mb-0">Dashboard</h1>
            <small className="text-secondary">
              Total Users: {users.total}{" "}
              {users.total > 0 && `(Page ${users.page} of ${totalPages})`}
            </small>
          </div>

          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowAddModal(true)}
            aria-label="Add User"
          >
            <i className="bi bi-plus-circle text-light fs-2"></i>
          </Button>
        </div>

        {users.actionError && (
          <Alert
            variant="danger"
            dismissible
            className="mt-3"
          >
            {users.actionError}
          </Alert>
        )}

        <TableControls
          search={users.search}
          onSearchChange={changeSearch}
          sortBy={users.sortBy}
          onSortByChange={changeSortBy}
          order={users.order}
          onOrderChange={changeOrder}
          limit={users.limit}
          onLimitChange={changeLimit}
          sortableColumns={sortableColumns}
        />

        <Row className="mt-3">
          <Col xs={12}>
            {users.error ? (
              <div className="text-center text-danger py-4">{users.error}</div>
            ) : (
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
                columns={USER_COLUMNS}
                loading={isFetching}
              />
            )}
          </Col>
        </Row>
      </Container>

      <UserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        isAdding={isAdding}
        error={modalError}
        setError={setModalError}
        onSubmit={addUserAndRefresh}
      />
    </Layout>
  );
};

const isAddingSelector = createLoadingSelector(LOADING_TYPES.ADD_USER);
const isFetchingSelector = createLoadingSelector(LOADING_TYPES.FETCH_USERS);

const mapStateToProps = (state) => ({
  // users: state.users,
  isAdding: isAddingSelector(state),
  isFetching: isFetchingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  // changePage: (page) => dispatch(changePage(page)),
  // changeLimit: (limit) => dispatch(changeLimit(limit)),
  // changeSearch: (term) => dispatch(changeSearch(term)),
  // changeSort: (field) => dispatch(changeSort(field)),
  // changeSortBy: (field) => dispatch(changeSortBy(field)),
  // changeOrder: (order) => dispatch(changeOrder(order)),
  // deleteUserAndRefresh: (id) => dispatch(deleteUserAndRefresh(id)),
  // addUserAndRefresh: (user) => dispatch(addUserAndRefresh(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
