import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import UploadForm from "../components/UploadForm";
import "../styles/UploadVideos.css";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    try {
      await api.post("/video/upload", formData);

      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  return (
    <main className="uploadContainer">
      <div className="uploadCard">
        <h1>Upload Video</h1>

        <UploadForm
          title={title}
          setTitle={setTitle}
          setFile={setFile}
          onSubmit={handleUpload}
        />
      </div>
    </main>
  );
};

export default Upload;
