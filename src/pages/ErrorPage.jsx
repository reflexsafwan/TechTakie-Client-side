import { Link, useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-200 p-4">
      <img
        src="https://undraw.co/api/illustrations/84e38184-3a25-4a60-99a7-6d2f53b6b377"
        alt="Not found"
        className="max-w-xs w-full mb-8"
      />
      <h1 className="text-4xl font-bold text-cyan-600 mb-2">404</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="flex gap-4">
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          ⬅️ Go Back
        </button>
        <Link to="/" className="btn btn-primary px-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
