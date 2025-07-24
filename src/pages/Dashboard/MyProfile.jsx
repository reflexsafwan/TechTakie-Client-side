import { useContext } from "react";

import { useNavigate } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isSubscribed = user?.isSubscribed;
  const membershipAmount = 19;

  const handleSubscribe = () => {
    navigate("/dashboard/subscribe");
  };

  return (
    <div className="card w-full max-w-xl min-h-[60vh] bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center justify-center">
      <img
        src={user?.photoURL || "/default-avatar.png"}
        alt={user?.displayName || "Anonymous"}
        className="w-28 h-28 rounded-full border-4 border-cyan-500 object-cover mb-4 shadow"
      />
      <h2 className="text-3xl font-extrabold text-cyan-700 mb-1">
        {user?.displayName || "Anonymous User"}
      </h2>
      <p className="text-gray-600 mb-4">{user?.email}</p>

      {isSubscribed ? (
        <div className="badge badge-success badge-lg py-4 px-6 flex items-center gap-2 text-lg">
          <FaCheckCircle className="text-xl" />
          Membership Status: <span className="font-bold">Verified</span>
        </div>
      ) : (
        <button
          onClick={handleSubscribe}
          className="btn btn-accent btn-md px-8 mt-4"
        >
          Subscribe Membership (${membershipAmount})
        </button>
      )}
    </div>
  );
};

export default MyProfile;
