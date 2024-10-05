import logo from "../../assets/web-smash-logo.jpeg";
import AdminLogoutButton from "./AdminLogoutButton";

const AdminNavBar = () => {
  return (
    <div className="w-full h-24 py-5 px-10 flex items-center justify-between bg-white">
      <div className="h-20 w-20 object-cover overflow-hidden rounded-full">
        <img src={logo} alt="logo" className="h-full w-full" />
      </div>

      <AdminLogoutButton classNames={`max-w-24`} />
    </div>
  );
};

export default AdminNavBar;