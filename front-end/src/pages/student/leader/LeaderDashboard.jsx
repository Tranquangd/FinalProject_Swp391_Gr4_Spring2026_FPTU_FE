import { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  ProgressBar,
  Form,
  Nav,
  Tab,
} from "react-bootstrap";
import { FaFileExport, FaTasks, FaCodeBranch, FaUsers } from "react-icons/fa";
import "./LeaderDashboard.css";

export default function LeaderDashboard() {
  const [selectedMember, setSelectedMember] = useState("all");
  const [activeTab, setActiveTab] = useState("tasks");

  const members = useMemo(
    () => [
      { id: "m1", name: "Nguyen Van A", role: "LEADER" },
      { id: "m2", name: "Tran Thi B", role: "MEMBER" },
      { id: "m3", name: "Le Van C", role: "MEMBER" },
      { id: "m4", name: "Pham Thi D", role: "MEMBER" },
    ],
    []
  );

  const tasks = useMemo(
    () => [
      {
        id: "T-101",
        title: "Login UI + Validation",
        assigneeId: "m2",
        status: "IN_PROGRESS",
        priority: "HIGH",
        type: "STORY",
        progress: 65,
      },
      {
        id: "T-102",
        title: "API Integration - Auth",
        assigneeId: "m1",
        status: "DONE",
        priority: "CRITICAL",
        type: "TASK",
        progress: 100,
      },
      {
        id: "T-103",
        title: "User Profile Page",
        assigneeId: "m3",
        status: "TODO",
        priority: "MEDIUM",
        type: "STORY",
        progress: 10,
      },
      {
        id: "T-104",
        title: "Error Handling + Toast",
        assigneeId: "m4",
        status: "IN_PROGRESS",
        priority: "LOW",
        type: "TASK",
        progress: 35,
      },
    ],
    []
  );

  const commits = useMemo(
    () => [
      {
        id: "c1",
        memberId: "m1",
        name: "Nguyen Van A",
        commits: 21,
        lastCommit: "2026-02-05 21:30",
        streak: 5,
      },
      {
        id: "c2",
        memberId: "m2",
        name: "Tran Thi B",
        commits: 13,
        lastCommit: "2026-02-06 09:05",
        streak: 3,
      },
      {
        id: "c3",
        memberId: "m3",
        name: "Le Van C",
        commits: 7,
        lastCommit: "2026-02-04 18:20",
        streak: 1,
      },
      {
        id: "c4",
        memberId: "m4",
        name: "Pham Thi D",
        commits: 9,
        lastCommit: "2026-02-06 08:40",
        streak: 2,
      },
    ],
    []
  );

  const filteredTasks =
    selectedMember === "all"
      ? tasks
      : tasks.filter((t) => t.assigneeId === selectedMember);

  const filteredCommits =
    selectedMember === "all"
      ? commits
      : commits.filter((c) => c.memberId === selectedMember);

  const summary = useMemo(() => {
    const done = tasks.filter((t) => t.status === "DONE").length;
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const commitTotal = commits.reduce((sum, c) => sum + c.commits, 0);
    return { done, total, inProgress, commitTotal };
  }, [tasks, commits]);

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

  const handleExportSrs = () => {
    const content = [
      "Software Requirements Specification (SRS)",
      "Project: SWP391",
      "Version: 1.0",
      "Date: 2026-02-06",
      "",
      "1. Introduction",
      "- Purpose: Define system requirements for the team project.",
      "- Scope: Web application for project management.",
      "",
      "2. Overall Description",
      "- User roles: Lecturer, Leader, Member.",
      "- Core modules: Auth, Task Management, Commit Tracking, Reports.",
      "",
      "3. System Features",
      "- Task status tracking per member.",
      "- Commit activity overview per member.",
      "- Export reports and documentation.",
      "",
      "4. Non-Functional Requirements",
      "- Performance: response < 2s for common operations.",
      "- Security: role-based access control.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SRS_SWP391.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="leader-dashboard">
      <Container fluid className="py-4">
        <Row className="align-items-center mb-4">
          <Col>
            <div className="ld-title">
              <div className="ld-title__badge">Leader</div>
              <h1>Team Leader Dashboard</h1>
              <p>Track tasks, commits, and export SRS in one place.</p>
            </div>
          </Col>
          <Col xs="auto">
            <Button className="ld-export-btn" onClick={handleExportSrs}>
              <FaFileExport /> Export SRS
            </Button>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="ld-card">
              <Card.Body>
                <div className="ld-card__header">
                  <span className="ld-icon tasks">
                    <FaTasks />
                  </span>
                  <div>
                    <div className="ld-card__title">Tasks Completed</div>
                    <div className="ld-card__value">
                      {summary.done}/{summary.total}
                    </div>
                  </div>
                </div>
                <ProgressBar
                  className="ld-progress"
                  now={(summary.done / summary.total) * 100}
                  label={`${Math.round((summary.done / summary.total) * 100)}%`}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="ld-card">
              <Card.Body>
                <div className="ld-card__header">
                  <span className="ld-icon people">
                    <FaUsers />
                  </span>
                  <div>
                    <div className="ld-card__title">Tasks In Progress</div>
                    <div className="ld-card__value">{summary.inProgress}</div>
                  </div>
                </div>
                <div className="ld-subtext">
                  Members working on active items
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="ld-card">
              <Card.Body>
                <div className="ld-card__header">
                  <span className="ld-icon commits">
                    <FaCodeBranch />
                  </span>
                  <div>
                    <div className="ld-card__title">Total Commits</div>
                    <div className="ld-card__value">{summary.commitTotal}</div>
                  </div>
                </div>
                <div className="ld-subtext">
                  Last updated today by active members
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="ld-surface">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col md={8}>
                <h2 className="ld-section-title">
                  Member Insights
                </h2>
                <div className="ld-section-subtitle">
                  Focus on one member or view all data together.
                </div>
              </Col>
              <Col md={4}>
                <Form.Select
                  className="ld-select"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                >
                  <option value="all">All members</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.role === "LEADER" ? "(Leader)" : ""}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Nav className="ld-tabs" variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="tasks">Member Tasks Status</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="commits">Member Commit Status</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="tasks">
                  <Table hover responsive className="ld-table">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Title</th>
                        <th>Assignee</th>
                        <th>Type</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((t) => {
                        const assignee = members.find(
                          (m) => m.id === t.assigneeId
                        );
                        return (
                          <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.title}</td>
                            <td>{assignee?.name}</td>
                            <td>{getTypeBadge(t.type)}</td>
                            <td>{getPriorityBadge(t.priority)}</td>
                            <td>{getStatusBadge(t.status)}</td>
                            <td style={{ minWidth: 140 }}>
                              <ProgressBar
                                now={t.progress}
                                label={`${t.progress}%`}
                                className="ld-progress-small"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Tab.Pane>

                <Tab.Pane eventKey="commits">
                  <Table hover responsive className="ld-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Commits</th>
                        <th>Last Commit</th>
                        <th>Streak</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommits.map((c) => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                          <td>{c.commits}</td>
                          <td>{c.lastCommit}</td>
                          <td>{c.streak} days</td>
                          <td>
                            <Badge bg={c.streak >= 3 ? "success" : "warning"}>
                              {c.streak >= 3 ? "Active" : "Low"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
