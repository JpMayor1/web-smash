import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useCreateTraining from "../../hooks/admin/training/useCreateTraining";

const CreateTrainingModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    title: "",
    descriptions: [],
    trainingVideo: null,
    newDescription: "",
  });

  const { createTraining, loading } = useCreateTraining();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "trainingVideo") {
      setFormData((prevState) => ({
        ...prevState,
        trainingVideo: files[0],
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddDescription = () => {
    if (formData.newDescription.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        descriptions: [...prevState.descriptions, prevState.newDescription],
        newDescription: "",
      }));
    }
  };

  const handleRemoveDescription = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      descriptions: prevState.descriptions.filter((_, i) => i !== index),
    }));
  };

  const submitCreateTraining = async (e) => {
    e.preventDefault();

    try {
      await createTraining(formData);

      setFormData({
        day: "",
        title: "",
        descriptions: [],
        trainingVideo: null,
        newDescription: "",
      });
      setOpenModal(false);
    } catch (err) {
      console.error("Error creating training:", err);
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          onClick={() => setOpenModal(true)}
        >
          Create Training
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-screen h-screen p-2 bg-black/20 flex items-center justify-center transition-all duration-300 transform ${
          openModal ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <form
          onSubmit={submitCreateTraining}
          className="w-full md:w-96 space-y-4 bg-black p-10 rounded-md relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red text-4xl"
            onClick={() => setOpenModal(false)}
          >
            <IoMdClose />
          </button>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Day:</span>
            </div>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              placeholder="Day"
              required
            />
          </label>
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
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Description:</span>
            </div>
            <div className="flex">
              <input
                type="text"
                name="newDescription"
                value={formData.newDescription}
                onChange={handleChange}
                className="bg-white py-3 px-4 rounded-md w-full text-black"
                placeholder="Add Description"
              />
              <button
                type="button"
                className="bg-primary text-white px-4 py-3 rounded-md ml-2"
                onClick={handleAddDescription}
              >
                Add
              </button>
            </div>
            <ul className="w-full mt-2 text-white text-left">
              {formData.descriptions.map((desc, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>• {desc}</span>
                  <button
                    type="button"
                    className="text-red ml-2"
                    onClick={() => handleRemoveDescription(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Training Video:</span>
            </div>
            <input
              type="file"
              name="trainingVideo"
              accept="video/*"
              onChange={handleChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Create Training"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTrainingModal;
