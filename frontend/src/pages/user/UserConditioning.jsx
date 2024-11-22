import { useEffect } from "react";
import useConditioningStore from "../../stores/useConditioningStore";
import baseURL from "../../axios/baseUrl";

const UserConditioning = () => {
  const { conditionings, fetchConditionings, loading, error } =
    useConditioningStore();

  useEffect(() => {
    fetchConditionings();
  }, [fetchConditionings]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching conditionings: {error.message}</div>;

  return (
    <div className="h-full w-full p-4 flex items-start justify-center overflow-y-auto">
      <div className="h-fit w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
        {/* Render conditionings */}
        {conditionings.length > 0 ? (
          conditionings.map((conditioning) => (
            <div key={conditioning._id} className="pb-4">
              <div className="flex flex-col md:flex-row gap-4">
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
                  <a
                    href={conditioning.warmUpVideoReference}
                    target="_blank"
                    className="text-secondary/90 hover:text-secondary"
                  >
                    {conditioning.warmUpVideoReference}
                  </a>
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
                  <a
                    href={conditioning.cooldownVideoReference}
                    target="_blank"
                    className="text-secondary/90 hover:text-secondary"
                  >
                    {conditioning.cooldownVideoReference}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-black text-center">
              No conditioning videos found!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserConditioning;
