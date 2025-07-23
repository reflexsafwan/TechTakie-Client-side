// src/components/HomeCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    headline: (
      <>
        Share Your <span className="text-yellow-300">Tech Product</span>
      </>
    ),
    desc: "Post, review, and upvote the coolest AI, software, and apps.",
    bg: "from-cyan-700/80 via-cyan-700/20 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    headline: (
      <>
        Discover Trending <span className="text-pink-300">AI Tools</span>
      </>
    ),
    desc: "Find the next big thing, powered by the TechieTake community.",
    bg: "from-blue-700/80 via-blue-700/10 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    headline: (
      <>
        Join <span className="text-lime-200">TechieTake</span>
      </>
    ),
    desc: "Build your network, become a moderator or admin, and get rewards!",
    bg: "from-violet-700/80 via-violet-700/20 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    headline: (
      <>
        Promote Your <span className="text-emerald-300">Startup</span>
      </>
    ),
    desc: "Showcase new SaaS, tools, and mobile apps. Get real feedback!",
    bg: "from-emerald-600/70 via-emerald-200/20 to-transparent",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    headline: (
      <>
        Explore <span className="text-orange-300">Games</span> & Mobile Apps
      </>
    ),
    desc: "Vote on and review trending mobile and indie games.",
    bg: "from-orange-600/70 via-orange-200/20 to-transparent",
  },
];

const HomeCarousel = () => (
  <section className="mt-6">
    <div className="text-center mb-5">
      <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-700 leading-tight">
        Welcome to <span className="text-blue-600">TechieTake</span>
      </h1>
      <p className="mt-2 text-gray-600 text-base md:text-lg font-medium">
        Discover, upvote, and share the best new tech products, AI tools, apps,
        and more!
      </p>
    </div>
    <div className="w-full rounded-xl shadow-md overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-[300px] md:h-[400px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                className="w-full h-[300px] md:h-[400px] object-cover"
                alt={`Tech Banner ${idx + 1}`}
              />
              <div
                className={`absolute inset-0 flex flex-col gap-2 justify-center items-start px-8 bg-gradient-to-r ${slide.bg}`}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow">
                  {slide.headline}
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-xl">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default HomeCarousel;
