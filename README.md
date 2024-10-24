# Chat System

This project is a chat system application built with **Angular** on the frontend and **Node.js** with **MongoDB** on the backend. It supports real-time communication using **Socket.io** and video calls using **PeerJS**.

## Table of Contents
- [Repository Layout](#repository-layout)
- [Branching Strategy](#branching-strategy)
- [GitHub Commands](#github-commands)
- [How to Run the Project](#how-to-run-the-project)
- [Data Structures](#data-structures)
- [Client-Server Responsibilities](#client-server-responsibilities)
- [API Routes](#api-routes)
- [Angular Architecture](#angular-architecture)
- [Client-Server Interactions](#client-server-interactions)

## Repository Layout

The repository is organized into the following folders:

- **src**: Contains the Angular project files for the frontend.
- **app**: All Angular components, services, and modules.
- **assets**: Static files like images.
- **environments**: Environment-specific configurations for Angular.
- **server.js**: The main server file, which runs the Node.js backend.
- **uploads**: A directory for storing user-uploaded files.
- **public**: A folder containing static files served by Express.
- **test**: Contains the Mocha/Chai tests for API testing.

## Branching Strategy

- **master**: The main branch, containing the stable release of the project.
- **feature-branches**: Used for implementing specific features or fixing bugs. Each feature or bug fix should be developed in its own branch.

To create a feature branch:

```bash
git checkout -b feature-branch-name

GitHub Commands
Clone the repository:
bash
Copy code
git clone https://github.com/BigManGurthage/chat-system.git
Check the status of your working directory:
bash
Copy code
git status
Stage changes:
bash
Copy code
git add .
Commit your changes:
bash
Copy code
git commit -m "Your commit message"
Push your changes to a branch:
bash
Copy code
git push origin feature-branch-name
How to Run the Project
Install Dependencies:

For backend (Node.js):
bash
Copy code
cd backend
npm install
For frontend (Angular):
bash
Copy code
cd frontend
npm install
Run the Backend:

bash
Copy code
cd backend
node server.js
Run the Frontend:

bash
Copy code
cd frontend
ng serve
Access the Application: Open your browser and go to http://localhost:4200.

Data Structures
User: Contains information about registered users, such as name, email, profile picture, and role (admin/user).
Message: Contains chat messages, including sender info, timestamp, and message content.
Channel: Defines the structure for chat channels, including the list of users, channel name, and messages.
Client-Server Responsibilities
Frontend (Angular): Manages user interactions, chat UI, and video call functionality using PeerJS.
Backend (Node.js + MongoDB): Manages authentication, database interactions, real-time chat with Socket.io, and API routes.
API Routes
POST /api/users: Create a new user.
GET /api/channels: Fetch all available chat channels.
POST /api/messages: Send a new chat message.
GET /api/messages/
: Fetch messages from a specific channel.
Angular Architecture
Components: Split into various components such as chat, login, user-profile, channel-list, etc.
Services: Handles HTTP requests to the server and real-time communication using Socket.io.
Modules: The app is modularized into core modules for user management, messaging, and channel management.
Client-Server Interactions
Login Process:

User submits credentials.
Angular service sends a POST request to the backend.
Backend authenticates and returns a JWT token.
Real-time Messaging:

User sends a message through the frontend.
Socket.io emits the message to the backend.
Backend stores the message in MongoDB and broadcasts it to other users in the same channel.
bash
Copy code

This should render well in Markdown and help organize the structure of your README.