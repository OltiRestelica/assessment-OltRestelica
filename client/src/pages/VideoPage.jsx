import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/video/${id}`);
        setVideo(res.data.data);
        setAnnotations(res.data.data.Annotations);
        setBookmarks(res.data.data.Bookmarks);
      } catch (error) {
        console.error("Failed to fetch video", error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleTimeUpdate = () => {
    const currentTime = Math.floor(videoRef.current.currentTime);

    annotations.forEach((annotation) => {
      if (annotation.timestamp === currentTime) {
        setActiveAnnotation(annotation.description);

        setTimeout(() => {
          setActiveAnnotation(null);
        }, 5000);
      }
    });
  };

  const addAnnotation = async () => {
    const timestamp = Math.floor(videoRef.current.currentTime);
    const description = prompt("Enter annotation description:");

    if (!description) return;

    const res = await api.post(`/annotation/${id}/addAnnotation`, {
      timestamp,
      description,
    });

    setAnnotations([...annotations, res.data.data]);
  };

  const addBookmark = async () => {
    const timestamp = Math.floor(videoRef.current.currentTime);
    const title = prompt("Enter bookmark title:");

    if (!title) return;

    const res = await api.post(`/bookmarks/${id}/addBookmark`, {
      timestamp,
      title,
    });

    setBookmarks([...bookmarks, res.data.data]);
  };

  if (!video) return <p>Loading...</p>;

  return (
    <main className="videoContainer">
      <div className="videoCardWrapper">
        <h1>{video.title}</h1>

        <video controls ref={videoRef} onTimeUpdate={handleTimeUpdate}>
          <source src={`http://localhost:3000${video.fileUrl}`} />
        </video>

        {activeAnnotation && (
          <div className="annotationPopup">{activeAnnotation}</div>
        )}

        <div className="videoButtons">
          <button onClick={addAnnotation}>Add Annotation</button>

          <button onClick={addBookmark}>Add Bookmark</button>
        </div>

        <div className="bookmarkSection">
          <h3>Bookmarks</h3>

          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.bookmark_id}
              className="bookmarkItem"
              onClick={() => {
                videoRef.current.currentTime = bookmark.timestamp;
              }}
            >
              {bookmark.title} ({bookmark.timestamp}s)
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default VideoPage;
