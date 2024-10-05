import AdminNavBar from "../../components/admin/AdminNavBar";
import bg from "../../assets/web-smash-bg.jpg";

const AdminHome = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavBar />
    </div>
  );
};

export default AdminHome;
