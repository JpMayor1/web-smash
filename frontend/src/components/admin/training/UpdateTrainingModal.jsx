import { useState } from "react";
import { IoMdClose } from "react-icons/io";
const UpdateTrainingModal = ({ training }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleUpdateTraining = async (e) => {
    e.preventDefault();
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
        className={`absolute top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden p-2 bg-black/20 flex items-center justify-center transition-all duration-300 transform ${
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
        </form>
      </div>
    </>
  );
};

export default UpdateTrainingModal;
