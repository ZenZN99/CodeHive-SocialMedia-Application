# 🚀 CodeHive – Social Media Developers Web Hub

![Website Preview](https://res.cloudinary.com/dgagbheuj/image/upload/v1767701116/aiuvffmhyxrwpjodvr7p.jpg)

CodeHive is a **full-stack developer-focused social platform** designed to connect developers, share knowledge, showcase projects, and collaborate in real-time.

It is built with a **scalable production-grade architecture** supporting real-time communication, content management, and role-based administration.

---

## 🚀 Project Overview

CodeHive allows developers to:

- Share posts and technical content
- Showcase and manage projects
- Collaborate via real-time chat
- Receive instant notifications
- Interact through comments and ratings
- Be moderated through an admin system

---

## 🧠 Key Features

### 👤 User Profiles

- Create and manage developer profiles
- Fields:
  - Avatar
  - Full Name
  - Email
  - Job Title
  - Bio
  - Skills (Tech Stack)
  - Social Links
- Role-based system:
  - User
  - Admin

---

### 📝 Posts & Comments System

- Create, edit, delete posts
- Nested comments & replies system
- Like & interact with posts
- Search & filter posts by keywords or categories
- Admin moderation (remove inappropriate content)

---

### 🛠 Projects System

- Full CRUD for developer projects
- Project fields:
  - Title
  - Description / README
  - Live Demo URL
  - Source Code URL
  - Tech Stack
  - Images (up to 5)

- Features:
  - Rate projects (⭐)
  - Comment on projects
  - Search & filtering system
  - Admin moderation controls

---

### 💬 Real-Time Chat

- One-to-one messaging system using Socket.io
- Features:
  - Online status indicator
  - Typing indicators
  - Image, text, and emoji support
- Secure authentication-protected conversations

---

### 🔔 Notifications System

- Real-time notifications for:
  - Comments
  - Replies
  - Project ratings
- Features:
  - Read / Unread tracking
  - Instant delivery

---

### 🛡 Admin Dashboard

- Full platform control:
  - Manage users
  - Manage posts
  - Manage projects
  - Delete inappropriate content
- Role-based access control

---

## ⚙️ Tech Stack

### Backend
- Bun.js / NestJS
- MongoDB
- Redis
- Socket.io
- JWT Authentication
- Cloudinary

### Frontend
- Next.js 16
- TypeScript
- TailwindCSS
- Zustand

---

## 💻 Installation & Setup

### 📌 Prerequisites

- Node.js / Bun.js
- MongoDB
- Redis
- Git

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=8080

DATABASE_URL=your_mongodb_uri
ADMIN_EMAIL=admin_email_account
ADMIN_PASSWORD=admin_password_account
JWT_SECRET=your_secret
JWT_EXPIRES_IN=20d

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

REDIS_URL=your_redis_url

```

---
## 🚀 Getting Started

### 1. Clone Repository

```bash id="c8k1aa"
git clone https://github.com/ZenZN99/CodeHive-SocialMedia-Application
cd CodeHive-SocialMedia-Application
```

## BackEnd
```bash
cd backend
npm install
npm run start:dev
```

## FrontEnd
```bash
cd frontend
npm install
npm run dev
```
---
## 📂 Project Structure 
#### BackEnd
```
backend/
│
├── controllers/   # Handle incoming requests (routes layer)
├── guards/        # Auth & role protection
├── modules/       # Feature modules (Auth, Users, Projects, etc.)
├── schemas/       # Database models (MongoDB / Mongoose)
├── services/      # Business logic layer
├── libs/          # Shared utilities & helpers
├── token/         # JWT & authentication utilities
├── gateways/      # WebSocket (real-time features)
└── main.ts        # Application entry point
```

#### FrontEnd
```
frontend/
│
└── src/
    │
    ├── apis/         # API layer  fetch requests - backend communication)
    │
    ├── components/   # Reusable UI components (buttons, cards, inputs, etc.)
    │
    ├── libs/         # Shared utilities & helpers
    │
    ├── routes/       # Routing configuration (React Router / Next routing logic / Protected Router)
    │
    ├── services/     # Business logic layer (API orchestration, feature services)
    │
    ├── socket/       # WebSocket / Socket.io client setup & events
    │
    ├── stores/       # Global state management (Zustand)
    │
    ├── types/        # TypeScript types & interfaces
    │
    └── page.tsx       # Root application entry point
```
---

## 🧪 Testing

This project was tested using **Postman** and manual testing to ensure full system reliability and correctness across all features.

---

### 🔹 Tools Used

- Postman (API testing)
- Socket.IO Client (Real-time testing)
- MongoDB Compass (Database verification)

---

### 🔹 Tested Features

- Authentication system (Register / Login / JWT validation)
- User profile management (update / fetch / roles)
- Posts system (create / edit / delete / fetch)
- Comments & nested replies system
- Projects CRUD operations
- Ratings system (⭐)
- Likes & interactions
- Notifications system (real-time + database sync)
- Admin dashboard actions (moderation / deletions)

---

### 🔹 WebSocket Testing

- Real-time chat messaging
- Online/offline user status
- Typing indicators
- Image / emoji message handling
- Real-time notifications delivery

---

## 🔒 Security Considerations

- JWT-based authentication
- Input validation & data sanitization
- Protected routes using guards
- Secure API access control

---

## 📈 Scalability Considerations

- Stateless API design for horizontal scaling
- Redis caching to reduce database load
- Optimized database queries with indexing
- Asynchronous processing for heavy operations
- Separation of WebSocket layer for real-time features

---

### 🔹 Notes

- All endpoints were tested with **JWT authentication (Bearer Token)**
- Edge cases were verified (invalid IDs, empty payloads, unauthorized access)
- System behaves correctly under both normal and error scenarios

---
## 🚀 Future Improvements
- 🔐 OAuth Login (Google / GitHub)
- 👥 Follow / Followers System
- 🔖 Bookmark / Save Posts
- 📊 Admin Analytics Dashboard
- 💬 Group Chat System
- 🤖 AI-based Developer Matching System

---
📌 Notes
- Built with scalable architecture principles
- Fully real-time system using Socket.io
- Optimized for performance and maintainability
- Designed for production-level deployment
---
👨‍💻 Author

Zen – Full Stack Engineer
GitHub | LinkedIn

📜 License

This project is licensed under the MIT License © 2026 Zen
