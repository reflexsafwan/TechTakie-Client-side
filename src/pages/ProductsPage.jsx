// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { Link, useNavigate } from "react-router";
// import toast from "react-hot-toast";
// import { FaArrowUp, FaExternalLinkAlt } from "react-icons/fa";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import Loading from "../components/Loading";
// import { useContext, useMemo, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// const ProductsPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Search state
//   const [search, setSearch] = useState("");

//   // Fetch accepted products
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["acceptedProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/accepted-products");
//       return res.data;
//     },
//   });

//   // Upvote mutation
//   const upvoteMutation = useMutation({
//     mutationFn: async (id) => {
//       await axiosSecure.post("/products/upvote", { productId: id });
//     },
//     onSuccess: (_, id) => {
//       queryClient.invalidateQueries(["acceptedProducts"]);
//       toast.success("Upvoted!");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Upvote failed!");
//     },
//   });

//   // Filter products by search
//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return products;
//     return products.filter(
//       (p) =>
//         p.name?.toLowerCase().includes(q) ||
//         p.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
//         p.description?.toLowerCase().includes(q)
//     );
//   }, [search, products]);

//   if (isLoading) return <Loading />;

//   return (
//     <div className="max-w-7xl mx-auto py-10 px-3">
//       <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-700">
//         All Accepted Products
//       </h2>

//       {/* Search Bar */}
//       <div className="flex items-center justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search products by name, tag, or description..."
//           className="input input-bordered w-full max-w-xl text-lg bg-cyan-50"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Product Grid */}
//       {filtered.length === 0 ? (
//         <div className="text-center text-xl text-cyan-500 py-12">
//           No products found.
//         </div>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {filtered.map((p) => {
//             const alreadyUpvoted = user && p.upvotedUsers?.includes(user.email);
//             const isOwner = user && user.email === p.ownerEmail;

//             return (
//               <div
//                 key={p._id}
//                 className="card bg-white shadow-lg rounded-xl border border-cyan-100 flex flex-col transition hover:scale-[1.025]"
//               >
//                 <figure className="px-4 pt-4">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="rounded-xl w-full h-40 object-cover border border-cyan-200"
//                   />
//                 </figure>
//                 <div className="card-body flex-1 flex flex-col">
//                   <Link
//                     to={`/product/${p._id}`}
//                     className="card-title text-cyan-700 hover:text-cyan-400 duration-150"
//                   >
//                     {p.name}
//                   </Link>
//                   <div className="flex flex-wrap gap-1 mb-2">
//                     {p.tags?.map((tag) => (
//                       <span key={tag} className="badge badge-info text-white">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-cyan-800 text-sm line-clamp-3 mb-1">
//                     {p.description}
//                   </p>
//                   <div className="flex gap-2 mt-1">
//                     <a
//                       href={p.externalLinks}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="btn btn-xs btn-outline btn-accent flex gap-1 items-center"
//                     >
//                       <FaExternalLinkAlt /> Link
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-3 mt-3">
//                     <button
//                       className={`btn btn-xs btn-outline btn-success flex items-center gap-1 ${
//                         isOwner || alreadyUpvoted
//                           ? "btn-disabled opacity-70"
//                           : ""
//                       }`}
//                       title={
//                         !user
//                           ? "Login to upvote"
//                           : isOwner
//                           ? "You can't upvote your own product"
//                           : alreadyUpvoted
//                           ? "You already upvoted"
//                           : "Upvote"
//                       }
//                       onClick={() => {
//                         if (!user) return navigate("/login");
//                         if (isOwner || alreadyUpvoted) {
//                           toast.error(
//                             isOwner
//                               ? "You can't upvote your own product."
//                               : "You already upvoted."
//                           );
//                           return;
//                         }
//                         upvoteMutation.mutate(p._id);
//                       }}
//                     >
//                       <FaArrowUp /> {p.upvotes}
//                     </button>
//                     <Link
//                       to={`/product/${p._id}`}
//                       className="btn btn-xs btn-info ml-auto"
//                     >
//                       Details
//                     </Link>
//                   </div>
//                   <div className="flex items-center gap-2 mt-3">
//                     <img
//                       src={p.ownerPhoto || "/default-avatar.png"}
//                       alt={p.ownerName}
//                       className="w-8 h-8 rounded-full border border-cyan-300"
//                     />
//                     <div>
//                       <div className="font-bold text-cyan-700">
//                         {p.ownerName}
//                       </div>
//                       <div className="text-xs text-gray-400">
//                         {p.ownerEmail}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  FaArrowUp,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

