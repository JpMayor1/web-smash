import CreateTrainingModal from "./CreateTrainingModal";

const TrainingsList = ({ trainings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {trainings.map((training, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between min-h-52 h-full"
        >
          <div className="mb-4">
            <h2 className="text-xl text-center font-bold text-primary mb-2">
              Day {training.day}
            </h2>
            <h3 className="text-lg text-black font-semibold mb-2">
              {training.title}
            </h3>
            <ul className=" text-black/90 text-sm">
              {training.drill.map((d, i) => (
                <li key={i}>• {d.drillName}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <button className="bg-primary/90 text-white px-4 py-1 rounded hover:bg-primary">
              View
            </button>
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
              Edit
            </button>
            <button className="bg-red/90 text-white px-4 py-1 rounded hover:bg-red">
              Delete
            </button>
          </div>
        </div>
      ))}
      <CreateTrainingModal />
    </div>
  );
};

export default TrainingsList;
