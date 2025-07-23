import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";

// imgbb key from your .env
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Image upload handler
  const handleImageUpload = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      if (res.data.success) {
        setImageUrl(res.data.data.url);
        toast.success("Image uploaded!");
      } else {
        setError("Failed to upload image.");
      }
    } catch {
      setError("Failed to upload image.");
    }
    setUploading(false);
  };

  // Register form handler
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
      navigate("/");
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Google auth handler
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
      <div className="card w-full max-w-md p-8 shadow-xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-600">
          Register at TechieTake
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageUpload}
              disabled={uploading}
              required
            />
            {uploading && (
              <span className="loading loading-spinner loading-xs ml-2"></span>
            )}
            {imageUrl && (
              <div className="flex items-center mt-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
                />
                <span className="ml-2 text-green-600 text-xs">
                  Image ready!
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="alert alert-error shadow-sm py-1 px-2 text-xs mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
          
            className="btn btn-primary w-full text-black"
        
          >
            {/* {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Register"
            )} */}
            Register
          </button>
        </form>
        <div className="divider text-xs">OR</div>
        <button
          className="btn btn-outline btn-accent w-full text-black"
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
