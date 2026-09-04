import { useState } from "react";
import { connect } from "react-redux";
import { Spinner, Modal, Alert, Button } from "react-bootstrap";
import { createLoadingSelector } from "../redux/reducers/loadingReducer";
import { LOADING_TYPES } from "../constants";

function UserRowActions({ user, onDelete, isRowDeleting }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    if (isRowDeleting) return;
    setShowConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDelete(user.id);
    setShowConfirm(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-small"
        onClick={() => setShowConfirm(true)}
        disabled={isRowDeleting}
        aria-label={`Delete ${user.firstName} ${user.lastName}`}
        title="Delete User"
      >
        {isRowDeleting ? (
          <Spinner animation="border" size="sm" variant="danger" role="status" aria-hidden="true" />
        ) : (
          <i className="bi bi-x-circle text-danger fs-5"></i>
        )}
      </button>

      <Modal show={showConfirm} onHide={handleCancel} centered backdrop={isRowDeleting ? "static" : true}>
        <Modal.Header closeButton={!isRowDeleting}>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning" className="mb-0">
            Are you sure you want to delete user{" "}
            <strong>
              {user.firstName} {user.lastName}
            </strong>{" "}
            (ID: {user.id})? This action cannot be undone.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel} disabled={isRowDeleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={isRowDeleting}
            className="d-inline-flex align-items-center gap-2"
          >
            {isRowDeleting ? (
              <>
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const loadingSelector = createLoadingSelector(`${LOADING_TYPES.DELETE_USER}_${ownProps.user.id}`);
  return {
    isRowDeleting: loadingSelector(state),
  };
};

export default connect(mapStateToProps)(UserRowActions);
