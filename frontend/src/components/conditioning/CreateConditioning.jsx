import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useConditioningStore from "../../stores/useConditioningStore";

const CreateConditioning = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    warmUpVideo: null,
    warmUpVideoReference: "",
    cooldownVideo: null,
    cooldownVideoReference: "",
  });

  const { createConditioning, createConditioningLoading } =
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

  const handleVideoReferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitCreateConditioning = async (e) => {
    e.preventDefault();
    try {
      await createConditioning(formData);
      setFormData({ warmUpVideo: null, cooldownVideo: null });
      setOpenModal(false);
    } catch (error) {
      console.error("Error creating conditioning:", error);
    }
  };

  return (
    <>
      <button
        className="bg-primary text-white text-2xl px-12 py-2 rounded-md hover:bg-primary/90"
        onClick={() => setOpenModal(true)}
      >
        +
      </button>

      <div
        className={`absolute top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden p-2 bg-black/20 flex items-center justify-center transition-all duration-300 transform ${
          openModal ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <form
          onSubmit={submitCreateConditioning}
          className="w-full md:w-[500px] space-y-4 bg-black p-10 rounded-md relative"
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
              <span className="label-text text-white">Warm up Video:</span>
            </div>
            <input
              type="file"
              accept="video/*"
              name="warmUpVideo"
              onChange={handleVideoChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">
                Warm up Video Reference:
              </span>
            </div>
            <input
              type="text"
              value={formData.warmUpVideoReference}
              name="warmUpVideoReference"
              onChange={handleVideoReferenceChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">Cool down Video:</span>
            </div>
            <input
              type="file"
              accept="video/*"
              name="cooldownVideo"
              onChange={handleVideoChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              required
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-white">
                Coll down Video Reference:
              </span>
            </div>
            <input
              type="text"
              value={formData.cooldownVideoReference}
              name="cooldownVideoReference"
              onChange={handleVideoReferenceChange}
              className="bg-white py-3 px-4 rounded-md w-full text-black"
              required
            />
          </label>

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md mt-4 min-w-40"
              disabled={createConditioningLoading}
            >
              {createConditioningLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Create Conditioning"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateConditioning;
