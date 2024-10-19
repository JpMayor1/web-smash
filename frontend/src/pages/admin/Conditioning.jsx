import { useEffect } from "react";
import useConditioningStore from "../../stores/useConditioningStore";
import baseURL from "../../axios/baseUrl";
import CreateConditioning from "../../components/conditioning/CreateConditioning";
import DeleteConditioning from "../../components/conditioning/DeleteConditioning";
import UpdateConditioning from "../../components/conditioning/UpdateConditioning";

const Conditioning = () => {
  const { conditionings, fetchConditionings, loading, error } =
    useConditioningStore();

  useEffect(() => {
    fetchConditionings();
  }, [fetchConditionings]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching conditionings: {error.message}</div>;

  return (
    <div className="w-1/2 bg-white shadow-md rounded-lg p-4">
      {/* Render conditionings */}
      {conditionings.length > 0 ? (
        conditionings.map((conditioning) => (
          <div key={conditioning._id} className="mb-6 border-b pb-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-2">
                  Warm Up Video:
                </h3>
                <video
                  controls
                  className="w-full h-[200px] object-cover rounded-md shadow-sm"
                >
                  <source
                    src={`${baseURL}/videos/${conditioning.warmUpVideoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-2">
                  Cool Down Video:
                </h3>
                <video
                  controls
                  className="w-full h-[200px] object-cover rounded-md shadow-sm"
                >
                  <source
                    src={`${baseURL}/videos/${conditioning.cooldownVideoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-center mt-3">
              <UpdateConditioning
                conditioning={conditioning}
                onUpdate={fetchConditionings}
              />
              <DeleteConditioning conditioning={conditioning} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-black text-center">
            No conditioning videos found!
          </p>
          <CreateConditioning />
        </div>
      )}
    </div>
  );
};

export default Conditioning;