const LIMIT = 9; // 3 cards per row, 3 rows per page

const ProductsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Search and pagination state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch paginated accepted products
  const {
    data = { products: [], total: 0, page: 1, pages: 1 },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["acceptedProducts", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: LIMIT,
        ...(search ? { search } : {}),
      }).toString();
      const res = await axiosSecure.get(`/accepted-products?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.post("/products/upvote", { productId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["acceptedProducts", page, search]);
      toast.success("Upvoted!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed!");
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  if (isLoading) return <Loading />;

  const { products, total, pages } = data;

  return (
    <div className="max-w-7xl mx-auto py-10 px-3">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-700">
        All Accepted Products
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mb-8"
      >
        <input
          type="text"
          placeholder="Search products by name, tag, or description..."
          className="input input-bordered w-full max-w-xl text-lg "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-info ml-2" type="submit">
          Search
        </button>
      </form>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center text-xl text-cyan-500 py-12">
          {isFetching ? "Loading..." : "No products found."}
        </div>
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => {
              const alreadyUpvoted =
                user && p.upvotedUsers?.includes(user.email);
              const isOwner = user && user.email === p.ownerEmail;
              return (
                <div
                  key={p._id}
                  className="card bg-base-100 bg-opacity-60 backdrop-blur-lg shadow-xl rounded-2xl border border-cyan-100 flex flex-col transition hover:scale-[1.025]"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="rounded-xl w-full h-40 object-cover border border-cyan-200"
                    />
                  </figure>
                  <div className="card-body flex-1 flex flex-col">
                    <Link
                      to={`/product/${p._id}`}
                      className="card-title text-cyan-700 hover:text-cyan-400 duration-150"
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
                    <p className="text-cyan-800 text-sm line-clamp-3 mb-1">
                      {p.description}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <a
                        href={p.externalLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-outline btn-accent flex gap-1 items-center"
                      >
                        <FaExternalLinkAlt /> Link
                      </a>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className={`btn btn-xs btn-outline btn-success flex items-center gap-1 ${
                          isOwner || alreadyUpvoted
                            ? "btn-disabled opacity-70"
                            : ""
                        }`}
                        title={
                          !user
                            ? "Login to upvote"
                            : isOwner
                            ? "You can't upvote your own product"
                            : alreadyUpvoted
                            ? "You already upvoted"
                            : "Upvote"
                        }
                        onClick={() => {
                          if (!user) return navigate("/login");
                          if (isOwner || alreadyUpvoted) {
                            toast.error(
                              isOwner
                                ? "You can't upvote your own product."
                                : "You already upvoted."
                            );
                            return;
                          }
                          upvoteMutation.mutate(p._id);
                        }}
                      >
                        <FaArrowUp /> {p.upvotes}
                      </button>
                      <Link
                        to={`/product/${p._id}`}
                        className="btn btn-xs btn-info ml-auto"
                      >
                        Details
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={p.ownerPhoto || "/default-avatar.png"}
                        alt={p.ownerName}
                        className="w-8 h-8 rounded-full border border-cyan-300"
                      />
                      <div>
                        <div className="font-bold text-cyan-700">
                          {p.ownerName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {p.ownerEmail}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              className="btn btn-xs btn-outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <FaChevronLeft /> Prev
            </button>
            <span className="font-bold text-cyan-700 mx-2">
              Page {page} of {pages}
            </span>
            <button
              className="btn btn-xs btn-outline"
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
            >
              Next <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
