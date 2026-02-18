import { useState, useEffect, use } from "react";
import api from "../services/api";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/admin/adminPanel");
      setVideos(res.data.data);
    } catch (error) {
      console.error("Failed to admin data:", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/video/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
      alert("Failed to delete video");
    }
  };
  return (
   <div className="adminPageWrapper">
    <div className="adminCard">
      <h1>Admin Panel</h1>

      {videos.map((video) => (
        <div key={video.video_id} className="adminVideoBlock">
          <div className="adminVideoHeader">
            <div>
              <h3>{video.title}</h3>
              <p>Uploaded by: {video.User?.name}</p>
            </div>

            <button
              className="deleteButton"
              onClick={() => handleDelete(video.video_id)}
            >
              Delete Video
            </button>
          </div>

          <div className="adminSection">
            <h4>Annotations</h4>
            {video.Annotations?.length > 0 ? (
              video.Annotations.map((a) => (
                <div key={a.annotation_id} className="adminItem">
                  ({a.timestamp}s) {a.description} —{" "}
                  <strong>{a.User?.name}</strong>
                </div>
              ))
            ) : (
              <p className="emptyText">No annotations</p>
            )}
          </div>

          <div className="adminSection">
            <h4>Bookmarks</h4>
            {video.Bookmarks?.length > 0 ? (
              video.Bookmarks.map((b) => (
                <div key={b.bookmark_id} className="adminItem">
                  ({b.timestamp}s) {b.title} —{" "}
                  <strong>{b.User?.name}</strong>
                </div>
              ))
            ) : (
              <p className="emptyText">No bookmarks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default AdminPage;
