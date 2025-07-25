// TopContributorsSection.jsx
import { FaCrown } from "react-icons/fa";

// Demo data (replace with real user data if you wish)
const contributors = [
  {
    name: "Sara Techie",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    tagline: "AI Enthusiast",
    products: 12,
    upvotes: 120,
  },
  {
    name: "John Coder",
    photo: "https://randomuser.me/api/portraits/men/42.jpg",
    tagline: "Full Stack Dev",
    products: 9,
    upvotes: 95,
  },
  {
    name: "Rina Cloud",
    photo: "https://randomuser.me/api/portraits/women/88.jpg",
    tagline: "Cloud Engineer",
    products: 7,
    upvotes: 82,
  },
];

const TopContributorsSection = () => (
  <section className="my-16 py-10 bg-base-100 rounded-2xl shadow-lg">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 mb-4">
        <FaCrown className="inline mr-2 text-yellow-400" />
        Meet the Makers
      </h2>
      <p className="text-cyan-700 text-lg mb-8">
        Our top contributors who help shape the TechieTake community!
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {contributors.map((contrib, ) => (
          <div
            key={contrib.name}
            className="flex flex-col items-center bg-cyan-50 rounded-xl p-6 shadow w-full md:w-1/3 hover:scale-105 transition"
          >
            <img
              src={contrib.photo}
              alt={contrib.name}
              className="w-20 h-20 rounded-full border-4 border-cyan-300 mb-3"
            />
            <h3 className="text-lg font-bold text-cyan-900">{contrib.name}</h3>
            <div className="text-cyan-700 mb-2">{contrib.tagline}</div>
            <div className="flex gap-6 mt-1 text-cyan-800">
              <span>
                <span className="font-bold">{contrib.products}</span> Products
              </span>
              <span>
                <span className="font-bold">{contrib.upvotes}</span> Upvotes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TopContributorsSection;
