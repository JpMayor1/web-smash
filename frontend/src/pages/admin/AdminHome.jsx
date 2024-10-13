import { useEffect, useState } from "react";
import { usetrainingStore } from "../../stores/useTrainingStore";
import GenderTabSwitcher from "../../components/admin/training/GenderTabSwitcher";
import TrainingsList from "../../components/admin/training/TrainingListComponent";
import useGetAllTraining from "../../hooks/admin/training/useGetAllTraining";
import Conditioning from "../../components/admin/training/Conditioning";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminNavBar from "../../components/admin/AdminNavBar";
import bg from "../../assets/web-smash-bg.jpg";

const AdminHome = () => {
  const { loading, getTrainings } = useGetAllTraining();
  const { trainings } = usetrainingStore((state) => state);
  const [selectedTab, setSelectedTab] = useState("male");

  useEffect(() => {
    getTrainings();
  }, []);

  // Filter trainings based on selected tab
  const filteredTrainings = trainings.filter(
    (training) => training.gender === selectedTab
  );

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavBar />
      <div className="w-full max-w-screen-xl px-4 py-8 overflow-y-auto">
        {loading ? (
          <LoadingSpinner text={"Loading..."} />
        ) : (
          <>
            <GenderTabSwitcher
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            {selectedTab === "conditioning" ? (
              <Conditioning />
            ) : (
              <>
                <TrainingsList trainings={filteredTrainings} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
