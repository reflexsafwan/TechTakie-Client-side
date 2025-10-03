import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import Container from "../../components/Container";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch my products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries(["myProducts", user?.email]);
    },
    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  // Handler for delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete mutation or axios here
        // Example:
        axiosSecure
          .delete(`/products/${id}`)
          .then(() => {
            toast.success("Product deleted!");
            navigate("/dashboard/my-products");
          })
          .catch(() => {
            toast.error("Failed to delete product.");
          });
      }
    });
  };

  // Handler for update (navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-product/${id}`);
  };

  return (
    <Container>
      {" "}
      <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">My Products</h2>
        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center text-cyan-200 py-10">
            You haven&apos;t added any products yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-cyan-300 text-base">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Tags</th>
                  <th>Status</th>
                  <th>Upvotes</th>
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
                    <td>
                      <span className="font-bold text-cyan-200">{p.name}</span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {p.tags?.map((tag) => (
                          <span key={tag} className=" text-white p-4">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          p.status === "accepted"
                            ? "badge-success"
                            : p.status === "pending"
                            ? "badge-warning"
                            : p.status === "featured"
                            ? "badge-info"
                            : "badge-error"
                        } text-base`}
                      >
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="text-cyan-300 font-semibold">
                        {p.upvotes}
                      </span>
                    </td>
                    <td className="flex gap-2 ">
                      <Link
                        to={`/dashboard/products/${p._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>
                      <button
                        className="btn btn-xs btn-warning text-white"
                        onClick={() => handleUpdate(p._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-xs btn-error text-white"
                        onClick={() => handleDelete(p._id)}
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Delete"
                        )}
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

export default MyProducts;
