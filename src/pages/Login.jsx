import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await loginUser(
        email,
        password
      );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <form className="space-y-4"
         onSubmit={handleLogin}>
          <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

          <button
            type="submit"
            className="w-full bg-slate-900 text-white p-3 rounded-lg"
          >
             {loading
            ? "Logging in..."
            : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}