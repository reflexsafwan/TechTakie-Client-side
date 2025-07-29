import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { saveUserInDb } from "../api/utils";
import Loading from "../components/Loading";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handlePhotoUpload = async (e) => {
    setPhotoUploading(true);
    const file = e.target.files[0];
    if (!file) return setPhotoUploading(false);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      if (res.data.success) {
        setPhotoURL(res.data.data.url);
        toast.success("Photo uploaded!");
      } else {
        toast.error("Failed to upload photo.");
      }
    } catch {
      toast.error("Failed to upload photo.");
    }

    setPhotoUploading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password || !photoURL) {
      toast.error("Please complete all fields including photo.");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      setUser(result?.user);
      console.log({ result });
      await updateUserProfile(name, photoURL);
      await saveUserInDb({
        email,
        name,
        photoURL,
        role: "user",
        subscriptionStatus: false,
        staus: "not-verified",
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-600">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
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
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handlePhotoUpload}
            disabled={photoUploading}
            required
          />
          {photoUploading && (
            <div className="flex items-center gap-2 mt-1">
              <Loading />
              <span className="text-xs text-cyan-400">Uploading photo...</span>
            </div>
          )}
          {photoURL && (
            <div className="flex items-center mt-2">
              <img
                src={photoURL}
                alt="Uploaded avatar"
                className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
              />
              <span className="ml-2 text-green-600 text-xs">Photo ready!</span>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading || photoUploading}
          >
            {loading ? <Loading /> : "Register"}
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          className="btn btn-outline w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
