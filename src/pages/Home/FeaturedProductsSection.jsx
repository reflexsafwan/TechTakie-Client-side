

import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { FaArrowUp, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const FeaturedProductsSection = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch featured products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-products");
      return res.data;
    },
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.post("/products/upvote", { productId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["featuredProducts"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed. Try again!");
    },
  });

  // Upvote logic for button
  const handleUpvote = (product) => {
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
          : "You have already upvoted."
      );
      return;
    }
    upvoteMutation.mutate(product._id);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400 flex items-center justify-center gap-2">
        <FaStar className="text-yellow-400" /> Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-4 text-center text-cyan-200">
            No featured products yet.
          </div>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-xl border border-cyan-100 flex flex-col"
            >
              <figure className="px-4 pt-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-xl w-full h-36 object-cover"
                />
              </figure>
              <div className="card-body flex-1 flex flex-col">
                <Link
                  to={`/product/${p._id}`}
                  className="card-title text-cyan-700 hover:text-cyan-500 duration-150 cursor-pointer"
                >
                  {p.name}
                </Link>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.tags?.map((tag) => (
                    <span key={tag} className="badge badge-info text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="btn btn-sm btn-outline flex items-center gap-2 mt-auto"
                  // Button is always clickable, but logic handles the restriction
                  onClick={() => handleUpvote(p)}
                  title={
                    !user
                      ? "Login to upvote"
                      : p.ownerEmail === user.email
                      ? "You can't upvote your own product"
                      : p.upvotedUsers?.includes(user.email)
                      ? "You already upvoted"
                      : "Upvote"
                  }
                >
                  <FaArrowUp />
                  <span>{p.upvotes || 0}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
