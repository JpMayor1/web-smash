const Conditioning = () => {
  return (
    <div className="w-1/2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold text-blue-500 mb-2">Conditioning</h2>
      <p className="text-gray-700">
        Here, you can include a video related to conditioning. Feel free to
        modify this section as needed.
      </p>
      <video controls className="w-full mt-2">
        <source src="path_to_your_conditioning_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Conditioning;
