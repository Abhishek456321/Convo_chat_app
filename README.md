                                    # Simple chat app (Convo)

# Description

A simple real-time-chat application where user can send and receive message instantly .
Built using frontend "react + typescript" and backend "express + socket.io + typescript"

# Tech stack

Front-End : ( React + Typescript + tailwindcss )
Backend : (Node js + Express + Typescript)
Real-time communication : ( Socket.IO )
Others : ( Axios (for HTTP requests), npm )

# Project Structure

chat-app/
 frontend/  # React + TypeScript frontend --> inside (.gitignore ignore node_modules and .env)
 backend/  # Express backend with Socket.IO + Typescript
.env.example 
 README.md

# Installation & Setup

### Backend Setup

1.navigate to backend folder --> cd backend/

2.install dependencies ---> npm install

3.copy .env.example to .env and fill your values ---> cp .env.example .env

4. start backend server ---> npm run dev

### Frontend Setup

1.navigate to frontend folder --> cd backend/

2.install dependencies ---> npm install

3. start frontend server ---> npm run dev
