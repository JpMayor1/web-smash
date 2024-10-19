import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useConditioningStore from "../../stores/useConditioningStore";

const DeleteConditioning = ({ conditioning }) => {
  const [openModal, setOpenModal] = useState(false);
  const { deleteConditioning, deleteConditioningLoading } =
    useConditioningStore();

  const handleDeleteConditioning = async (e) => {
    e.preventDefault();
    const success = await deleteConditioning(conditioning._id);
    if (success) {
      setOpenModal(false);
    }
  };
  return (
    <>
      <button
        className="bg-red text-white px-4 py-2 rounded-md hover:bg-red/90 min-w-20"
        onClick={() => setOpenModal(true)}
      >
        Delete
      </button>

      <div
        className={`absolute top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden p-2 bg-black/20 flex items-center justify-center transition-all duration-300 transform ${
          openModal ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <form
          onSubmit={handleDeleteConditioning}
          className="w-full md:w-[500px] space-y-4 bg-black p-10 rounded-md relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-red text-4xl"
            onClick={() => setOpenModal(false)}
          >
            <IoMdClose />
          </button>
          <h2 className="text-white text-2xl font-semibold">
            Delete <span className="text-red">Conditioning Videos</span>?
          </h2>
          <div>
            <button
              type="submit"
              className="bg-red/90 hover:bg-red text-white px-4 py-2 rounded-md mt-4 min-w-24"
              disabled={deleteConditioningLoading}
            >
              {deleteConditioningLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteConditioning;
