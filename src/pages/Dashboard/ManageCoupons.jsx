import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import { format } from "date-fns";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);

  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // Add coupon mutation
  const addCouponMutation = useMutation({
    mutationFn: async (data) => {
      await axiosSecure.post("/coupons", data);
    },
    onSuccess: () => {
      toast.success("Coupon added!");
      setFormOpen(false);
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add coupon.");
    },
  });

  // Update coupon mutation
  const updateCouponMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosSecure.patch(`/coupons/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Coupon updated!");
      setEditCoupon(null);
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update coupon.");
    },
  });

  // Delete coupon mutation
  const deleteCouponMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      toast.success("Coupon deleted.");
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: () => {
      toast.error("Delete failed.");
    },
  });

  // Add coupon handler
  const handleAddCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      code: form.code.value.trim().toUpperCase(),
      discount: Number(form.discount.value),
      expiresAt: form.expiresAt.value,
      usageLimit: Number(form.usageLimit.value),
    };
    addCouponMutation.mutate(data);
  };

  // Update coupon handler
  const handleUpdateCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      code: form.code.value.trim().toUpperCase(),
      discount: Number(form.discount.value),
      expiresAt: form.expiresAt.value,
      usageLimit: Number(form.usageLimit.value),
    };
    updateCouponMutation.mutate({ id: editCoupon._id, data });
  };

  return (
    <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-cyan-700">Manage Coupons</h2>
      <button
        className="btn btn-accent mb-5"
        onClick={() => {
          setEditCoupon(null);
          setFormOpen((o) => !o);
        }}
      >
        {formOpen ? "Close Form" : "Add Coupon"}
      </button>
      {/* Add Coupon Form */}
      {formOpen && (
        <form
          onSubmit={handleAddCoupon}
          className="bg-base-200 p-4 rounded-xl mb-8 flex flex-wrap gap-3"
        >
          <input
            name="code"
            type="text"
            placeholder="Code"
            className="input input-bordered w-full md:w-32"
            required
          />
          <input
            name="discount"
            type="number"
            min={1}
            max={100}
            placeholder="Discount (%)"
            className="input input-bordered w-full md:w-32"
            required
          />
          <input
            name="expiresAt"
            type="date"
            className="input input-bordered w-full md:w-40"
            required
          />
          <input
            name="usageLimit"
            type="number"
            min={1}
            placeholder="Usage Limit"
            className="input input-bordered w-full md:w-32"
            required
          />
          <button type="submit" className="btn btn-success w-full md:w-auto">
            {addCouponMutation.isLoading ? "Adding..." : "Add"}
          </button>
        </form>
      )}
      {/* Update Coupon Modal/Form */}
      {editCoupon && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateCoupon}
            className="bg-base-100 p-8 rounded-2xl shadow-xl min-w-[300px] flex flex-col gap-3"
          >
            <h3 className="text-lg font-bold text-cyan-600 mb-2">
              Update Coupon
            </h3>
            <input
              name="code"
              type="text"
              placeholder="Code"
              defaultValue={editCoupon.code}
              className="input input-bordered"
              required
            />
            <input
              name="discount"
              type="number"
              min={1}
              max={100}
              placeholder="Discount (%)"
              defaultValue={editCoupon.discount}
              className="input input-bordered"
              required
            />
            <input
              name="expiresAt"
              type="date"
              defaultValue={format(
                new Date(editCoupon.expiresAt),
                "yyyy-MM-dd"
              )}
              className="input input-bordered"
              required
            />
            <input
              name="usageLimit"
              type="number"
              min={1}
              defaultValue={editCoupon.usageLimit}
              placeholder="Usage Limit"
              className="input input-bordered"
              required
            />

            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-success flex-1">
                {updateCouponMutation.isLoading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => setEditCoupon(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {isLoading ? (
        <Loading />
      ) : coupons.length === 0 ? (
        <div className="text-center text-cyan-500">No coupons found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="text-cyan-500 text-base">
                <th>Code</th>
                <th>Discount</th>
                <th>Expires</th>
                <th>Usage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td className="font-bold">{c.code}</td>
                  <td>{c.discount}%</td>
                  <td>{format(new Date(c.expiresAt), "yyyy-MM-dd")}</td>
                  <td>
                    {c.used}/{c.usageLimit}
                  </td>
                  <td className="flex gap-1">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => {
                        setEditCoupon(c);
                        setFormOpen(false);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() =>
                        window.confirm("Delete this coupon?") &&
                        deleteCouponMutation.mutate(c._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
