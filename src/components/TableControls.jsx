import { Row, Col, Form } from "react-bootstrap";

export default function TableControls({ search, onSearchChange }) {
  return (
    <Row className="mt-4 align-items-center">
      <Col md={5} lg={12} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
    </Row>
  );
}
