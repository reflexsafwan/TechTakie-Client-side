
import { useContext } from "react";

import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { QueryClient, useMutation, useQuery,  } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const fetchFeaturedProducts = async () => {
  const res = await axios.get(`${API_URL}/products/featured`);
  return res.data;
};

const upvoteProduct = async ({ productId, userEmail }) => {
  const res = await axios.post(
    `${API_URL}/products/upvote`,
    { productId, userEmail },
    { withCredentials: true }
  );
  return res.data;
};

const FeaturedProductsSection = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
 const queryClient = new QueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  const upvoteMutation = useMutation({
    mutationFn: upvoteProduct,
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["featuredProducts"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed!");
    },
  });

  const sortedProducts = [...products]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 4);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-5 text-cyan-700">
        Featured Products
      </h2>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const isOwner = user?.email === product.ownerEmail;
            const alreadyUpvoted =
              user && product.upvotedUsers?.includes(user.email);

            return (
              <div
                key={product._id}
                className="card bg-white shadow-md rounded-xl"
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </figure>
                <div className="card-body">
                  <Link
                    to={`/product/${product._id}`}
                    className="card-title text-base hover:text-cyan-600"
                  >
                    {product.name}
                  </Link>
                  <div className="flex flex-wrap gap-1 mb-2 mt-1">
                    {product.tags?.map((tag) => (
                      <span key={tag} className="badge badge-outline text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn btn-outline btn-success btn-xs flex items-center gap-1"
                    disabled={
                      isOwner ||
                      !user ||
                      alreadyUpvoted ||
                      upvoteMutation.isPending
                    }
                    onClick={() => {
                      if (!user) {
                        toast("Please login to upvote!");
                        navigate("/login");
                        return;
                      }
                      if (isOwner || alreadyUpvoted) return;
                      upvoteMutation.mutate({
                        productId: product._id,
                        userEmail: user.email,
                      });
                    }}
                  >
                    <FaArrowUp />
                    {product.upvotes}
                  </button>
                  <span className="text-xs text-gray-400 mt-2 block">
                    {isOwner
                      ? "You are the owner"
                      : alreadyUpvoted
                      ? "Upvoted"
                      : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProductsSection;
