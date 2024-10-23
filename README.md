Chat System
This project is a chat system application built with Angular on the frontend and Node.js with MongoDB on the backend. It supports real-time communication using Socket.io and video calls using PeerJS.

Table of Contents
Repository Layout
GitHub Commands
How to Run the Project
Data Structures
Client-Server Responsibilities
API Routes
Angular Architecture
Client-Server Interactions
Repository Layout
The repository is organized into the following folders:

src: Contains the Angular project files for the frontend.
app: All Angular components, services, and modules.
assets: Static files like images.
environments: Environment-specific configurations for Angular.
server.js: The main server file, which runs the Node.js backend.
uploads: A directory for storing user-uploaded files.
public: A folder containing static files served by Express.
test: Contains the Mocha/Chai tests for API testing.
Branching Strategy
master: The main branch, containing the stable release of the project.
feature-branches: Used for implementing specific features or fixing bugs.
GitHub Commands
Clone the Repository
bash
Copy code
git clone https://github.com/BigManGurthage/chat-system.git
cd chat-system
Creating a New Branch
bash
Copy code
git checkout -b feature-branch-name
Adding and Committing Changes
bash
Copy code
git add .
git commit -m "Commit message describing changes"
Pushing Changes to GitHub
bash
Copy code
git push origin feature-branch-name
Merging Branches
After making sure the feature is tested:

bash
Copy code
git checkout master
git pull origin master
git merge feature-branch-name
Pull Latest Changes
bash
Copy code
git pull origin master
How to Run the Project
Prerequisites
Node.js (v16 or higher)
MongoDB (either locally installed or using a service like MongoDB Atlas)
Angular CLI (globally installed)
Backend (Node.js + MongoDB)
Install dependencies for the backend:

bash
Copy code
npm install
Start MongoDB (Make sure your MongoDB server is running):

bash
Copy code
mongod
Run the backend:

bash
Copy code
node server.js
Testing the API with Mocha:

bash
Copy code
npx mocha test/api.test.js
Frontend (Angular)
Navigate to the src folder and install frontend dependencies:

bash
Copy code
npm install
Run the Angular frontend:

bash
Copy code
ng serve
Open your browser and go to:

bash
Copy code
http://localhost:4200
Data Structures
User:
json
Copy code
{
  "username": "string",
  "password": "string",
  "avatar": "string",
  "groups": ["string"]
}
Group:
json
Copy code
{
  "groupName": "string",
  "members": ["string"],
  "channels": ["string"]
}
Chat Message:
json
Copy code
{
  "channelId": "string",
  "messages": [
    {
      "username": "string",
      "message": "string",
      "avatar": "string",
      "timestamp": "Date"
    }
  ]
}
Client-Server Responsibilities
Client (Angular)
UI/UX: Responsible for the frontend user interface, rendering groups, channels, and chat messages.
Real-time Communication: Listens for messages from the server via Socket.io and updates the UI accordingly.
HTTP Requests: Sends requests to the backend for actions like registering users, sending messages, and managing groups/channels.
Server (Node.js + Express)
API: Handles RESTful routes for user registration, message sending, and group management.
WebSocket: Manages real-time communication between users through Socket.io.
MongoDB: Stores and retrieves data related to users, groups, channels, and chat messages.
API Routes
POST /api/register
Parameters: username, password
Purpose: Registers a new user.
POST /api/send-message
Parameters: channelId, username, message, avatar
Purpose: Sends a chat message in the specified channel.
POST /api/upload-avatar
Parameters: userId, avatar
Purpose: Uploads a new profile image for the user.
Angular Architecture
Components:
LoginComponent: Handles user authentication.
GroupComponent: Manages groups and channels.
ChatComponent: Displays the chat window and handles messaging.
LogoutComponent: Logs the user out of the application.
Services:
AuthService: Manages user authentication.
StorageService: Manages local storage for groups, channels, and messages.
ChatService: Handles real-time chat using Socket.io.
Models:
User: Represents a user in the system.
Group: Represents a group with members and channels.
Client-Server Interaction
When a user joins a group or channel, the following flow occurs:

Client (Angular):
The user selects a group/channel.
A request is made to the server to join the channel.
The server adds the user to the channel.
Server (Node.js):
Updates the list of users in the channel.
Notifies all users in the channel about the new participant using Socket.io.
Client (Angular):
Listens for the userJoined event from the server.
Updates the UI to show that a new user has joined.