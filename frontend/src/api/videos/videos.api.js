import axiosInstance from "../../axios/axios";

// Uploads a single chunk to the backend
const uploadChunk = async (fieldname, file, chunk, index) => {
  const chunkFormData = new FormData();
  chunkFormData.append(fieldname, chunk);
  chunkFormData.append("dzchunkindex", index);
  chunkFormData.append("dzfilename", file.name);

  const response = await axiosInstance.post(
    "/api/videos/upload",
    chunkFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

// Merges all chunks once uploaded
const mergeChunks = async (file, fieldname, totalChunks) => {
  const mergeFormData = new FormData();
  mergeFormData.append("dzfilename", file.name);
  mergeFormData.append("dzfieldname", fieldname);
  mergeFormData.append("dztotalchunkcount", totalChunks);

  const response = await axiosInstance.post("/api/videos/merge", mergeFormData);
  return response.data.videoPath;
};

// Handles chunked upload of the video file
export const uploadVideoInChunks = async (file, fieldname) => {
  const chunkSize = 50 * 1024 * 1024; // 50MB per chunk
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks = [];

  // Create file chunks
  for (let i = 0; i < totalChunks; i++) {
    const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
    chunks.push(chunk);
  }

  // Upload each chunk sequentially
  for (let i = 0; i < totalChunks; i++) {
    await uploadChunk(fieldname, file, chunks[i], i);
  }

  // Merge chunks once all are uploaded
  const videoPath = await mergeChunks(file, fieldname, totalChunks);
  return videoPath;
};

export const deleteVideoFile = async (filename) => {
  try {
    const response = await axiosInstance.delete(
      `/api/videos/delete/${filename}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting video file:", error);
    throw error;
  }
};
