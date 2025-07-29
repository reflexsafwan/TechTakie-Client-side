// import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { useNavigate, Link } from "react-router";
// import toast from "react-hot-toast";
// import axios from "axios";

// // imgbb key from your .env
// const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

// const Register = () => {
//   const {
//     createUser,
//     updateUserProfile,
//     signInWithGoogle,
//     loading,
//     setLoading,
//   } = useContext(AuthContext);
//   const [error, setError] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const navigate = useNavigate();

//   // Image upload handler
//   const handleImageUpload = async (e) => {
//     setError("");
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//         formData
//       );
//       if (res.data.success) {
//         setImageUrl(res.data.data.url);
//         toast.success("Image uploaded!");
//       } else {
//         setError("Failed to upload image.");
//       }
//     } catch {
//       setError("Failed to upload image.");
//     }
//     setUploading(false);
//   };

//   // Register form handler
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     const form = e.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;

//     if (!imageUrl) {
//       setError("Please upload your photo.");
//       return;
//     }

//     try {
//       await createUser(email, password);
//       await updateUserProfile(name, imageUrl);
//       toast.success("Registration successful! 🎉");
//       form.reset();
//       setImageUrl("");
//       navigate("/");

//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Google auth handler
//   const handleGoogleSignIn = async () => {
//     setError("");
//     try {
//       await signInWithGoogle();
//       toast.success("Google sign-in successful! 🎉");
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh] bg-base-200">
//       <div className="card w-full max-w-md p-8 shadow-xl bg-white">
//         <h2 className="text-3xl font-bold text-center mb-6 text-cyan-600">
//           Register at TechieTake
//         </h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div className="form-control">
//             <input
//               name="name"
//               type="text"
//               placeholder="Full Name"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//               required
//             />
//           </div>
//           <div className="form-control">
//             <input
//               type="file"
//               accept="image/*"
//               className="file-input file-input-bordered w-full"
//               onChange={handleImageUpload}
//               disabled={uploading}
//               required
//             />
//             {uploading && (
//               <span className="loading loading-spinner loading-xs ml-2"></span>
//             )}
//             {imageUrl && (
//               <div className="flex items-center mt-2">
//                 <img
//                   src={imageUrl}
//                   alt="Preview"
//                   className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
//                 />
//                 <span className="ml-2 text-green-600 text-xs">
//                   Image ready!
//                 </span>
//               </div>
//             )}
//           </div>

//           {error && (
//             <div className="alert alert-error shadow-sm py-1 px-2 text-xs mt-2">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"

//             className="btn btn-primary w-full text-black"

//           >
//             {/* {loading ? (
//               <span className="loading loading-spinner loading-xs"></span>
//             ) : (
//               "Register"
//             )} */}
//             Register
//           </button>
//         </form>
//         <div className="divider text-xs">OR</div>
//         <button
//           className="btn btn-outline btn-accent w-full text-black"
//           onClick={handleGoogleSignIn}

//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5 mr-2"
//           />
//           Continue with Google
//         </button>
//         <p className="mt-4 text-sm text-center text-black">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-cyan-600 hover:underline font-semibold"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useContext, useState } from "react";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { saveUserInDb } from "../api/utils";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  // Photo upload
  const handlePhotoUpload = async (e) => {
    setPhotoUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setPhotoUploading(false);
      return;
    }
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

  // Register form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = photoURL;

    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (!photo) {
      toast.error("Please upload your photo.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const result = await createUser(email, password);

      // 2. Update Firebase profile with name and photo
      await updateUserProfile(name, photo);
      saveUserInDb({
        email: email,
        role: "user",
        name: name,
        photoURL: photo,
        subscriptionStatus: false,
        staus: "not-verified",
      });
      // Success, user is handled by AuthProvider's onAuthStateChanged
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Registration failed.");
    }
    setLoading(false);
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      console.log(result);

      toast.success("Google sign-in successful!");
      navigate("/"); // Redirect handled by AuthProvider's onAuthStateChanged
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed.");
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
          type="button"
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
