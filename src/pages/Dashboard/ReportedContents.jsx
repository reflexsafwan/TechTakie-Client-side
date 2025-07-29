// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../components/Loading";
// import toast from "react-hot-toast";
// import { Link } from "react-router";

// const ReportedContents = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch reported products
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["reportedProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products/reported");
//       return res.data;
//     },
//   });

//   // Clear reports mutation
//   const clearReportsMutation = useMutation({
//     mutationFn: async (id) => {
//       await axiosSecure.patch(`/products/clear-reports/${id}`);
//     },
//     onSuccess: () => {
//       toast.success("Reports cleared!");
//       queryClient.invalidateQueries(["reportedProducts"]);
//     },
//     onError: () => {
//       toast.error("Failed to clear reports.");
//     },
//   });

//   // Accept/Reject/Feature mutations (reuse your review logic)
//   // ... reuse reviewMutation, featureMutation as in review queue

//   return (
//     <div className="card w-full max-w-5xl bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-cyan-400">
//         Reported Products
//       </h2>
//       {isLoading ? (
//         <Loading />
//       ) : products.length === 0 ? (
//         <div className="text-center text-cyan-200 py-10">
//           No reported products found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full">
//             <thead>
//               <tr className="text-cyan-300 text-base">
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Owner</th>
//                 <th>Reports</th>
//                 <th>View</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id}>
//                   <td>
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-14 h-14 rounded-lg border border-cyan-400 object-cover"
//                     />
//                   </td>
//                   <td className="font-bold text-cyan-200">{p.name}</td>
//                   <td>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={p.ownerPhoto || "/default-avatar.png"}
//                         alt={p.ownerName}
//                         className="w-8 h-8 rounded-full border border-cyan-300"
//                       />
//                       <span className="text-cyan-100">{p.ownerName}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <ul className="text-xs text-red-300">
//                       {p.reports?.map((r, idx) => (
//                         <li key={idx}>
//                           <span className="font-bold">{r.email}</span>:{" "}
//                           {r.reason}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>
//                     <Link
//                       to={`/dashboard/products/${p._id}`}
//                       className="btn btn-xs btn-info"
//                     >
//                       Details
//                     </Link>
//                   </td>
//                   <td className="flex flex-col gap-2">
//                     <button
//                       className="btn btn-xs btn-success"
//                       onClick={() => {
//                         // Accept logic (reuse your reviewMutation)
//                         // reviewMutation.mutate({ id: p._id, status: "accepted" })
//                       }}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="btn btn-xs btn-error"
//                       onClick={() => {
//                         // Reject logic
//                         // reviewMutation.mutate({ id: p._id, status: "rejected" })
//                       }}
//                     >
//                       Reject
//                     </button>
//                     <button
//                       className="btn btn-xs btn-accent"
//                       onClick={() => {
//                         // Feature logic
//                         // featureMutation.mutate({ id: p._id, featured: true })
//                       }}
//                     >
//                       Mark as Featured
//                     </button>
//                     <button
//                       className="btn btn-xs btn-warning"
//                       onClick={() => clearReportsMutation.mutate(p._id)}
//                     >
//                       Clear Reports
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportedContents;

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../components/Loading";
// import toast from "react-hot-toast";
// import { Link } from "react-router";

// const ReportedContents = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch reported products
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["reportedProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/reported-products");
//       return res.data;
//     },
//   });

//   // Clear reports mutation
//   const clearReportsMutation = useMutation({
//     mutationFn: async (id) => {
//       await axiosSecure.patch(`/products/clear-reports/${id}`);
//     },
//     onSuccess: () => {
//       toast.success("Reports cleared!");
//       queryClient.invalidateQueries(["reportedProducts"]);
//     },
//     onError: () => {
//       toast.error("Failed to clear reports.");
//     },
//   });

