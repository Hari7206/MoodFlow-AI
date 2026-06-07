<div align="center">

# 🎵 MoodFlow AI

### *Your mood. Your music. Automatically.*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-FF5722?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)

MoodFlow AI is a full-stack web application that uses real-time **facial emotion detection** to automatically curate and play music that matches your current mood — no manual searching required.

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Mood Detection](#-mood-detection)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)

---

## 🧠 Overview

MoodFlow AI scans your face via webcam using **MediaPipe Face Landmarker**, classifies your current emotional state into one of four moods, and instantly serves you matching music — a featured track on the left and a full mood-based playlist on the right. Users can also upload their own tracks, manage their profile, and track their listening history, all within a clean, responsive dashboard.

---

## ✨ Key Features

### 🎭 Mood-Based Music Detection
- Real-time facial emotion recognition via webcam using MediaPipe
- Detects **4 moods**: Happy 😊 · Sad 😢 · Surprised 😲 · Angry 😠
- On detection: a featured song appears on the left, and a full mood playlist appears on the right

### 👤 User Dashboard
- Personalized dashboard displaying username, user ID, and profile info
- Editable profile — changes are persisted to MongoDB
- Profile image upload via **ImageKit** (cloud storage)
- Secure logout with **Redis-based token blacklisting**

### 🕐 Recently Played
- Tracks and displays the last **10 recently played songs** per user
- Shown prominently on the dashboard for quick re-access

### 📤 Song Upload by Users
- Users can upload songs by selecting a mood category (Happy / Sad / Surprised / Angry)
- Song file and cover art are stored via **ImageKit**
- Uploaded songs go into an **admin approval queue** before going live

### 🛡️ Admin Panel
- Dedicated admin interface to review user-submitted songs
- Admin can **approve** or **reject** submissions
- Approved songs appear in the detection view and the relevant mood playlist
- Rejected songs are removed from the queue

### 🔐 Authentication
- Full **Sign In / Register** flow with JWT-based auth
- On logout, tokens are **blacklisted in Redis** to prevent reuse
- Redis used as a high-speed cache layer for token invalidation

---

## 🎯 Mood Detection

Mood detection is powered by **MediaPipe Tasks Vision**:

```js
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
```

The `FaceLandmarker` model processes the live webcam feed to extract facial landmarks in real time. These landmarks are then classified into one of the four supported emotional states:

| Mood | Emoji | Playlist Behavior |
|------|-------|-------------------|
| Happy | 😊 | Upbeat, feel-good tracks |
| Sad | 😢 | Slow, emotional music |
| Surprised | 😲 | High-energy, unexpected picks |
| Angry | 😠 | Intense, powerful tracks |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React** | UI framework (4-pillar architecture with Context API) |
| **SCSS** | Component-level styling |
| **MediaPipe Tasks Vision** | Real-time facial landmark detection |
| **Context API** | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB** | Primary database (users, songs, playlists) |
| **Redis** | Token blacklist cache for fast logout invalidation |
| **ImageKit** | Cloud storage for song files, cover art, and profile images |
| **JWT** | Stateless authentication tokens |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        React Frontend                        │
│                                                              │
│   ┌─────────────┐   ┌──────────────┐   ┌────────────────┐  │
│   │  Auth Pages  │   │  Dashboard   │   │  Mood Player   │  │
│   │ Login/Signup │   │ Profile/Feed │   │ Left  | Right  │  │
│   └─────────────┘   └──────────────┘   │ Song  | Playlist│ │
│                                         └────────────────┘  │
│            Context API (Global State Management)            │
└────────────────────────┬─────────────────────────────────────┘
                         │ REST API (JWT Auth)
┌────────────────────────▼─────────────────────────────────────┐
│                     Express + Node.js                        │
│                                                              │
│   ┌──────────────┐  ┌────────────┐  ┌─────────────────────┐ │
│   │ Auth Routes  │  │ Song Routes│  │   Admin Routes      │ │
│   │ /register    │  │ /upload    │  │   /queue /approve   │ │
│   │ /login       │  │ /playlist  │  │   /reject           │ │
│   │ /logout      │  │ /recent    │  └─────────────────────┘ │
│   └──────┬───────┘  └─────┬──────┘                          │
└──────────┼────────────────┼────────────────────────────────┘
           │                │
    ┌──────▼──────┐  ┌──────▼──────────────────────────────┐
    │    Redis    │  │           MongoDB                   │
    │  Token      │  │  Users · Songs · Playlists ·        │
    │  Blacklist  │  │  Upload Queue · Play History        │
    └─────────────┘  └──────────────────────┬──────────────┘
                                            │
                                   ┌────────▼────────┐
                                   │    ImageKit     │
                                   │  Song Files     │
                                   │  Cover Art      │
                                   │  Profile Images │
                                   └─────────────────┘
```

---

## 📁 Project Structure

```
moodflow-ai/
│
├── client/                          # React Frontend
│   ├── public/
│   └── src/
│       ├── components/              # Reusable UI components
│       │   ├── MoodScanner/         # MediaPipe webcam & detection logic
│       │   ├── MusicPlayer/         # Featured song (left panel)
│       │   ├── Playlist/            # Mood playlist (right panel)
│       │   └── AdminPanel/          # Admin approval interface
│       │
│       ├── context/                 # Context API — global state
│       │   ├── AuthContext.jsx
│       │   ├── MusicContext.jsx
│       │   ├── UserContext.jsx
│       │   └── MoodContext.jsx
│       │
│       ├── pages/                   # Route-level page components
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── MoodPlayer.jsx
│       │   └── Admin.jsx
│       │
│       ├── services/                # API call abstraction layer
│       ├── styles/                  # SCSS files (per-component)
│       └── App.jsx
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── redis.js                 # Redis client setup
│   │   └── imagekit.js              # ImageKit SDK config
│   │
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── songController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── blacklistCheck.js        # Redis token blacklist check
│   │
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Song.js
│   │   ├── Playlist.js
│   │   └── UploadQueue.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── songRoutes.js
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   │
│   └── server.js                    # Express app entry point
│
├── .env
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Redis (local or Redis Cloud)
- ImageKit account
- A webcam (for mood detection)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/moodflow-ai.git
cd moodflow-ai
```

**2. Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**3. Set up environment variables**

Create `.env` files in both `/server` and `/client` — see [Environment Variables](#-environment-variables) below.

**4. Start the development servers**
```bash
# In /server
npm run dev

# In /client
npm start
```

The app will be available at `http://localhost:3000`.

---

## 🔑 Environment Variables

### Server (`/server/.env`)

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Redis
REDIS_URL=your_redis_connection_url

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Server
PORT=5000
```

### Client (`/client/.env`)

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

---

## 🔒 Security Notes

- JWT tokens are signed and expire on a configurable TTL
- On logout, the token is stored in **Redis** and rejected on all subsequent requests until expiry — preventing token replay attacks even if a token is intercepted
- All file uploads (songs, cover art, profile pictures) go through **ImageKit** — no raw files are stored on the server
- User-submitted songs are sandboxed in an admin queue and never served to other users until explicitly approved

---

<div align="center">

Built with ❤️ using React, Node.js, MediaPipe, MongoDB, Redis & ImageKit

</div>
