// ValuePropositionSection.jsx
import { FaUsers, FaTrophy, FaBolt } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const ValuePropositionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const stats = [
    { id: 1, title: "Active Users", end: 12000, suffix: "+" },
    { id: 2, title: "Downloads", end: 50000, suffix: "+" },
    { id: 3, title: "Projects Completed", end: 850, suffix: "+" },
    { id: 4, title: "Client Satisfaction", end: 98, suffix: "%" },
  ];

  return (
    <section
      ref={ref}
      className="my-16 py-10 bg-gradient-to-r from-cyan-100 to-blue-50 rounded-2xl shadow-lg"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 mb-3">
          Why Join <span className="text-cyan-400">TechieTake</span>?
        </h2>
        <p className="text-cyan-800 text-lg mb-8">
          Discover, upvote, and share the best tech products with a thriving
          community of innovators!
        </p>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow transition hover:scale-105">
          <FaUsers className="text-cyan-500 text-4xl mb-2" />
          <div className="text-2xl font-bold text-cyan-700">5,000+</div>
          <div className="text-cyan-900 mt-1">Active Members</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow transition hover:scale-105">
          <FaTrophy className="text-yellow-500 text-4xl mb-2" />
          <div className="text-2xl font-bold text-yellow-600">300+</div>
          <div className="text-cyan-900 mt-1">Featured Products</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow transition hover:scale-105">
          <FaBolt className="text-cyan-700 text-4xl mb-2" />
          <div className="text-2xl font-bold text-cyan-700">Instant</div>
          <div className="text-cyan-900 mt-1">Upvotes & Community Feedback</div>
        </div>
      </div> */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-cyan-400">
                {inView && <CountUp end={stat.end} duration={10} />}{" "}
                {stat.suffix}
              </h2>
              <p className="mt-2 text-gray-300">{stat.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-cyan-900 font-semibold">
          <span className="text-cyan-700">Join now</span> and help shape
          tomorrow’s technology!
        </p>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
