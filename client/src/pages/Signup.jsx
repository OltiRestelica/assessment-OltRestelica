import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SignupForm from "../components/SignupForm";
import "../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/signup", { name, email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.data.role);

      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed");
    }
  };

  return (
    <main>
      <div className="signupContainer">
        <h1>Sign Up</h1>
        <SignupForm
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
      <h4><a href="/login">LogIn?</a></h4>
      </div>
    </main>
  );
};

export default Signup;
