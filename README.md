# Chat System - Phase 1

## Project Overview

This project is part of an assignment to build a chat system using the MEAN stack. The system includes functionality for managing users, groups, channels, and user roles such as Super Admin, Group Admin, and Chat User. This is Phase 1 of the project, focusing on user management, group and channel creation, and basic chat functionality.

## Features

### User Roles
The system supports three types of users:
- **Super Admin**: Has full control over all users and groups.
- **Group Admin**: Can create and manage their own groups and channels.
- **Chat User**: Can join groups, participate in channels, and chat with other users.

### Groups and Channels
- **Groups**: Each user with Group Admin privileges can create groups. Users can join groups to gain access to the channels within those groups.
- **Channels**: Channels are created within groups for chatting. Once a user is a member of a group, they can join any channel within that group.

### Chat Functionality
The chat system allows users to send and receive messages within channels. Messages are displayed in real-time, and users can interact with others in the same channel.

### Local Storage
For Phase 1, data is stored in the browser's local storage to simulate a database. This includes user details, groups, and channels. MongoDB will be introduced in Phase 2 for persistent data storage.

## Components

### Login Component
- **Purpose**: Handles user login and authentication.
- **Functionality**: Verifies user credentials and redirects to the appropriate dashboard based on the user's role.

### Super Admin Component
- **Purpose**: Provides functionality for managing all users and groups in the system.
- **Features**:
  - Create new groups.
  - Manage group membership.
  - Promote users to Group Admin.

### Group Admin Component
- **Purpose**: Allows Group Admins to manage their own groups.
- **Features**:
  - Create channels within groups.
  - Manage users in their groups.

### User Component
- **Purpose**: Enables regular users to view and join groups and participate in channels.
- **Features**:
  - Join available groups.
  - View channels within groups and participate in chat.

### Channel Component
- **Purpose**: Displays the chat interface for users to send and receive messages in real-time.

### Chat Component
- **Purpose**: Handles message sending and receiving within a channel.
- **Features**:
  - Displays the list of messages.
  - Allows users to send new messages.

### Routing
The routing is managed in a `routes.ts` file, where each role has access to specific components based on their privileges.

## Services

### User Service
Handles all user-related operations, including:
- Deleting users.
- Fetching user details.
- Managing group memberships.

### Message Service
Manages the retrieval and sending of messages within channels:
- **getMessages()**: Retrieves the list of messages for a channel.
- **sendMessage()**: Sends a new message to the channel.

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone <repository-url>


# ChatSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
