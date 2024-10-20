import { useMemo } from "react";
import { usetrainingStore } from "../../stores/useTrainingStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const UserTrainings = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { trainings } = usetrainingStore((state) => state);

  // Filter male trainings only
  const maleTrainings = useMemo(() => {
    return trainings.filter((training) => training.gender === "male");
  }, [trainings]);

  // Check the status of a training for a specific user
  const checkUserStatus = (userId, training) => {
    if (!training || !training.drills) return "Unfinished";

    const allDrillsFinished = training.drills.every((drill) =>
      drill.finishedUsers.some((finishedUser) => finishedUser.userId === userId)
    );

    return allDrillsFinished ? "Finished" : "Unfinished";
  };

  // Check if a specific drill is finished by the user
  const checkDrillStatus = (userId, drill) => {
    return drill.finishedUsers.some(
      (finishedUser) => finishedUser.userId === userId
    );
  };

  return (
    <div className="w-full h-full max-w-screen-xl p-4">
      <h1 className="text-white text-center font-semibold text-2xl">
        Trainings
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {maleTrainings.map((training, index) => {
          const currentStatus = checkUserStatus(authUser._id, training);
          const isFirstTraining = index === 0;

          // Check if the previous training is unfinished
          const previousTrainingStatus =
            index > 0
              ? checkUserStatus(authUser._id, maleTrainings[index - 1])
              : "Finished";
          const isPreviousTrainingUnfinished =
            previousTrainingStatus === "Unfinished";

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-fit w-full"
            >
              <div className="mb-4 w-full">
                <h2 className="text-xl text-center font-bold text-primary mb-2">
                  Day {training.day}
                </h2>
                <h3 className="text-lg text-black font-semibold mb-2">
                  {training.title}
                </h3>
                <ul className="list-disc text-black/90 text-base pl-5">
                  {training.drills.map((d, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <p className="text-black text-base break-words whitespace-normal">
                        {d.drillName}
                      </p>

                      {/* Check if the drill is finished or not */}
                      {checkDrillStatus(authUser._id, d) ? (
                        <FaCircleCheck className="text-green-500" />
                      ) : (
                        <FaCircleXmark className="text-red" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <p
                  className={`${
                    currentStatus === "Finished" ? "text-secondary" : "text-red"
                  }`}
                >
                  {currentStatus}
                </p>

                <Link
                  to={`/user/trainings/male/training/${training._id}`}
                  className={`px-4 py-1 rounded flex items-center justify-center text-white ${
                    isFirstTraining || !isPreviousTrainingUnfinished
                      ? "bg-primary/90 hover:bg-primary"
                      : "bg-tertiary cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!isFirstTraining && isPreviousTrainingUnfinished) {
                      e.preventDefault();
                    }
                  }}
                >
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTrainings;