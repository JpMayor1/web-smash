import AdminNavBar from "../../components/admin/AdminNavBar";
import bg from "../../assets/web-smash-bg.jpg";
import useGetAllTraining from "../../hooks/admin/training/useGetAllTraining";
import { useEffect } from "react";
import { usetrainingStore } from "../../stores/useTrainingStore";
import CreateTrainingModal from "../../components/admin/CreateTrainingModal";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminHome = () => {
  const { loading, getTrainings } = useGetAllTraining();
  const { trainings } = usetrainingStore((state) => state);

  useEffect(() => {
    getTrainings();
  }, []);

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen w-full flex flex-col items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavBar />
      <div className="w-full max-w-screen-xl px-4 py-8">
        <div className="w-full text-center mb-10">
          <CreateTrainingModal />
        </div>

        {loading ? (
          <LoadingSpinner text={"Loading..."} />
        ) : trainings && trainings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trainings.map((training, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-full"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-blue-500 mb-2">
                    Day {index + 1}
                  </h2>
                  <h3 className="text-lg font-semibold mb-2">
                    {training.title}
                  </h3>
                  <ul className="text-gray-700 text-sm">
                    {training.descriptions.map((desc, i) => (
                      <li key={i}>• {desc}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-lg">No trainings available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
