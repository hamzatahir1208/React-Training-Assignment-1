import { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { createLoadingSelector } from "../../redux/reducers/loadingReducer";
import Layout from "../../app/Layout";
import Table from "../../components/Table";
import TableControls from "../../components/TableControls";
import UserModal from "../users/UserModal";
import { LOADING_TYPES } from "../../constants";
import {
  fetchUsers,
  deleteUserAndRefresh,
  addUserAndRefresh,
} from "../../redux/actions/userActions";
import useUsers from "../../hooks/useUsers";

const Dashboard = (props) => {
  const {
    users,
    isFetching,
    isAdding,
    fetchUsers,
    deleteUserAndRefresh,
    addUserAndRefresh,
  } = props;

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalError, setModalError] = useState("");

  const {
    page,
    limit,
    search,
    sortBy,
    order,
    resetPaginationToggle,
    setPage,
    setLimit,
    setSearch,
    setSort,
  } = useUsers({
    initialOptions: {
      page: 1,
      limit: 10,
      search: "",
      sortBy: "id",
      order: "asc",
    },
    fetchUsers,
    total: users.total,
  });

  const handleDeleteUser = async (id) => {
    await deleteUserAndRefresh(id);
    fetchUsers({ page, limit, search, sortBy, order });
  };

  return (
    <Layout>
      <Container fluid className="dashboard p-5">
        <div className="content p-3 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="mb-0">Dashboard</h1>
            <small className="text-secondary">Total Users: {users.total}</small>
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

        <TableControls search={search} onSearchChange={setSearch} />

        <Row className="mt-3">
          <Col xs={12}>
            {users.error ? (
              <div className="text-center text-danger py-4">{users.error}</div>
            ) : (
              <Table
                data={users.data}
                totalRows={users.total}
                page={page}
                limit={limit}
                sortBy={sortBy}
                order={order}
                onSortChange={setSort}
                onPageChange={setPage}
                onLimitChange={setLimit}
                resetPaginationToggle={resetPaginationToggle}
                handleDelete={handleDeleteUser}
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
  users: state.users,
  isAdding: isAddingSelector(state),
  isFetching: isFetchingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (options) => dispatch(fetchUsers(options)),
  deleteUserAndRefresh: (id) => dispatch(deleteUserAndRefresh(id)),
  addUserAndRefresh: (user) => dispatch(addUserAndRefresh(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
