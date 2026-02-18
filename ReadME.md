# Wayland internship assessment

This project is a full-stack web application that allows users to:

- Register and log in
- Upload videos
- Watch videos inside the application
- Create annotations linked to specific timestamps
- Create bookmarks linked to specific timestamps
- Navigate to bookmarked timestamps
- Admin users can view all videos, annotations, and bookmarks

The application implements authentication and role-based access control.

## Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (Authentication)
- dotenv
- bcrypt

### Frontend

- React (Vite)
- Axios
- React Router
- Pure CSS

## Authentication & Authorization

- JWT-based authentication
- Token stored in localStorage
- Protected routes in frontend
- Middleware-based role protection in backend
- Admin-only endpoints for dashboard access

## How to run the project

1. Backend setup

- cd server
- npm install
- Create an .env file containing this:
  PORT=3000
  DB_HOST=localhost
  DB_USER=your_mysql_user
  DB_PASSWORD=your_mysql_password
  DB_NAME=your_database_name
  SECRET=your_jwt_secret
- npm start to run the server

2. Frontend setup

- cd client
- npm install
- npm run dev

The frontend will run on http://localhost:5173

## Assumptions & Limitations

- Videos are stored locally in the `/uploads` directory. The database stores the relative file path (fileUrl), and the folder is served as a static directory using Express.
- No pagination implemented for video listing.
- No editing functionality for annotations or bookmarks.
- Basic UI styling (focus was placed on functionality and backend logic).
- No automated testing included.

## Admin access

- To access the admin panel, log in with an account whose role is "Admin" and navigate to: http://localhost:5173/adminPage
