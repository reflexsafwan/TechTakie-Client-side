//
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { FaCrown } from "react-icons/fa";
import { useLocation } from "react-router";

const MEMBERSHIP_AMOUNT_TEXT = "$9.99/month"; // Match your Stripe price

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // Fetch user info
  const { data: profile, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosSecure.get("/me");
      console.log(res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Stripe subscription mutation
  const { mutate, isLoading: subLoading } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post("/create-membership-session");
      return res.data.url;
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to start subscription."
      );
    },
  });

  // Show payment success toast
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("success")) {
      toast.success("Membership payment successful!");
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  if (isLoading || !profile) return <Loading />;

  // Adjust these as needed for your role names!
  const isSubscribed =
    profile.role === "premium" ||
    profile.role === "pro" ||
    profile.role === "starter";

  return (
    <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
      <div className="card max-w-md w-full bg-base-100 shadow-xl p-8 flex flex-col items-center">
        <img
          src={profile.photoURL || "/default-avatar.png"}
          alt={profile.name}
          className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover mb-3"
        />
        <h2 className="text-xl font-bold mb-1 text-cyan-600 flex items-center gap-2">
          {profile.name || "No Name"}
          {isSubscribed && (
            <span className="badge badge-warning flex items-center gap-1">
              <FaCrown className="text-yellow-400" /> Member
            </span>
          )}
        </h2>
        <p className="text-base text-gray-700 mb-2">{profile.email}</p>

        {!isSubscribed ? (
          <button
            className="btn btn-primary mt-6 w-full"
            onClick={() => mutate()}
            disabled={subLoading}
          >
            {subLoading ? (
              <Loading />
            ) : (
              `Membership Subscribe (${MEMBERSHIP_AMOUNT_TEXT})`
            )}
          </button>
        ) : (
          // THIS IS THE STATUS UI
          <div className="mt-4 text-center flex flex-col items-center gap-2">
            <div className="badge badge-success text-lg p-3">
              User Membership Subscription Status:{"subscribed "}
              <span className="ml-2 font-bold">Verified</span>
            </div>
            <div className="text-green-600 text-sm mt-2">
              Thank you for subscribing!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
