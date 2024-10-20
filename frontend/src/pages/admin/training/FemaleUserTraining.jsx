import { useNavigate, useParams } from "react-router-dom";
import useGetAllUsers from "../../../hooks/admin/training/useGetAllUsers";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import { useEffect } from "react";
import baseURL from "../../../axios/baseUrl";

const FemaleUserTraining = () => {
  const { trainingId, userId } = useParams();
  const navigate = useNavigate();
  const { loading, error, users, getUsers } = useGetAllUsers();
  const { trainings } = usetrainingStore();

  const training = trainings.find((t) => t._id === trainingId);
  const user = users.find((u) => u._id === userId);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red">{error}</p>;
  if (!user) return <p className="text-red">User not found</p>;
  if (!training) return <p className="text-red">Training not found</p>;

  return (
    <div className="w-full h-full max-w-screen-xl relative hide-scrollbar overflow-y-auto p-1">
      <button
        onClick={handleBack}
        className="text-white sticky top-0 left-0 z-10"
      >
        Back
      </button>
      <div className="h-fit w-full flex flex-col items-center justify-start p-3">
        <div className="bg-white px-8 py-2 rounded-md my-2">
          <h2 className="text-primary font-bold text-center text-xl">
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <div className="bg-white p-5 w-full h-full max-w-screen-lg flex flex-col gap-2 rounded-md">
          <h2 className="text-primary font-bold text-center text-2xl">
            Day {training.day || "Training Day"}
          </h2>
          <h3 className="text-black font-semibold text-xl">
            {training.title || "Training Title"}
          </h3>

          <div className="text-base">
            {training.drills && training.drills.length > 0 ? (
              training.drills.map((drill, index) => (
                <div
                  key={index}
                  className="text-black text-base break-words whitespace-normal mb-4 border-b border-black/50 pb-4 flex flex-col gap-2"
                >
                  <p>
                    <span className="font-semibold">Drill:</span>{" "}
                    {drill.drillName}
                  </p>

                  <p>
                    <span className="font-semibold">What to Do:</span>{" "}
                    {drill.whatToDo}
                  </p>

                  <p className="font-semibold">How to Do it:</p>
                  <ul className="pl-6 list-disc">
                    {drill.howToDoIt.map((htdi, index) => (
                      <li key={index}>{htdi}</li>
                    ))}
                  </ul>
                  <p>
                    <span className="font-semibold">Focus:</span> {drill.focus}
                  </p>
                  <p>
                    <span className="font-semibold">Repetitions:</span>{" "}
                    {drill.repetitions}
                  </p>

                  <p className="font-semibold">Instruction Video:</p>
                  <div className="w-full h-auto flex items-center justify-center">
                    <video
                      controls
                      className="w-full max-w-screen-sm h-auto object-cover rounded-md shadow-sm my-2"
                    >
                      <source
                        src={`${baseURL}/videos/${drill.trainingVideoUrl}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <p>
                    <span className="font-semibold">Reference:</span>{" "}
                    <a
                      href={drill.videoReference}
                      target="_black"
                      className="text-secondary/90 hover:text-secondary"
                    >
                      {drill.videoReference}
                    </a>
                  </p>

                  {drill.finishedUsers.map((u) => u._id).includes(user._id) ? (
                    <p className="text-green-500">
                      User has finished this drill
                    </p>
                  ) : (
                    <p className="text-red">User has not finished this drill</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-black text-base">No drills available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FemaleUserTraining;
