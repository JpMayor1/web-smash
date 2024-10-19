import useUserLogout from "../../hooks/user/useUserLogout";

const UserLogoutButton = () => {
  const { logout, loading } = useUserLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red text-white py-2 px-4 rounded-lg hover:bg-red/80 transition duration-300"
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

export default UserLogoutButton;
