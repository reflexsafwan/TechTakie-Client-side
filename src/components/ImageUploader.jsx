// src/components/ImageUploader.jsx
import { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onUpload, imgbbApiKey }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      if (res.data.success) {
        onUpload(res.data.data.url);
      } else {
        setError("Failed to upload image.");
      }
    } catch (err) {
      setError("Failed to upload image.");
    }
    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && (
        <span className="loading loading-spinner loading-xs ml-2"></span>
      )}
      {error && <p className="text-error mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploader;
