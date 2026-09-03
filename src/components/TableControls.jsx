import { Row, Col, Form } from "react-bootstrap";

export default function TableControls({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
  limit,
  onLimitChange,
  sortableColumns,
}) {
  return (
    <Row className="mt-4 align-items-center">
      <Col md={5} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>

      <Col md={3} className="mb-3">
        <Form.Select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          aria-label="Select sort field"
        >
          {sortableColumns.map((col) => (
            <option key={col.sortKey} value={col.sortKey}>
              {col.label}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2} className="mb-3">
        <Form.Select
          value={order}
          onChange={(e) => onOrderChange(e.target.value)}
          aria-label="Select sort order"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
      </Col>

      <Col md={2} className="mb-3">
        <Form.Select
          value={limit}
          onChange={(e) => onLimitChange(e.target.value)}
          aria-label="Select page size"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
