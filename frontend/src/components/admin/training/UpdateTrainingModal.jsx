import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useUpdateTraining from "../../../hooks/admin/training/useUpdateTraining";

const UpdateTrainingModal = ({ training }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    day: training.day || "",
    title: training.title || "",
    gender: training.gender || "male",
    drills: training.drills || [],
  });

  const { updateTrainingData, loading } = useUpdateTraining();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDrill = () => {
    setFormData((prevData) => ({
      ...prevData,
      drills: [
        ...prevData.drills,
        {
          drillName: "",
          whatToDo: "",
          howToDoIt: [""],
          focus: "",
          repetitions: "",
          trainingVideo: null,
          videoReference: "",
        },
      ],
    }));
  };

  const handleRemoveDrill = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      drills: prevData.drills.filter((_, drillIndex) => drillIndex !== index),
    }));
  };

  const handleDrillChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDrills = [...formData.drills];
    updatedDrills[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      drills: updatedDrills,
    }));
  };

  const handleHowToDoItChange = (drillIndex, howToDoItIndex, value) => {
    const updatedDrills = [...formData.drills];
    updatedDrills[drillIndex].howToDoIt[howToDoItIndex] = value;
    setFormData((prevData) => ({
      ...prevData,
      drills: updatedDrills,
    }));
  };

  const handleAddHowToDoIt = (drillIndex) => {
    const updatedDrills = [...formData.drills];
    updatedDrills[drillIndex].howToDoIt.push("");
    setFormData((prevData) => ({
      ...prevData,
      drills: updatedDrills,
    }));
  };

  const handleRemoveHowToDoIt = (drillIndex, howToDoItIndex) => {
    const updatedDrills = [...formData.drills];
    updatedDrills[drillIndex].howToDoIt = updatedDrills[
      drillIndex
    ].howToDoIt.filter((_, index) => index !== howToDoItIndex);
    setFormData((prevData) => ({
      ...prevData,
      drills: updatedDrills,
    }));
  };

  const handleVideoChange = (drillIndex, e) => {
    const file = e.target.files[0];
    const updatedDrills = [...formData.drills];
    updatedDrills[drillIndex].trainingVideo = file;
    setFormData((prevData) => ({
      ...prevData,
      drills: updatedDrills,
    }));
  };

  const handleUpdateTraining = async (e) => {
    e.preventDefault();
    const success = await updateTrainingData(training._id, formData);
    if (success) {
      setFormData({
        day: "",
        title: "",
        gender: "male",
        drills: [],
      });
      setOpenModal(false);
    }
  };

  return (
    <>
      <button
        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90 min-w-20"
        onClick={() => setOpenModal(true)}
      >
        Update
      </button>

      <div
        className={`absolute top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden p-2 bg-black/20 flex items-start justify-center transition-all duration-300 transform ${
          openModal ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <form
          onSubmit={handleUpdateTraining}
          className="w-full md:w-[500px] space-y-4 bg-black p-10 rounded-md relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red text-4xl"
            onClick={() => setOpenModal(false)}
          >
            <IoMdClose />
          </button>

          {/* Input for Day */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Day:</span>
            </div>
            <input
              type="number"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              placeholder="Day"
              required
            />
          </label>

          {/* Input for Title */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Title:</span>
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              placeholder="Training Title"
              required
            />
          </label>

          {/* Gender Selection */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Gender:</span>
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          {/* Drills Section */}
          <h3 className="text-white mb-2">Drills</h3>
          {formData.drills.map((drill, index) => (
            <div key={index} className="border-b mb-4 pb-4 relative">
              <button
                type="button"
                className="absolute top-0 right-0 text-red text-lg"
                onClick={() => handleRemoveDrill(index)}
              >
                Remove
              </button>

              {/* Input for Drill Name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Drill Name:</span>
                </div>
                <input
                  type="text"
                  name="drillName"
                  value={drill.drillName}
                  onChange={(e) => handleDrillChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  placeholder="Drill Name"
                  required
                />
              </label>

              {/* Input for What to Do */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">What to Do:</span>
                </div>
                <input
                  type="text"
                  name="whatToDo"
                  value={drill.whatToDo}
                  onChange={(e) => handleDrillChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  placeholder="What to Do"
                  required
                />
              </label>

              {/* How to Do It Section */}
              <div>
                <div className="label mb-2">
                  <span className="label-text text-white">How to Do It:</span>
                </div>
                {drill.howToDoIt.map((howToDoIt, howToDoItIndex) => (
                  <div key={howToDoItIndex} className="flex mb-2">
                    <input
                      type="text"
                      value={howToDoIt}
                      onChange={(e) =>
                        handleHowToDoItChange(
                          index,
                          howToDoItIndex,
                          e.target.value
                        )
                      }
                      className="bg-white py-3 px-4 rounded-md w-full text-black"
                      placeholder="How to Do It"
                      required
                    />
                    <button
                      type="button"
                      className="text-red ml-2"
                      onClick={() =>
                        handleRemoveHowToDoIt(index, howToDoItIndex)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-primary text-white p-2 rounded-md mt-2"
                  onClick={() => handleAddHowToDoIt(index)}
                >
                  Add How to Do It
                </button>
              </div>

              {/* Input for Focus */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Focus:</span>
                </div>
                <input
                  type="text"
                  name="focus"
                  value={drill.focus}
                  onChange={(e) => handleDrillChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  placeholder="Focus"
                  required
                />
              </label>

              {/* Input for Repetitions */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Repetitions:</span>
                </div>
                <input
                  type="text"
                  name="repetitions"
                  value={drill.repetitions}
                  onChange={(e) => handleDrillChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  placeholder="Repetitions"
                  required
                />
              </label>

              {/* Upload Training Video */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">Training Video:</span>
                </div>
                <input
                  type="file"
                  onChange={(e) => handleVideoChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  accept="video/*"
                />
              </label>

              {/* Input for Video Reference */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white">
                    Video Reference:
                  </span>
                </div>
                <input
                  type="text"
                  name="videoReference"
                  value={drill.videoReference}
                  onChange={(e) => handleDrillChange(index, e)}
                  className="bg-white py-3 px-4 rounded-md w-full text-black"
                  placeholder="Video Reference URL"
                />
              </label>
            </div>
          ))}

          {/* Button to add a new drill */}
          <button
            type="button"
            className="bg-primary text-white p-2 rounded-md mt-2"
            onClick={handleAddDrill}
          >
            Add Drill
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-secondary text-white p-2 rounded-md w-full mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Update Training"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateTrainingModal;
