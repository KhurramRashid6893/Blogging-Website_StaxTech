# Blogging-Website_StaxTech

* Project Overview
* Technologies Used
* Setup Instructions for Backend and Frontend
* Available Scripts
* Directory Structure
* Notes (e.g., `.env` setup if needed)

Please hold on while I prepare it.


Here is the detailed `README.md` for your full-stack project with separate **backend** and **frontend** folders:

---

```markdown
# Full Stack MERN GraphQL Blog App

This is a full-stack blog application built with **Next.js** for the frontend and **Express + GraphQL** for the backend. It supports user authentication, post creation, and JWT-based authorization.

---

## 🛠️ Technologies Used

### Backend
- Express.js
- GraphQL (`apollo-server-express`)
- MongoDB (`mongodb` driver)
- JWT (`jsonwebtoken`)
- Bcrypt.js
- CORS

### Frontend
- Next.js 15
- React 19
- Apollo Client
- GraphQL
- JWT Decode

---

## 📁 Project Structure

```

/backend
├── index.js / server.js          # Main server entry point
├── package.json                  # Backend dependencies & scripts
└── ...                           # Routes, schema, resolvers

/frontend
├── pages/                        # Next.js routing pages
├── components/                  # Reusable UI components
├── package.json                  # Frontend dependencies & scripts
└── ...                           # Styles, assets, utils

````

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
````

### 2. Setup Backend

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

* Start backend server:

```bash
node index.js
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

* To run frontend:

```bash
npm run dev
```

---

## 📜 Available Scripts

### Backend

```bash
npm test           # Currently placeholder
```

### Frontend

```bash
npm run dev        # Start Next.js dev server
npm run build      # Build app for production
npm run start      # Run built app
npm run lint       # Lint project
```

---

## ✅ Features

* 🔐 JWT-based authentication
* 🧾 Create & fetch blog posts
* 🚀 GraphQL API (Apollo Server & Client)
* 🌐 Responsive frontend using React + Next.js
* 📦 MongoDB for storing user and post data

---

## 📌 Notes

* Be sure to configure `.env` properly for backend.
* Use tools like [MongoDB Compass](https://www.mongodb.com/products/compass) to monitor your database.
* Deploy backend to platforms like Render/Heroku and frontend to Vercel/Netlify.

---

## 👨‍💻 Author

Developed by Khurram Rashid

```

```
