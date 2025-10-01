






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
      <h2 className="text-2xl md:text-3xl font-bold text-center text-cyan-400 mb-2">
        Exclusive Coupons
      </h2>
      <p className="text-center mb-6 text-xl">"Grab Exclusive Discounts Before They’re Gone"</p>
      <div className="mx-auto">
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
                    "linear-gradient(135deg, #2aa4a8 0%, #a6c1ee 100%)",
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
                  <div className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaPercent className="text-2xl" />
                    {c.discount}% OFF
                  </div>
                  <div className=" text-lg font-bold my-2 flex items-center gap-2">
                    Coupon:
                    <span className="bg-[#2ce1e7] px-2 py-1 rounded-lg tracking-wider font-mono text-xl">
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
                  <div className="flex items-center gap-2 text-black text-md font-bold mb-2">
                    <FaClock /> Expires:{" "}
                    {format(new Date(c.expiresAt), "yyyy-MM-dd")}
                  </div>
                  <div className="text-black font-md italic mb-2">
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
