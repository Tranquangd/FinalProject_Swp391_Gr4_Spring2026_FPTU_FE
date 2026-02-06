import { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  ProgressBar,
  Nav,
  Tab,
  Form,
} from "react-bootstrap";
import { FaTasks, FaCodeBranch, FaUserCircle } from "react-icons/fa";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const member = useMemo(
    () => ({
      name: "Tran Thi B",
      studentCode: "SE170123",
      role: "MEMBER",
    }),
    []
  );

  const jiraTasks = useMemo(
    () => [
      {
        id: "JIRA-201",
        title: "Build login form UI",
        status: "IN_PROGRESS",
        priority: "HIGH",
        type: "STORY",
        progress: 65,
      },
      {
        id: "JIRA-202",
        title: "Integrate auth API",
        status: "DONE",
        priority: "CRITICAL",
        type: "TASK",
        progress: 100,
      },
      {
        id: "JIRA-203",
        title: "Add form validation",
        status: "TODO",
        priority: "MEDIUM",
        type: "TASK",
        progress: 10,
      },
    ],
    []
  );

  const commitStats = useMemo(
    () => ({
      commits: 13,
      lastCommit: "2026-02-06 09:05",
      streak: 3,
      topBranch: "feature/login-ui",
    }),
    []
  );

  const filteredTasks =
    statusFilter === "ALL"
      ? jiraTasks
      : jiraTasks.filter((t) => t.status === statusFilter);

  const summary = useMemo(() => {
    const done = jiraTasks.filter((t) => t.status === "DONE").length;
    const total = jiraTasks.length;
    const inProgress = jiraTasks.filter(
      (t) => t.status === "IN_PROGRESS"
    ).length;
    return { done, total, inProgress };
  }, [jiraTasks]);

  const getStatusBadge = (status) => {
    const map = {
      DONE: "success",
      IN_PROGRESS: "primary",
      TODO: "secondary",
    };
    return <Badge bg={map[status] || "secondary"}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const map = {
      CRITICAL: "danger",
      HIGH: "warning",
      MEDIUM: "info",
      LOW: "secondary",
    };
    return <Badge bg={map[priority] || "secondary"}>{priority}</Badge>;
  };

  const getTypeBadge = (type) => {
    const map = {
      STORY: "success",
      TASK: "info",
      BUG: "danger",
    };
    return <Badge bg={map[type] || "secondary"}>{type}</Badge>;
  };

  return (
    <div className="member-dashboard">
      <Container fluid className="py-4">
        <Row className="align-items-center mb-4">
          <Col>
            <div className="md-title">
              <div className="md-title__badge">Member</div>
              <h1>Personal Dashboard</h1>
              <p>Jira tasks & personal commit status.</p>
            </div>
          </Col>
          <Col xs="auto">
            <Card className="md-profile">
              <Card.Body>
                <div className="md-profile__row">
                  <FaUserCircle />
                  <div>
                    <div className="md-profile__name">{member.name}</div>
                    <div className="md-profile__meta">
                      {member.studentCode} • {member.role}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="md-card">
              <Card.Body>
                <div className="md-card__header">
                  <span className="md-icon tasks">
                    <FaTasks />
                  </span>
                  <div>
                    <div className="md-card__title">Tasks Completed</div>
                    <div className="md-card__value">
                      {summary.done}/{summary.total}
                    </div>
                  </div>
                </div>
                <ProgressBar
                  className="md-progress"
                  now={(summary.done / summary.total) * 100}
                  label={`${Math.round((summary.done / summary.total) * 100)}%`}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="md-card">
              <Card.Body>
                <div className="md-card__header">
                  <span className="md-icon focus">
                    <FaTasks />
                  </span>
                  <div>
                    <div className="md-card__title">In Progress</div>
                    <div className="md-card__value">{summary.inProgress}</div>
                  </div>
                </div>
                <div className="md-subtext">
                  Jira tasks currently assigned to you
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="md-card">
              <Card.Body>
                <div className="md-card__header">
                  <span className="md-icon commits">
                    <FaCodeBranch />
                  </span>
                  <div>
                    <div className="md-card__title">Commits</div>
                    <div className="md-card__value">{commitStats.commits}</div>
                  </div>
                </div>
                <div className="md-subtext">
                  Last commit {commitStats.lastCommit}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="md-surface">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col md={8}>
                <h2 className="md-section-title">Your Work Status</h2>
                <div className="md-section-subtitle">
                  Filter Jira tasks and track personal commits.
                </div>
              </Col>
              <Col md={4}>
                <Form.Select
                  className="md-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">All statuses</option>
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </Form.Select>
              </Col>
            </Row>

            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Nav className="md-tabs" variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="tasks">Jira Tasks Status</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="commits">Personal Commits</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="tasks">
                  <Table hover responsive className="md-table">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((t) => (
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td>{t.title}</td>
                          <td>{getTypeBadge(t.type)}</td>
                          <td>{getPriorityBadge(t.priority)}</td>
                          <td>{getStatusBadge(t.status)}</td>
                          <td style={{ minWidth: 140 }}>
                            <ProgressBar
                              now={t.progress}
                              label={`${t.progress}%`}
                              className="md-progress-small"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>

                <Tab.Pane eventKey="commits">
                  <div className="md-commit-card">
                    <div className="md-commit-card__header">
                      <FaCodeBranch />
                      <div>
                        <div className="md-commit-card__title">
                          Personal Commit Status
                        </div>
                        <div className="md-commit-card__sub">
                          Branch: {commitStats.topBranch}
                        </div>
                      </div>
                    </div>

                    <div className="md-commit-grid">
                      <div>
                        <div className="md-commit-label">Total Commits</div>
                        <div className="md-commit-value">
                          {commitStats.commits}
                        </div>
                      </div>
                      <div>
                        <div className="md-commit-label">Streak</div>
                        <div className="md-commit-value">
                          {commitStats.streak} days
                        </div>
                      </div>
                      <div>
                        <div className="md-commit-label">Last Commit</div>
                        <div className="md-commit-value">
                          {commitStats.lastCommit}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
