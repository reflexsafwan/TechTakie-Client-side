// import { useContext, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { AuthContext } from "../../providers/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../components/Loading";
// import toast from "react-hot-toast";
// import { FaArrowUp, FaFlag, FaStar } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const ProductDetails2 = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   // Fetch product details
//   const { data: product, isLoading } = useQuery({
//     queryKey: ["productDetails", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//   });

//   // Upvote mutation
//   const upvoteMutation = useMutation({
//     mutationFn: async () => {
//       await axiosSecure.post("/products/upvote", { productId: id });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["productDetails", id]);
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Upvote failed.");
//     },
//   });

//   // Report mutation
//   const reportMutation = useMutation({
//     mutationFn: async (reason) => {
//       await axiosSecure.post(`/products/report/${id}`, { reason });
//     },
//     onSuccess: () => {
//       toast.success("Product reported!");
//     },
//     onError: (err) => {
//       toast.error(err?.response?.data?.message || "Report failed.");
//     },
//   });

//   // Reviews
//   const { data: reviews = [], isLoading: loadingReviews } = useQuery({
//     queryKey: ["reviews", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/reviews/${id}`);
//       return res.data;
//     },
//   });

//   // Post review mutation
//   const reviewMutation = useMutation({
//     mutationFn: async (data) => {
//       await axiosSecure.post("/reviews", data);
//     },
//     onSuccess: () => {
//       toast.success("Review posted!");
//       queryClient.invalidateQueries(["reviews", id]);
//     },
//     onError: () => {
//       toast.error("Failed to post review.");
//     },
//   });

//   // Review form state
//   const [reviewDesc, setReviewDesc] = useState("");
//   const [rating, setRating] = useState(5);

//   const handleUpvote = () => {
//     if (!user) return navigate("/login");
//     if (
//       product.ownerEmail === user.email ||
//       product.upvotedUsers?.includes(user.email)
//     ) {
//       toast.error("You can't upvote this product again.");
//       return;
//     }
//     upvoteMutation.mutate();
//   };

//   const handleReport = () => {
//     if (!user) return navigate("/login");
//     const reason = prompt("Please enter reason for report:");
//     if (reason) reportMutation.mutate(reason);
//   };

//   const handleReview = (e) => {
//     e.preventDefault();
//     if (!user) return navigate("/login");
//     if (!reviewDesc.trim() || !rating) {
//       toast.error("Write a review and rating!");
//       return;
//     }
//     reviewMutation.mutate({
//       productId: id,
//       description: reviewDesc.trim(),
//       rating,
//     });
//     setReviewDesc("");
//     setRating(5);
//   };

//   if (isLoading || !product) return <Loading />;

//   return (
//     <div className="max-w-3xl mx-auto py-8">
//       {/* Product Info */}
//       <div className="card bg-base-100 shadow-xl p-6 mb-8">
//         <div className="flex flex-col md:flex-row gap-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full md:w-64 h-48 object-cover rounded-xl border-2 border-cyan-400"
//           />
//           <div className="flex-1 flex flex-col">
//             <h2 className="text-2xl font-bold text-cyan-700 mb-2">
//               {product.name}
//             </h2>
//             <div className="flex flex-wrap gap-2 mb-2">
//               {product.tags.map((tag) => (
//                 <span key={tag} className="badge badge-info">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//             <div className="mb-2 text-cyan-900">{product.description}</div>
//             <a
//               href={product.externalLinks}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-sm btn-accent mb-2 w-max"
//             >
//               Visit Site
//             </a>
//             <div className="flex items-center gap-4 mt-auto">
//               <button
//                 className="btn btn-outline btn-success btn-xs flex items-center gap-1"
//                 onClick={handleUpvote}
//                 title="Upvote"
//               >
//                 <FaArrowUp /> {product.upvotes}
//               </button>
//               <button
//                 className="btn btn-outline btn-error btn-xs flex items-center gap-1"
//                 onClick={handleReport}
//                 title="Report"
//               >
//                 <FaFlag /> Report
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
//         <h3 className="text-xl font-bold text-cyan-700 mb-3">Reviews</h3>
//         {loadingReviews ? (
//           <Loading />
//         ) : reviews.length === 0 ? (
//           <div className="text-cyan-600">No reviews yet.</div>
//         ) : (
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={24}
//             className="my-4"
//             autoplay={{ delay: 5000 }}
//           >
//             {reviews.map((r, idx) => (
//               <SwiperSlide key={idx}>
//                 <div className="card bg-cyan-50 p-4 flex flex-col gap-2 shadow">
//                   <div className="flex gap-2 items-center">
//                     <img
//                       src={r.reviewerPhoto || "/default-avatar.png"}
//                       alt={r.reviewerName}
//                       className="w-10 h-10 rounded-full border border-cyan-200"
//                     />
//                     <div>
//                       <div className="font-bold text-cyan-800">
//                         {r.reviewerName}
//                       </div>
//                       <div className="text-xs text-cyan-600">
//                         {r.reviewerEmail}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-2 mb-1 text-cyan-900">{r.description}</div>
//                   <div className="flex items-center gap-1">
//                     <FaStar className="text-yellow-400" />
//                     <span className="text-cyan-800">{r.rating}/5</span>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>

