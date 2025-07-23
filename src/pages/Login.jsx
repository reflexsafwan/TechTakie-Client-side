// src/pages/Login.jsx

import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful! 🚀");
      form.reset();
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithGoogle();
      toast.success("Google sign-in successful! 🎉");
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-cyan-600">
          Login to TechieTake
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {/* {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Login"
            )} */}
            Login
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          className="btn btn-outline btn-accent w-full"
          onClick={handleGoogleSignIn}
        
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <p className="mt-4 text-sm text-center text-black">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
