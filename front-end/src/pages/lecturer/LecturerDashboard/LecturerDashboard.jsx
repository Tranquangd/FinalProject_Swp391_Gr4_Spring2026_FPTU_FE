
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Tab,
  Table,
  Badge,
  Button,
  Form,
  ProgressBar,
  Dropdown,
} from "react-bootstrap";

export default function LecturerDashboard({
  lecturer,
  groups,
  selectedGroup,
  onSelectGroup,
  students,
  requirements,
  progressReports,
  commitStats,
}) {
  const getPriorityBadge = (priority) => {
    const map = {
      CRITICAL: "danger",
      HIGH: "warning",
      MEDIUM: "info",
      LOW: "secondary",
    };
    return <Badge bg={map[priority] || "secondary"}>{priority}</Badge>;
  };

  const getStatusBadge = (status) => {
    const map = {
      DONE: "success",
      IN_PROGRESS: "primary",
      TODO: "secondary",
    };
    return <Badge bg={map[status] || "secondary"}>{status}</Badge>;
  };

  const getTypeBadge = (type) => {
    const map = {
      STORY: "success",
      BUG: "danger",
      TASK: "info",
    };
    return <Badge bg={map[type] || "secondary"}>{type}</Badge>;
  };

  return (
    <Container fluid className="py-4">
      {/* ===== HEADER ===== */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-1">SWP391 Lecturer Dashboard</h1>
          <p className="text-muted mb-0">
            Requirements & Project Progress Management
          </p>
        </Col>

        <Col xs="auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="border">
              <strong>{lecturer.fullName}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* ===== GROUPS ===== */}
      <Row className="mb-4">
        {groups.map((group) => (
          <Col md={3} key={group.id}>
            <Card
              className={
                selectedGroup?.id === group.id
                  ? "border-primary shadow"
                  : ""
              }
              style={{ cursor: "pointer" }}
              onClick={() => onSelectGroup(group)}
            >
              <Card.Body>
                <Card.Title>{group.name}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  {group.projectName}
                </Card.Subtitle>
                <ProgressBar
                  now={group.progress}
                  label={`${group.progress}%`}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===== TABS ===== */}
      <Tab.Container defaultActiveKey="students">
        <Card>
          <Card.Header>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="students">Students</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="requirements">Jira Tasks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="progress">Progress Reports</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="github">GitHub</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Tab.Content>
              {/* ===== STUDENTS ===== */}
              <Tab.Pane eventKey="students">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={s.id}>
                        <td>{i + 1}</td>
                        <td>{s.studentCode}</td>
                        <td>{s.fullName}</td>
                        <td>{s.email}</td>
                        <td>
                          <Badge bg={s.role === "LEADER" ? "primary" : "info"}>
                            {s.role}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* ===== REQUIREMENTS ===== */}
              <Tab.Pane eventKey="requirements">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assignee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requirements.map((r) => (
                      <tr key={r.key}>
                        <td>{r.key}</td>
                        <td>{r.title}</td>
                        <td>{getTypeBadge(r.type)}</td>
                        <td>{getPriorityBadge(r.priority)}</td>
                        <td>{getStatusBadge(r.status)}</td>
                        <td>{r.assigneeName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* ===== PROGRESS ===== */}
              <Tab.Pane eventKey="progress">
                {progressReports.map((p) => (
                  <Card key={p.id} className="mb-3">
                    <Card.Body>
                      <strong>{p.week}</strong>
                      <ProgressBar
                        now={(p.completed / p.total) * 100}
                        label={`${p.completed}/${p.total}`}
                      />
                      <p className="mt-2">{p.note}</p>
                    </Card.Body>
                  </Card>
                ))}
              </Tab.Pane>

              {/* ===== GITHUB ===== */}
              <Tab.Pane eventKey="github">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Commits</th>
                      <th>Last Commit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commitStats.map((c) => (
                      <tr key={c.userId}>
                        <td>{c.name}</td>
                        <td>{c.commits}</td>
                        <td>{c.lastCommitAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Container>
  );
}
