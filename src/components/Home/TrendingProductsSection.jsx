import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { Link } from "react-router";
import { FaFire } from "react-icons/fa";
import Container from "../Container";

const TrendingProductsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trending-products/trending");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-2 text-center text-cyan-400 flex items-center justify-center gap-2">
        Trending Now
      </h2>
      <p className="text-center mb-8 text-xl">
        "The Latest Tech Everyone’s Buzzing About"
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7  mx-auto">
        {products.length === 0 ? (
          <div className="col-span-3 text-center text-orange-600">
            No trending products yet.
          </div>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              className="card bg-[#1D232A] shadow-lg rounded-xl  hover:scale-105 transition"
            >
              <figure className="px-4 pt-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-xl w-full h-72 object-cover"
                />
              </figure>
              <div className="card-body flex-1 flex flex-col">
                <Link
                  to={`/product/${p._id}`}
                  className="card-title text-cyan-600 text-xl hover:text-orange-400 duration-150"
                >
                  {p.name}
                </Link>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.tags?.map((tag) => (
                    <span key={tag} className=" text-white ">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className=" bg-[#06B6D4] text-white px-2 py-1 rounded-xl">
                    Upvotes: {p.upvotes || 0}
                  </span>
                  {p.status === "featured" && (
                    <span className="badge badge-info">Featured</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
