import { useMemo } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { usetrainingStore } from "../../stores/useTrainingStore";
import { IoBarbellSharp } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";

const UserHome = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { trainings } = usetrainingStore((state) => state);

  // Filter trainings for the user's gender
  const filteredTrainings = useMemo(() => {
    return trainings.filter((training) => training.gender === authUser.gender);
  }, [trainings, authUser]);

  // Calculate total, unfinished, and finished training stats
  const { totalTrainings, finishedTrainings, unfinishedTrainings } =
    useMemo(() => {
      const total = filteredTrainings.length;

      let finished = 0;
      let unfinished = 0;

      filteredTrainings.forEach((training) => {
        const allDrillsFinished = training.drills.every((drill) => {
          return drill.finishedUsers.some(
            (user) => user.userId === authUser._id
          );
        });

        if (allDrillsFinished) {
          finished += 1;
        } else {
          unfinished += 1;
        }
      });

      return {
        totalTrainings: total,
        finishedTrainings: finished,
        unfinishedTrainings: unfinished,
      };
    }, [filteredTrainings, authUser]);

  return (
    <div className="h-full w-full max-w-screen-sm pt-5 px-5 overflow-hidden">
      <h1 className="text-white text-center font-semibold text-2xl">
        Web Smash
      </h1>

      <div className="h-full w-full max-w-screen-sm p-2 flex flex-col items-center justify-center gap-5">
        {/* Total Trainings */}
        <div className="h-fit w-full bg-white px-5 py-10 flex flex-col items-center justify-center gap-2 rounded-lg">
          <h2 className="text-primary text-2xl font-semibold">
            Total Training
          </h2>
          <div className="flex items-center justify-center gap-2 text-5xl text-black">
            <IoBarbellSharp style={{ transform: "rotate(-45deg)" }} />
            <p className="font-bold">{totalTrainings}</p>
          </div>
        </div>

        {/* Unfinished Trainings */}
        <div className="h-fit w-full bg-white px-5 py-10 flex flex-col items-center justify-center gap-2 rounded-lg">
          <h2 className="text-primary text-2xl font-semibold">
            Unfinished Training
          </h2>
          <div className="flex items-center justify-center gap-2 text-5xl text-black">
            <CgSandClock />
            <p className="font-bold">{unfinishedTrainings}</p>
          </div>
        </div>

        {/* Finished Trainings */}
        <div className="h-fit w-full bg-white px-5 py-10 flex flex-col items-center justify-center gap-2 rounded-lg">
          <h2 className="text-primary text-2xl font-semibold">
            Finished Training
          </h2>
          <div className="flex items-center justify-center gap-2 text-5xl text-black">
            <LuClipboardCheck />
            <p className="font-bold">{finishedTrainings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
