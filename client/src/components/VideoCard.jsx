import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div
      className="videoCard"
      onClick={() => navigate(`/video/${video.video_id}`)}
    >
      <div className="thumbnail">
        <video src={`http://localhost:3000${video.fileUrl}`}></video>
      </div>
      <div className="videoInfo">
        <h3>{video.title}</h3>
        <p>Uploaded by: {video.User?.name}</p>
        <p>{new Date(video.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default VideoCard;
