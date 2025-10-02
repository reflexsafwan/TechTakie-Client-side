// src/pages/Login.jsx

import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Container from "./../components/Container";
import animationData from "../assets/login.json";
import Lottie from "lottie-react";

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
    // <Container>
    //   <div classNameName="flex justify-center items-center bg-base-200">
    //     <div classNameName="w-full  p-8 rounded-xl shadow-lg bg-white ">
    //       <h2 classNameName="text-2xl font-bold text-center mb-4 text-cyan-600">
    //         Login to TechieTake
    //       </h2>
    //       <form onSubmit={handleLogin} classNameName="space-y-4">
    //         <input
    //           name="email"
    //           type="email"
    //           placeholder="Email"
    //           classNameName="input input-bordered w-full"
    //           required
    //         />
    //         <input
    //           name="password"
    //           type="password"
    //           placeholder="Password"
    //           classNameName="input input-bordered w-full"
    //           required
    //         />

    //         {error && <p classNameName="text-error">{error}</p>}

    //         <button
    //           type="submit"
    //           classNameName="btn btn-primary w-full"
    //           disabled={loading}
    //         >
    //           {/* {loading ? (
    //           <span classNameName="loading loading-spinner loading-xs"></span>
    //         ) : (
    //           "Login"
    //         )} */}
    //           Login
    //         </button>
    //       </form>
    //       <div classNameName="divider">OR</div>
    //       <button
    //         classNameName="btn btn-outline btn-accent w-full"
    //         onClick={handleGoogleSignIn}
    //       >
    //         <img
    //           src="https://www.svgrepo.com/show/475656/google-color.svg"
    //           alt="Google"
    //           classNameName="w-5 h-5 mr-2"
    //         />
    //         Continue with Google
    //       </button>
    //       <p classNameName="mt-4 text-sm text-center text-black">
    //         Don&apos;t have an account?
    //         <Link
    //           to="/register"
    //           classNameName="text-cyan-600 hover:underline font-semibold"
    //         >
    //           Register
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </Container>

    <Container>
      <div className="flex w-full flex-col md:flex-row items-center justify-center mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-6xl md:gap-6 mt-12">
        {/* <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
        }}
      ></div> */}
        <div className=" bg-cover lg:block lg:w-1/2  " style={{ width: 350 }}>
          <Lottie animationData={animationData} loop={true} />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <p classNameName="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <a
            onClick={handleGoogleSignIn}
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                name="email"
                placeholder="Please Enter Your Email "
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="loggingPassword"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              <input
                name="password"
                placeholder="Enter Your Password"
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
            </div>
            {error && <p className="text-error mt-2">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to="/register"
              href="#"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
