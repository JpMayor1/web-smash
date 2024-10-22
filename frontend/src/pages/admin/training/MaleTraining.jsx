import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetAllUsers from "../../../hooks/admin/training/useGetAllUsers";
import { usetrainingStore } from "../../../stores/useTrainingStore";
import { SearchIcon } from "../../../components/svg/svg";

const MaleTraining = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const { loading, error, users, getUsers } = useGetAllUsers();
  const { trainings } = usetrainingStore();

  const training = trainings.find((t) => t._id === trainingId);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleBack = () => {
    navigate(-1);
  };

  const checkUserStatus = (userId) => {
    if (!training || !training.drills) return "Unfinished";

    const allDrillsFinished = training.drills.every((drill) =>
      drill.finishedUsers.some((finishedUser) => finishedUser.userId === userId)
    );

    return allDrillsFinished ? "Finished" : "Unfinished";
  };

  // Filter users based on the search term and gender
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const isMale = user.gender === "male";
    return matchesSearch && isMale;
  });

  return (
    <div className="w-full h-full max-w-screen-xl relative overflow-y-auto hide-scrollbar p-1">
      <button onClick={handleBack} className="text-white absolute top-0 left-0">
        Back
      </button>
      <div className="h-full w-full flex flex-col items-center justify-start mt-8">
        {training ? (
          <div className="bg-white p-5 rounded-md w-96">
            <h2 className="text-primary font-bold text-center text-xl">
              Day {training.day || "Training Day"}
            </h2>
            <h3 className="text-black font-semibold text-xl">
              {training.title || "Training Title"}{" "}
            </h3>
            <ul className="list-disc pl-8">
              {training.drills && training.drills.length > 0 ? (
                training.drills.map((drill, index) => (
                  <li
                    key={index}
                    className="text-black text-base break-words whitespace-normal"
                  >
                    {drill.drillName}
                  </li>
                ))
              ) : (
                <li className="text-black text-base">No drills available</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-red-500">Training not found</p>
        )}

        <label className="w-full max-w-96 input input-bordered flex items-center gap-2 my-3">
          <input
            type="text"
            className="grow"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </label>

        <div className="overflow-x-auto w-full max-w-screen-lg">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Grade & Section</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="text-center bg-white text-black"
                  >
                    <td className="px-4 py-2 border">{user.lastName}</td>
                    <td className="px-4 py-2 border">{user.firstName}</td>
                    <td className="px-4 py-2 border">
                      Grade {user.gradeLevel} - {user.section}
                    </td>
                    <td
                      className={`px-4 py-2 border ${
                        checkUserStatus(user._id) === "Finished"
                          ? "text-secondary"
                          : "text-red"
                      }`}
                    >
                      {checkUserStatus(user._id)}
                    </td>
                    <td className="px-4 py-2 border">
                      <Link
                        to={`/admin/trainings/male/training/${trainingId}/${user._id}`}
                        className="bg-primary/90 text-white px-4 py-1 rounded hover:bg-primary flex items-center justify-center"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaleTraining;
