import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.role);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <main>
      <div className="loginContainer">
        <h1>Login</h1>

        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
        <h4>
          Dont have an account? <a href="/signup">Sign Up</a>
        </h4>
      </div>
    </main>
  );
};
export default Login;
