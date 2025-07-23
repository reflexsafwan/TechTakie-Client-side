// src/pages/Register.jsx

import { useNavigate, Link } from "react-router"; // Only react-router
import toast from "react-hot-toast";
import ImageUploader from "../components/ImageUploader";
import useAuth from "../hooks/useAuth";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const {
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
    createUser,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!imageUrl) {
      setError("Please upload your photo.");
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, imageUrl);
      toast.success("Registration successful! 🎉");
      form.reset();
      setImageUrl("");
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
      // setLoading(false);
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
          Register at TechieTake
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
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

          <ImageUploader
            imgbbApiKey={imgbbApiKey}
            onUpload={(url) => {
              setImageUrl(url);
              toast.success("Image uploaded!");
            }}
          />
          {imageUrl && (
            <div className="flex items-center mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
              />
              <span className="ml-2 text-green-600 text-xs">Image ready!</span>
            </div>
          )}

          {error && <p className="text-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="divider text-black">OR</div>
        <button
          className="btn btn-outline btn-accent w-full"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <p className="mt-4 text-sm text-center text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
