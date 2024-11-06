import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useConditioningStore from "../../stores/useConditioningStore";
import baseURL from "../../axios/baseUrl";

const UpdateConditioning = ({ conditioning, onUpdate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    warmUpVideo: null,
    cooldownVideo: null,
  });
  const { updateConditioning, updateConditioningLoading } =
    useConditioningStore();

  const handleVideoChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitUpdateConditioning = async (e) => {
    e.preventDefault();
    try {
      await updateConditioning(conditioning._id, formData, conditioning);
      setFormData({ warmUpVideo: null, cooldownVideo: null });
      setOpenModal(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating conditioning:", error);
    }
  };

  return (
    <>
      <button
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 min-w-20"
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
          onSubmit={submitUpdateConditioning}
          className="w-full md:w-[500px] space-y-4 bg-black p-10 rounded-md relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red text-4xl"
            onClick={() => {
              setOpenModal(false);
              setFormData({ warmUpVideo: null, cooldownVideo: null }); // Reset on close
            }}
          >
            <IoMdClose />
          </button>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Warm up Video:</span>
            </div>
            <video
              className="w-full h-full object-cover mb-3"
              src={
                formData.warmUpVideo
                  ? URL.createObjectURL(formData.warmUpVideo)
                  : conditioning.warmUpVideoUrl
                  ? `${baseURL}/videos/${conditioning.warmUpVideoUrl}`
                  : ""
              }
              controls
            />
            <input
              type="file"
              accept="video/*"
              name="warmUpVideo"
              onChange={handleVideoChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Cool down Video:</span>
            </div>
            <video
              className="w-full h-full object-cover mb-3"
              src={
                formData.cooldownVideo
                  ? URL.createObjectURL(formData.cooldownVideo)
                  : conditioning.cooldownVideoUrl
                  ? `${baseURL}/videos/${conditioning.cooldownVideoUrl}`
                  : ""
              }
              controls
            />
            <input
              type="file"
              accept="video/*"
              name="cooldownVideo"
              onChange={handleVideoChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
            />
          </label>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md mt-4 min-w-40"
              disabled={updateConditioningLoading}
            >
              {updateConditioningLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Update Conditioning"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateConditioning;
