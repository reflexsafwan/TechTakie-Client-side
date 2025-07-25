// ValuePropositionSection.jsx
import { FaUsers, FaTrophy, FaBolt } from "react-icons/fa";

const ValuePropositionSection = () => (
  <section className="my-16 py-10 bg-gradient-to-r from-cyan-100 to-blue-50 rounded-2xl shadow-lg">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-700 mb-3">
        Why Join <span className="text-cyan-400">TechieTake</span>?
      </h2>
      <p className="text-cyan-800 text-lg mb-8">
        Discover, upvote, and share the best tech products with a thriving
        community of innovators!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
      <p className="mt-10 text-cyan-900 font-semibold">
        <span className="text-cyan-700">Join now</span> and help shape
        tomorrow’s technology!
      </p>
    </div>
  </section>
);

export default ValuePropositionSection;
