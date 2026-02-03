
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authApi from "../../api/authApi";
import LoginForm from "./LoginForm";

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

      const userData = {
        ...res.data.user,
        role: res.data.user.systemRole,
        token: res.data.token,
      };
      login(userData);

      

      if (userData.role === "ADMIN") navigate("/admin");
      else if (userData.role === "LECTURER") navigate("/lecturer");
      else if (userData.role === "STUDENT") {
  userData.isLeader
    ? navigate("/student/leader")
    : navigate("/student/member");
}

      setShow(false);
    } catch {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm show={show} onClose={() => setShow(false)} onSubmit={handleLogin} loading={loading} error={error} />
  );
}