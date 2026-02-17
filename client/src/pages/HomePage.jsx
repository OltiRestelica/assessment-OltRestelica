import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/video/allVideos");
        setVideos(res.data.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);
  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <button className="uploadButton" onClick={() => navigate("/upload")}>
          Upload Video
        </button>
      </div>
      <div className="videoGrid">
        {videos.map((video) => (
          <VideoCard key={video.video_id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
