const UploadForm = ({
  title,
  setTitle,
  setFile,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="uploadForm">
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
