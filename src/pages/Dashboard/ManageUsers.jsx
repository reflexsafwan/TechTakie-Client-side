import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { FaUser, FaUserShield, FaUserCog } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  // Change role mutation
  const changeRoleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
    },
    onSuccess: () => {
      toast.success("Role updated!");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: () => {
      toast.error("Failed to update role.");
    },
  });

  // Handler to change role
  const handleChangeRole = (id, currentRole, targetRole) => {
    if (currentRole === targetRole) return;
    changeRoleMutation.mutate({ id, newRole: targetRole });
  };

  return (
    <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Manage Users</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-cyan-300 text-base">
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make User</th>
                <th>Make Moderator</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <img
                      src={u.photoURL}
                      alt={u.displayName}
                      className="w-12 h-12 rounded-full border border-cyan-300 object-cover"
                    />
                  </td>
                  <td className="font-bold text-cyan-200">{u.name}</td>
                  <td className="text-cyan-100">{u.email}</td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        u.role === "admin"
                          ? "badge-error"
                          : u.role === "moderator"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserShield className="mr-1" /> Admin
                        </>
                      ) : u.role === "moderator" ? (
                        <>
                          <FaUserCog className="mr-1" /> Moderator
                        </>
                      ) : (
                        <>
                          <FaUser className="mr-1" /> User
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-info"
                      disabled={
                        u.role === "user" || changeRoleMutation.isLoading
                      }
                      onClick={() => handleChangeRole(u._id, u.role, "user")}
                    >
                      Make User
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-warning text-white"
                      disabled={
                        u.role === "moderator" || changeRoleMutation.isLoading
                      }
                      onClick={() =>
                        handleChangeRole(u._id, u.role, "moderator")
                      }
                    >
                      Make Moderator
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error text-white"
                      disabled={
                        u.role === "admin" || changeRoleMutation.isLoading
                      }
                      onClick={() => handleChangeRole(u._id, u.role, "admin")}
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
