# TechNexus 🚀

**TechNexus** is a dynamic web application built for tech enthusiasts. It provides a platform where users can share, explore, and discuss technology-related posts, ranging from reviews and news to comprehensive guides.

---

## 🌟 Introduction

TechNexus empowers users to upload posts regarding anything related to technology, view other users' posts, and engage in conversations through comments. With an emphasis on simplicity and functionality, it incorporates basic CRUD operations and a clean, responsive UI. 

---

## 🏗️ Architecture

The application follows the **Model-View-Controller (MVC)** architectural pattern:
- **Models**: Mongoose schemas defining the structure of Users, Posts, and Comment threads.
- **Views**: Server-side rendered HTML templates using **EJS** (Embedded JavaScript) templating, styled with Bootstrap.
- **Controllers/Routes**: Express.js routes handling business logic, authentication, file uploads, and database interactions.

---

## ✨ Key Features & Content

- **User Authentication**: Secure Sign Up and Log In functionality using JWT (JSON Web Tokens) and password hashing.
- **Post Management**: Users can create posts with rich text, a cover image, and additional gallery images.
- **Categorization**: Easily filter posts by categories such as *Reviews, News, Guides,* and *Other*.
- **Interactive Comments**: Users can engage in discussions through nested comment threads on individual posts.
- **AI Integration**: Automatically generates a concise summary of long posts using the **Hugging Face Inference API** (`facebook/bart-large-cnn`).
- **Responsive UI**: Built with Bootstrap for a mobile-friendly user experience.

---

## 💻 Tech Stack

- **Frontend**: EJS, HTML5, CSS3, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (jsonwebtoken), bcrypt/crypto for hashing
- **File Storage**: Multer (Local disk storage)
- **AI Summarization**: Axios + Hugging Face API

---

## 🗄️ Database

TechNexus uses **MongoDB** as its primary NoSQL database. 
- **Users Collection**: Stores user credentials, hashed passwords, and profile picture paths.
- **Posts Collection**: Stores post content, category, author reference, and associated image paths.
- **Threads Collection**: Stores nested comments linked to specific posts and users.

---

## 🚀 Getting Started (Local Deployment)

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas connection string
- Hugging Face API Token (optional, for post summarization)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Akash-Deshmane/TechNexus.git
   ```
2. Navigate into the directory and install dependencies:
   ```bash
   cd TechNexus
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   dbPass=your_mongodb_connection_string
   HF_API_TOKEN=your_hugging_face_api_token
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:8000`.

---

## 🌍 Deployment

TechNexus can be deployed easily on modern cloud platforms:
- **Backend Hosting**: Render, Railway, or Heroku (Node.js environment).
- **Database**: MongoDB Atlas (Cloud Database).
- **File Storage**: For production, it is highly recommended to configure Multer to upload images to a cloud storage bucket (e.g., AWS S3, Cloudinary) instead of local disk storage.

---

*Keep it civilized :)*
