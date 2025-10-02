import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { FaArrowUp, FaStar } from "react-icons/fa";

const FeatureProductsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/products/upvote", { productId: id });
    },
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["productDetails", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed. Try again!");
    },
  });

  const handleUpvote = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (
      product.ownerEmail === user.email ||
      product.upvotedUsers?.includes(user.email)
    ) {
      toast.error(
        product.ownerEmail === user.email
          ? "You can't upvote your own product."
          : "You already upvoted."
      );
      return;
    }
    upvoteMutation.mutate();
  };

  if (isLoading || !product) return <Loading />;

  return (
    <div className="card w-full min-h-[60vh] bg-[#1e293b] shadow-2xl rounded-2xl p-8 mx-auto mt-8 ">
      <div className="flex flex-col md:flex-row gap-8 ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-64 h-52 rounded-xl object-cover border-2 border-cyan-400 mb-4"
        />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              {product.name}
            </h2>
            {product.status === "featured" && (
              <span className="badge badge-info flex items-center gap-1">
                <FaStar className="text-yellow-400" /> Featured
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.tags.map((tag) => (
              <span key={tag} className="badge badge-info text-white">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <button
              className="btn btn-outline btn-success btn-xs flex items-center gap-1"
              onClick={handleUpvote}
              title={
                !user
                  ? "Login to upvote"
                  : product.ownerEmail === user.email
                  ? "You can't upvote your own product"
                  : product.upvotedUsers?.includes(user.email)
                  ? "You already upvoted"
                  : "Upvote"
              }
            >
              <FaArrowUp /> {product.upvotes}
            </button>
            <span className="text-xs text-gray-400">
              {product.ownerEmail === user?.email
                ? "You are the owner"
                : product.upvotedUsers?.includes(user?.email)
                ? "Upvoted"
                : ""}
            </span>
          </div>
          <p className="mb-3 text-cyan-100">{product.description}</p>
          <a
            href={product.externalLinks}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-accent btn-sm mb-3"
          >
            Visit Product
          </a>
          <div className="flex items-center gap-3 mt-auto">
            <img
              src={product.ownerPhoto || "/default-avatar.png"}
              alt={product.ownerName}
              className="w-10 h-10 rounded-full border border-cyan-300"
            />
            <div>
              <p className="text-sm font-bold text-cyan-200">
                {product.ownerName}
              </p>
              <p className="text-xs text-cyan-100">{product.ownerEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProductsDetails;
