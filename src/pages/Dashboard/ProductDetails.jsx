import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch the product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Upvote logic
  const isOwner = user?.email && product?.ownerEmail === user.email;
  const alreadyUpvoted = user && product?.upvotedUsers?.includes(user.email);

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/products/upvote", {
        productId: id,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["productDetails", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed!");
    },
  });

  const handleUpvote = () => {
    if (!user) {
      toast.error("Please login to upvote.");
      navigate("/login");
      return;
    }
    if (isOwner || alreadyUpvoted) return;
    upvoteMutation.mutate();
  };

  if (isLoading || !product) return <Loading />;

  return (
    <div className="card w-full max-w-2xl min-h-[60vh] bg-[#1e293b] shadow-2xl rounded-2xl p-8 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-64 h-52 rounded-xl object-cover border-2 border-cyan-400 mb-4"
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">
            {product.name}
            {product.status === "featured" && (
              <span className="ml-3 badge badge-info">Featured</span>
            )}
          </h2>
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
              disabled={isOwner || alreadyUpvoted || upvoteMutation.isPending}
              onClick={handleUpvote}
            >
              <FaArrowUp /> {product.upvotes}
            </button>
            <span className="text-xs text-gray-400">
              {isOwner ? "You are the owner" : alreadyUpvoted ? "Upvoted" : ""}
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
            {product.status === "accepted" && (
              <span className="badge badge-success ml-3 flex items-center gap-1">
                <FaCheckCircle /> Accepted
              </span>
            )}
            {product.status === "pending" && (
              <span className="badge badge-warning ml-3 p-5 ">Pending Review</span>
            )}
            {product.status === "rejected" && (
              <span className="badge badge-error ml-3">Rejected</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