//   return (
//     <div className="card w-full max-w-5xl bg-base-100 shadow-xl rounded-2xl p-6 mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-cyan-400">
//         Reported Products
//       </h2>
//       {isLoading ? (
//         <Loading />
//       ) : products.length === 0 ? (
//         <div className="text-center text-cyan-200 py-10">
//           No reported products found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full">
//             <thead>
//               <tr className="text-cyan-500 text-base">
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Owner</th>
//                 <th>Reports</th>
//                 <th>View</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id}>
//                   <td>
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-14 h-14 rounded-lg border border-cyan-400 object-cover"
//                     />
//                   </td>
//                   <td className="font-bold text-cyan-700">{p.name}</td>
//                   <td>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={p.ownerPhoto || "/default-avatar.png"}
//                         alt={p.ownerName}
//                         className="w-8 h-8 rounded-full border border-cyan-300"
//                       />
//                       <span className="text-cyan-800">{p.ownerName}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <ul className="text-xs text-red-400">
//                       {p.reports?.map((r, idx) => (
//                         <li key={idx}>
//                           <span className="font-bold">{r.email}</span>:{" "}
//                           {r.reason}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>
//                     <Link
//                       to={`/dashboard/products/${p._id}`}
//                       className="btn btn-xs btn-info"
//                     >
//                       Details
//                     </Link>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-xs btn-warning"
//                       onClick={() => clearReportsMutation.mutate(p._id)}
//                     >
//                       Clear Reports
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportedContents;

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../components/Loading";
// import toast from "react-hot-toast";
// import { Link } from "react-router";

// const ReportedContents = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch reported products
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["reportedProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/reported-products");
//       return res.data;
//     },
//   });

//   // Clear reports mutation
//   const clearReportsMutation = useMutation({
//     mutationFn: async (id) => {
//       await axiosSecure.patch(`/products/clear-reports/${id}`);
//     },
//     onSuccess: () => {
//       toast.success("Reports cleared!");
//       queryClient.invalidateQueries(["reportedProducts"]);
//     },
//     onError: () => {
//       toast.error("Failed to clear reports.");
//     },
//   });

//   return (
//     <div className="card w-full max-w-6xl bg-base-100 shadow-xl rounded-2xl p-6 mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-cyan-400">
//         Reported Contents
//       </h2>
//       {isLoading ? (
//         <Loading />
//       ) : products.length === 0 ? (
//         <div className="text-center text-cyan-200 py-10">
//           No reported products found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full">
//             <thead>
//               <tr className="text-cyan-500 text-base">
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Owner</th>
//                 <th>Total Reports</th>
//                 <th>Report Comments</th>
//                 <th>View</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id}>
//                   <td>
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-14 h-14 rounded-lg border border-cyan-400 object-cover"
//                     />
//                   </td>
//                   <td className="font-bold text-cyan-700">{p.name}</td>
//                   <td>
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={p.ownerPhoto || "/default-avatar.png"}
//                         alt={p.ownerName}
//                         className="w-8 h-8 rounded-full border border-cyan-300"
//                       />
//                       <span className="text-cyan-800">{p.ownerName}</span>
//                     </div>
//                   </td>
//                   {/* Total Reports */}
//                   <td>
//                     <span className="badge badge-error text-white">
//                       {p.reports?.length || 0}
//                     </span>
//                   </td>
//                   {/* Report Comments */}
//                   <td>
//                     <ul className="text-xs text-red-600">
//                       {p.reports?.map((r, idx) => (
//                         <li key={idx} className="mb-1">
//                           <span className="font-bold text-cyan-700">
//                             {r.email}:
//                           </span>{" "}
//                           {r.reason}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td>
//                     <Link
//                       to={`/dashboard/products/${p._id}`}
//                       className="btn btn-xs btn-info"
//                     >
//                       Details
//                     </Link>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-xs btn-warning"
//                       onClick={() => clearReportsMutation.mutate(p._id)}
//                     >
//                       Clear Reports
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportedContents;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";

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
                              onClick={() => clearReportsMutation.mutate(p._id)}
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
  );
};

export default ReportedContents;
