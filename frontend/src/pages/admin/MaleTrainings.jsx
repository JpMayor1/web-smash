import { useMemo } from "react";
import { usetrainingStore } from "../../stores/useTrainingStore";
import UpdateTrainingModal from "../../components/admin/training/UpdateTrainingModal";
import DeleteTrainingModal from "../../components/admin/training/DeleteTrainingModal";
import CreateTrainingModal from "../../components/admin/training/CreateTrainingModal";
import { Link } from "react-router-dom";

const MaleTrainings = () => {
  const { trainings } = usetrainingStore((state) => state);

  const maleTrainings = useMemo(() => {
    return trainings.filter((training) => training.gender === "male");
  }, [trainings]);

  return (
    <div className="w-full h-full max-w-screen-xl overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {maleTrainings.map((training, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between min-h-52 h-full"
          >
            <div className="mb-4">
              <h2 className="text-xl text-center font-bold text-primary mb-2">
                Day {training.day}
              </h2>
              <h3 className="text-lg text-black font-semibold mb-2">
                {training.title}
              </h3>
              <ul className="list-disc text-black/90 text-sm pl-5">
                {training.drills.map((d, i) => (
                  <li
                    key={i}
                    className="text-black text-base break-words whitespace-normal"
                  >
                    {d.drillName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between">
              <Link
                to={`/admin/trainings/male/training/${training._id}`}
                className="bg-primary/90 text-white px-4 py-1 rounded hover:bg-primary flex items-center justify-center"
              >
                View
              </Link>
              <UpdateTrainingModal training={training} />
              <DeleteTrainingModal training={training} />
            </div>
          </div>
        ))}
        <CreateTrainingModal gender={"male"} />
      </div>
    </div>
  );
};

export default MaleTrainings;
