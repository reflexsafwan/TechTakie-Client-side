// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import { FaTag, FaPercent } from "react-icons/fa";
// import { format } from "date-fns";

// const apiUrl = import.meta.env.VITE_API_URL;

// const CouponCarouselSection = () => {
//   const { data: coupons = [], isLoading } = useQuery({
//     queryKey: ["activeCoupons"],
//     queryFn: async () => {
//       const res = await axios.get(`${apiUrl}/coupons/active`);
//       return res.data;
//     },
//   });

//   if (isLoading || coupons.length === 0) return null;

//   return (
//     <section className="my-12">
//       <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-5">
//         <FaTag className="inline-block mb-1 mr-1" /> Exclusive Coupons
//       </h2>
//       <div className="max-w-3xl mx-auto">
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={24}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           loop
//         >
//           {coupons.map((c) => (
//             <SwiperSlide key={c.code}>
//               <div className="card bg-gradient-to-r from-purple-700 to-cyan-500 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
//                 <div className="flex flex-col flex-1 items-center md:items-start">
//                   <div className="text-3xl font-extrabold text-purple-700 flex items-center gap-2">
//                     <FaPercent className="text-2xl" /> {c.discount}% OFF
//                   </div>
//                   <div className="text-purple-900 text-lg font-bold my-2">
//                     Coupon:{" "}
//                     <span className="bg-purple-200 px-2 py-1 rounded-lg tracking-wider">
//                       {c.code}
//                     </span>
//                   </div>
//                   <div className="text-gray-700 text-sm mb-2">
//                     Expires: {format(new Date(c.expiresAt), "yyyy-MM-dd")}
//                   </div>
//                   <div className="text-gray-900 italic mb-2">
//                     {c.description ||
//                       "Use this coupon to unlock a special deal!"}
//                   </div>
//                 </div>
//                 <div className="flex-0">
//                   <div className="badge badge-accent text-lg p-4 animate-pulse">
//                     Use for Membership Discounts!
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default CouponCarouselSection;






import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaPercent, FaClock, FaTag, FaCopy } from "react-icons/fa";
import { format } from "date-fns";
import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

const CouponCarouselSection = () => {
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["activeCoupons"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/coupons/active`);
      return res.data;
    },
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!");
  };

  if (isLoading || coupons.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-5">
        <FaTag className="inline-block mb-1 mr-1" /> Exclusive Coupons
      </h2>
      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
        >
          {coupons.map((c) => (
            <SwiperSlide key={c.code}>
              <div
                className="card p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6"
                style={{
                  background:
                    "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradientMove 8s ease-in-out infinite",
                }}
              >
                <style>
                  {`
                  @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
                </style>
                <div className="flex flex-col flex-1 items-center md:items-start">
                  <div className="text-3xl font-extrabold text-purple-700 flex items-center gap-2">
                    <FaPercent className="text-2xl" /> {c.discount}% OFF
                  </div>
                  <div className="text-purple-900 text-lg font-bold my-2 flex items-center gap-2">
                    Coupon:
                    <span className="bg-purple-200 px-2 py-1 rounded-lg tracking-wider font-mono text-xl">
                      {c.code}
                    </span>
                    <button
                      className="btn btn-xs btn-outline btn-circle"
                      title="Copy code"
                      onClick={() => handleCopy(c.code)}
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                    <FaClock /> Expires:{" "}
                    {format(new Date(c.expiresAt), "yyyy-MM-dd")}
                  </div>
                  <div className="text-gray-900 italic mb-2">
                    {c.description ||
                      "Use this coupon to unlock a special deal!"}
                  </div>
                </div>
                <div className="flex-0">
                  <div className="badge badge-accent text-lg p-4 animate-pulse">
                    Use for Membership Discounts!
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CouponCarouselSection;
