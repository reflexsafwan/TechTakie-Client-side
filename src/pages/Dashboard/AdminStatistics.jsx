import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  FaUsers, FaProductHunt, FaStar, FaRegThumbsUp, FaCommentDots, FaHourglassHalf, FaFlag
} from "react-icons/fa";

const COLORS = ["#06b6d4", "#fbbf24", "#e11d48", "#6366f1", "#84cc16", "#f59e42"];

const statsConfig = [
  {
    label: "Total Users",
    icon: <FaUsers className="text-cyan-500 text-3xl" />,
    field: "users",
    color: "bg-cyan-100"
  },
  {
    label: "Total Products",
    icon: <FaProductHunt className="text-orange-500 text-3xl" />,
    field: "totalProducts",
    color: "bg-orange-100"
  },
  {
    label: "Featured Products",
    icon: <FaStar className="text-yellow-400 text-3xl" />,
    field: "featured",
    color: "bg-yellow-100"
  },
  {
    label: "Total Upvotes",
    icon: <FaRegThumbsUp className="text-green-500 text-3xl" />,
    field: "totalUpvotes",
    color: "bg-green-100"
  },
  {
    label: "Total Reviews",
    icon: <FaCommentDots className="text-purple-500 text-3xl" />,
    field: "reviews",
    color: "bg-purple-100"
  },
  {
    label: "Pending Products",
    icon: <FaHourglassHalf className="text-blue-500 text-3xl" />,
    field: "pending",
    color: "bg-blue-100"
  },
  {
    label: "Reported Products",
    icon: <FaFlag className="text-red-500 text-3xl" />,
    field: "reported",
    color: "bg-red-100"
  },
];

const pieLabelMap = {
  featured: "Featured",
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  // Add any other statuses you use
};

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading || !stats) return <Loading />;

  // Format pie data for recharts
  const pieData = stats.productPie.map((p) => ({
    name: pieLabelMap[p._id] || p._id,
    value: p.count
  }));

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-cyan-700 text-center mb-10">Admin Dashboard Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-12">
        {statsConfig.map((stat) => (
          <div
            key={stat.label}
            className={`card p-6 rounded-2xl shadow flex flex-col items-center ${stat.color}`}
          >
            {stat.icon}
            <div className="text-2xl font-extrabold mt-3 text-cyan-800">
              {stats[stat.field]}
            </div>
            <div className="font-semibold mt-1 text-cyan-700 text-center">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="card p-6 rounded-2xl shadow flex flex-col items-center bg-base-200 max-w-xl mx-auto">
        <h3 className="text-lg font-bold mb-4 text-cyan-700 text-center">
          Product Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, idx) => (
                <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={32} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatistics;
