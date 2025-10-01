import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsCounter() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const stats = [
    { id: 1, title: "Active Members", end: 12000, suffix: "+" },
    { id: 2, title: "Downloads", end: 50000, suffix: "+" },
    { id: 3, title: "Featured Products", end: 850, suffix: "+" },
    { id: 4, title: "Client Satisfaction", end: 98, suffix: "%" },
  ];

  return (
    <section ref={ref} className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-4xl font-bold text-cyan-400">
              {inView && <CountUp end={stat.end} duration={10} />} {stat.suffix}
            </h2>
            <p className="mt-2 text-gray-300">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