//       {/* Post Review Section */}
//       <div className="bg-base-100 rounded-xl shadow p-6">
//         <h3 className="text-xl font-bold text-cyan-700 mb-3">Post a Review</h3>
//         {user ? (
//           <form className="flex flex-col gap-3" onSubmit={handleReview}>
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 value={user.displayName}
//                 readOnly
//                 className="input input-bordered flex-1"
//               />
//               <input
//                 type="text"
//                 value={user.email}
//                 readOnly
//                 className="input input-bordered flex-1"
//               />
//               <img
//                 src={user.photoURL || "/default-avatar.png"}
//                 alt={user.displayName}
//                 className="w-10 h-10 rounded-full border border-cyan-200"
//               />
//             </div>
//             <textarea
//               className="textarea textarea-bordered"
//               rows={3}
//               placeholder="Write your review..."
//               value={reviewDesc}
//               onChange={(e) => setReviewDesc(e.target.value)}
//               required
//             />
//             <div className="flex items-center gap-2">
//               <label className="font-semibold">Rating:</label>
//               <select
//                 className="select select-bordered w-max"
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//               >
//                 {[5, 4, 3, 2, 1].map((v) => (
//                   <option key={v} value={v}>
//                     {v}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary w-max mt-2">
//               Submit Review
//             </button>
//           </form>
//         ) : (
//           <div className="text-cyan-700">Login to post a review.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails2;

import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaArrowUp, FaFlag, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductDetails = () => {
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
      queryClient.invalidateQueries(["productDetails", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Upvote failed.");
    },
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: async (reason) => {
      await axiosSecure.post(`/products/report/${id}`, { reason });
    },
    onSuccess: () => {
      toast.success("Product reported!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Report failed.");
    },
  });

  // Reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Post review mutation
  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      await axiosSecure.post("/reviews", data);
    },
    onSuccess: () => {
      toast.success("Review posted!");
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => {
      toast.error("Failed to post review.");
    },
  });

  // Review form state
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState(5);

  const handleUpvote = () => {
    if (!user) return navigate("/login");
    if (
      product.ownerEmail === user.email ||
      product.upvotedUsers?.includes(user.email)
    ) {
      toast.error("You can't upvote this product again.");
      return;
    }
    upvoteMutation.mutate();
  };

  // Handle report with SweetAlert2
  const handleReport = async () => {
    if (!user) return navigate("/login");
    const { value: reason } = await Swal.fire({
      title: "Report Product",
      input: "text",
      inputLabel: "Reason for reporting:",
      inputPlaceholder: "Enter your reason...",
      inputValidator: (value) => !value && "You must write a reason!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // daisyUI error
      confirmButtonText: "Report",
      cancelButtonText: "Cancel",
      icon: "warning",
    });
    if (reason) {
      reportMutation.mutate(reason);
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!reviewDesc.trim() || !rating) {
      toast.error("Write a review and rating!");
      return;
    }
    reviewMutation.mutate({
      productId: id,
      description: reviewDesc.trim(),
      rating,
    });
    setReviewDesc("");
    setRating(5);
  };

  if (isLoading || !product) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Product Info */}
      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-64 h-48 object-cover rounded-xl border-2 border-cyan-400"
          />
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-cyan-700 mb-2">
              {product.name}
            </h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge badge-info">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-2 text-cyan-900">{product.description}</div>
            <a
              href={product.externalLinks}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-accent mb-2 w-max"
            >
              Visit Site
            </a>
            <div className="flex items-center gap-4 mt-auto">
              <button
                className="btn btn-outline btn-success btn-xs flex items-center gap-1"
                onClick={handleUpvote}
                title="Upvote"
              >
                <FaArrowUp /> {product.upvotes}
              </button>
              <button
                className="btn btn-outline btn-error btn-xs flex items-center gap-1"
                onClick={handleReport}
                title="Report"
              >
                <FaFlag /> Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-base-100 rounded-xl shadow p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-700 mb-3">Reviews</h3>
        {loadingReviews ? (
          <Loading />
        ) : reviews.length === 0 ? (
          <div className="text-cyan-600">No reviews yet.</div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            className="my-4"
            autoplay={{ delay: 5000 }}
          >
            {reviews.map((r, idx) => (
              <SwiperSlide key={idx}>
                <div className="card bg-cyan-50 p-4 flex flex-col gap-2 shadow-md border-2 border-cyan-100">
                  <div className="flex gap-2 items-center">
                    <img
                      src={r.reviewerPhoto || "/default-avatar.png"}
                      alt={r.reviewerName}
                      className="w-10 h-10 rounded-full border border-cyan-200"
                    />
                    <div>
                      <div className="font-bold text-cyan-800">
                        {r.reviewerName}
                      </div>
                      <div className="text-xs text-cyan-600">
                        {r.reviewerEmail}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-1 text-cyan-900 italic">
                    {r.description}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < r.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-cyan-800 font-semibold ml-2">
                      {r.rating}/5
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Post Review Section */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        <h3 className="text-xl font-bold text-cyan-700 mb-3">Post a Review</h3>
        {user ? (
          <form className="flex flex-col gap-3" onSubmit={handleReview}>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered flex-1"
              />
              <input
                type="text"
                value={user.email}
                readOnly
                className="input input-bordered flex-1"
              />
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={user.displayName}
                className="w-10 h-10 rounded-full border border-cyan-200"
              />
            </div>
            <textarea
              className="textarea textarea-bordered"
              rows={3}
              placeholder="Write your review..."
              value={reviewDesc}
              onChange={(e) => setReviewDesc(e.target.value)}
              required
            />
            <div className="flex items-center gap-2">
              <label className="font-semibold">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <FaStar
                    key={v}
                    className={`cursor-pointer text-2xl ${
                      rating >= v ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(v)}
                  />
                ))}
                <span className="ml-2 text-cyan-600 font-bold">{rating}/5</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-max mt-2">
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-cyan-700">Login to post a review.</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
