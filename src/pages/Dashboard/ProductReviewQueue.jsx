import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Container from "../../components/Container";

const ProductReviewQueue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pendig-products/review-queue");
      console.log(res.data);
      return res.data;
    },
  });

  // Accept/Reject
  const reviewMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/products/review/${id}`, { status });
    },
    onSuccess: () => {
      toast.success("Status updated!");
      queryClient.invalidateQueries(["pendingProducts"]);
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  // Mark as Featured
  const featureMutation = useMutation({
    mutationFn: async ({ id, featured }) => {
      await axiosSecure.patch(`/products/featured/${id}`, { featured });
    },
    onSuccess: () => {
      toast.success("Product marked as featured!");
      queryClient.invalidateQueries(["pendingProducts"]);
    },
    onError: () => {
      toast.error("Failed to feature product.");
    },
  });

  return (
    <Container>
      <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Product Review Queue
        </h2>
        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center text-cyan-200 py-10">
            No products pending review.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-cyan-300 text-base">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-lg border border-cyan-400 object-cover"
                      />
                    </td>
                    <td className="font-bold text-cyan-200">{p.name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={p.ownerPhoto || "/default-avatar.png"}
                          alt={p.ownerName}
                          className="w-8 h-8 rounded-full border border-cyan-300"
                        />
                        <span className="text-cyan-100">{p.ownerName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-warning text-base">
                        Pending
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/products/${p._id}`}
                        className="btn btn-xs btn-info"
                      >
                        Details
                      </Link>
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-xs btn-success"
                        disabled={reviewMutation.isLoading}
                        onClick={() =>
                          reviewMutation.mutate({
                            id: p._id,
                            status: "accepted",
                          })
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        disabled={reviewMutation.isLoading}
                        onClick={() =>
                          reviewMutation.mutate({
                            id: p._id,
                            status: "rejected",
                          })
                        }
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-xs btn-accent"
                        disabled={featureMutation.isLoading}
                        onClick={() =>
                          featureMutation.mutate({ id: p._id, featured: true })
                        }
                      >
                        Mark as Featured
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductReviewQueue;
