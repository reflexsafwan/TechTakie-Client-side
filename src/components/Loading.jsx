// src/components/Loading.jsx

const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] w-full py-8">
    <span className="loading loading-spinner loading-lg text-cyan-600 mb-2"></span>
    <span className="text-cyan-700 font-semibold text-lg">Loading...</span>
  </div>
);

export default Loading;
