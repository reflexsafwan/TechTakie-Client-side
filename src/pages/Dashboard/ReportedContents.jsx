import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Container from "../../components/Container";

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch reported products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-products");
      return res.data;
    },
  });

  // Clear reports mutation
  const clearReportsMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/products/clear-reports/${id}`);
    },
    onSuccess: () => {
      toast.success("Reports cleared!");
      queryClient.invalidateQueries(["reportedProducts"]);
    },
    onError: () => {
      toast.error("Failed to clear reports.");
    },
  });

  return (
    <Container>
      <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Reported Contents
        </h2>
        {isLoading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center text-cyan-200 py-10">
            No reported products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-cyan-500 text-base">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Owner</th>
                  <th>Total Reports</th>
                  <th>Reporter Email</th>
                  <th>Report Reason</th>
                  <th>View</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.flatMap((p) =>
                  (p.reports && p.reports.length > 0 ? p.reports : [null]).map(
                    (report, idx) => (
                      <tr key={p._id + (report ? `_${idx}` : "")}>
                        {idx === 0 ? (
                          <>
                            <td rowSpan={p.reports.length}>
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-14 h-14 rounded-lg border border-cyan-400 object-cover"
                              />
                            </td>
                            <td
                              rowSpan={p.reports.length}
                              className="font-bold text-cyan-700"
                            >
                              {p.name}
                            </td>
                            <td rowSpan={p.reports.length}>
                              <div className="flex items-center gap-2">
                                <img
                                  src={p.ownerPhoto || "/default-avatar.png"}
                                  alt={p.ownerName}
                                  className="w-8 h-8 rounded-full border border-cyan-300"
                                />
                                <span className="text-cyan-800">
                                  {p.ownerName}
                                </span>
                              </div>
                            </td>
                            <td rowSpan={p.reports.length}>
                              <span className="badge badge-error text-white">
                                {p.reports.length}
                              </span>
                            </td>
                          </>
                        ) : null}
                        <td>{report?.email || "-"}</td>
                        <td>{report?.reason || "-"}</td>
                        {idx === 0 ? (
                          <>
                            <td rowSpan={p.reports.length}>
                              <Link
                                to={`/dashboard/products/${p._id}`}
                                className="btn btn-xs btn-info"
                              >
                                Details
                              </Link>
                            </td>
                            <td rowSpan={p.reports.length}>
                              <button
                                className="btn btn-xs btn-warning"
                                onClick={() =>
                                  clearReportsMutation.mutate(p._id)
                                }
                              >
                                Clear Reports
                              </button>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ReportedContents;
