import { useNavigate, useParams } from "react-router-dom";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import baseURL from "../../../axios/baseUrl";
import { useAuthStore } from "../../../stores/useAuthStore";
import useFinishDrill from "../../../hooks/user/useFinishDrill";

const UserViewTraning = () => {
  const { trainingId } = useParams();
  const { trainings } = usetrainingStore();
  const { finishDrill, loading } = useFinishDrill();
  const authUser = useAuthStore((state) => state.authUser);
  const navigate = useNavigate();
  const training = trainings.find((t) => t._id === trainingId);

  const handleBack = () => {
    navigate(-1);
  };

  if (!training) return <p className="text-red">Training not found</p>;

  const handleUploadVideo = (trainingId, drillId, e) => {
    const file = e.target.files[0];
    finishDrill(trainingId, drillId, file);
  };

  return (
    <div className="w-full h-full max-w-screen-xl relative hide-scrollbar overflow-y-auto p-1">
      <button
        onClick={handleBack}
        className="text-white sticky top-0 left-0 z-10 drop-shadow-lg"
      >
        Back
      </button>
      <div className="h-fit w-full flex flex-col items-center justify-start p-3">
        <div className="bg-white px-8 py-2 rounded-md my-2">
          <h2 className="text-primary font-bold text-center text-xl">
            {authUser.firstName} {authUser.lastName}
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

                  {drill.finishedUsers.some(
                    (u) => u.userId === authUser._id
                  ) ? (
                    <>
                      <p className="font-semibold mt-3">Finished Video:</p>
                      <div className="w-full h-auto flex flex-col items-center justify-center">
                        {drill.finishedUsers.map((u) => {
                          if (
                            u.userId === authUser._id &&
                            u.finishedUserVideoUrl
                          ) {
                            return (
                              <div key={u.userId}>
                                <video
                                  controls
                                  className="w-full max-w-screen-sm h-auto object-cover rounded-md shadow-sm my-2"
                                >
                                  <source
                                    src={`${baseURL}/videos/${u.finishedUserVideoUrl}`}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                {u.feedback && (
                                  <>
                                    <p className="font-semibold">Feedback:</p>
                                    <p className="text-primary">{u.feedback}</p>
                                  </>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </>
                  ) : (
                    <label className="form-control w-full">
                      <div className="label">
                        <span
                          className={`label-text font-semibold ${
                            loading ? "text-secondary" : "text-black"
                          }`}
                        >
                          {loading ? "Uploading..." : "Upload Finished Video:"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        name="trainingVideo"
                        disabled={loading}
                        onChange={(e) =>
                          handleUploadVideo(training._id, drill._id, e)
                        }
                        className="bg-white py-3 px-4 rounded-md w-full text-black"
                        required
                      />
                    </label>
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

export default UserViewTraning;
