import AdminNavBar from "../../components/admin/AdminNavBar";
import bg from "../../assets/web-smash-bg.jpg";
import baseURL from "../../axios/baseUrl";

const AdminHome = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavBar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <video
          className="rounded-lg shadow-lg"
          width="640"
          height="480"
          controls
          autoPlay
          muted
        >
          <source
            src={`${baseURL}/videos/1728236376511-769779345-2024-10-06-20-57-58-converted.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AdminHome;
