export const getVideoMimeType = (videoUrl) => {
  const extension = videoUrl.split(".").pop();
  switch (extension) {
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    default:
      return "video/mp4";
  }
};
