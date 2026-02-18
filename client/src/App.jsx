import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadVideo from "./pages/UploadVideo";
import VideoPage from "./pages/VideoPage";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/uploadVideo"
          element={
            <ProtectedRoute>
              <UploadVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminPage"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
