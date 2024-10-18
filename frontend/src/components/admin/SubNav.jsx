import { Link, useLocation } from "react-router-dom";

const SubNav = () => {
  const location = useLocation();
  const selectedTab = location.pathname;

  return (
    <div className="flex justify-center gap-3 my-5">
      <Link
        to="/admin"
        className={`px-3 md:px-6 py-2 bg-none ${
          selectedTab === "/admin"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
      >
        Conditioning
      </Link>
      <Link
        to="/admin/trainings/male"
        className={`px-3 md:px-6 py-2 ${
          selectedTab === "/admin/trainings/male"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
      >
        Male
      </Link>
      <Link
        to="/admin/trainings/female"
        className={`px-3 md:px-6 py-2 bg-none ${
          selectedTab === "/admin/trainings/female"
            ? "border-b border-white text-white"
            : "text-white/50"
        }`}
      >
        Female
      </Link>
    </div>
  );
};

export default SubNav;
