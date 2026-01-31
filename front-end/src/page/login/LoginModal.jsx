
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/, 'Email must be a fpt.edu.vn address'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginModal({ show, onClose, onSubmit, loading, error }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    return (
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email")}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" /> Logging in
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    </div>
    );
}