import { Button, Form, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FaKey, FaJira, FaGithub } from "react-icons/fa";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/,
      "Email must be a fpt.edu.vn address",
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4" 
    style={{
    backgroundColor: "#0f172a",
    backgroundImage:
      "radial-gradient(#334155 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  }}>
      <div className="w-100" style={{ maxWidth: 1100 }}>
        <Row className="align-items-center g-5">
          {/* LEFT BRANDING */}
          <Col lg={6} className="d-none d-lg-block">
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded"
                  style={{
                    width: 48,
                    height: 48,
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  }}
                >
                  <FaKey size={22} color="white" />
                </div>
                <div>
                  <h1 className="fw-bold mb-0">SWP391 Hub</h1>
                  <small className="text-muted">
                    Project Management Platform
                  </small>
                </div>
              </div>

              <h2 className="fw-bold mb-3">
                Supporting Tool for Requirements and Project Progress Management
              </h2>

              <p className="text-muted fs-5">
                Streamline your Software Project Course (SWP391) with integrated
                Jira and GitHub management tools.
              </p>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* Jira */}
              <Card className="shadow-sm border-0">
                <Card.Body className="d-flex align-items-start gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaJira size={20} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">Jira Integration</h6>
                    <small className="text-muted">
                      Track requirements and manage sprints
                    </small>
                  </div>
                </Card.Body>
              </Card>

              {/* GitHub */}
              <Card className="shadow-sm border-0">
                <Card.Body className="d-flex align-items-start gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded bg-secondary bg-opacity-10"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">GitHub Integration</h6>
                    <small className="text-muted">
                      Monitor commits and pull requests
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* RIGHT LOGIN FORM */}
          <Col lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                <h3 className="fw-bold mb-1">Welcome back</h3>
                <p className="text-muted mb-4">
                  Enter your credentials to access your account
                </p>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* EMAIL */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@fpt.edu.vn"
                      {...register("email")}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* PASSWORD */}
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* ACTIONS */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check label="Remember me" />
                    <a href="#" className="small text-decoration-none">
                      Forgot password?
                    </a>
                  </div>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    className="w-100"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(to right, #2563eb, #7c3aed)",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          size="sm"
                          animation="border"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
