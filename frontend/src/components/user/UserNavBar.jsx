import { Link, useLocation } from "react-router-dom";
import { IoHome, IoBarbellSharp, IoPerson } from "react-icons/io5";

const UserNavBar = () => {
  const location = useLocation();

  const primaryColor = "text-blue-500";
  const hoverColor = "hover:text-blue-300";

  return (
    <div className="w-full bg-black py-3 flex items-center justify-center z-30">
      <div className="w-full max-w-screen-sm flex items-center justify-evenly">
        {/* Home Link */}
        <Link
          to="/user"
          className={`text-3xl font-bold ${
            location.pathname === "/user" ? primaryColor : "text-white"
          } ${hoverColor}`}
        >
          <IoHome />
        </Link>

        {/* Trainings Link */}
        <Link
          to="/user/trainings"
          className={`text-3xl font-bold ml-4 ${
            location.pathname === "/user/trainings"
              ? primaryColor
              : "text-white"
          } ${hoverColor}`}
          style={{ transform: "rotate(-45deg)" }} // Rotate barbell icon
        >
          <IoBarbellSharp />
        </Link>

        {/* Profile Link */}
        <Link
          to="/user/profile"
          className={`text-3xl font-bold ml-4 ${
            location.pathname === "/user/profile" ? primaryColor : "text-white"
          } ${hoverColor}`}
        >
          <IoPerson />
        </Link>
      </div>
    </div>
  );
};

export default UserNavBar;
