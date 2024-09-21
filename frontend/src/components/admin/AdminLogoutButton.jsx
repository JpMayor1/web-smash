import useAdminLogout from "../../hooks/admin/useAdminLogout";

const AdminLogoutButton = () => {
  const { logout, loading } = useAdminLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <button
      onClick={handleLogout}
      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition duration-300"
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default AdminLogoutButton;
