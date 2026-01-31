import LoginModal from "./LoginModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authApi from "../../api/authApi";

export default function LoginContainer() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await authApi.login(data);
      login(res.data);

      const role = res.data.user.systemRole;

      if (role === "ADMIN") navigate("/admin");
      else if (role === "LECTURER") navigate("/lecturer");
      else navigate("/student");

      setShow(false);
    } catch {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginModal show={show} onClose={() => setShow(false)} onSubmit={handleLogin} loading={loading} error={error} />
  );
}