## Overview

## Mkulima Cooperative Management System
A comprehensive web application designed to manage cooperative farming operations with role-based access control for Admins and Farmers.

🌾 Project Overview

The Mkulima Cooperative Management System is a full-stack web application that enables efficient management of farmers and their crops within a cooperative structure. 
The system provides distinct dashboards and functionalities based on user roles (Admin vs Farmer).

Features
Admin Features
- Dashboard Overview
- Total farmers and crops statistics
- Interactive charts showing crops per farmer distribution

Farmer Management
- View all registered farmers
- Add new farmers to the system
- Edit and delete farmer profiles

Crop Management
- View all crops from all farmers
- Edit and delete any crop in the system
- Comprehensive crop data visualization

Farmer Features
Personal Dashboard
Overview of owned crops

Profile Management
- View and update personal information
- Manage contact details

Crop Management
- Add new crops (name, type, quantity)
- View personal crop inventory
- Edit and delete only owned crops

Tech Stack

1.Frontend
- React (vite)- Modern JavaScript library for building user interfaces
- CSS Framework(Tailwindcss) - Responsive design with modern styling
- Chart.js - Interactive data visualization
- React Router - Client-side routing

2.Backend
- Node.js - JavaScript runtime environment
- Express.js - Web application framework
- Postgres database management
- Sequelize - Object-Relational Mapping (ORM)
- JWT - JSON Web Tokens for authentication

Deployment

Render - Cloud platform for hosting backend
vercel - Frontend

## Getting Started
Prerequisites
Node.js (v14 or higher)
MySQL database
Git

Installation

Clone the repository
```
bashgit clone https://github.com/mercie-ux/mkulima-cooperative.git
cd mkulima-cooperative
```

Install backend dependencies
```
bashcd backend
npm install
```

Install frontend dependencies
```
bashcd ../frontend
npm install
```

Running the Application

Start the backend server
```
bash cd backend
node server.js
```
## Server runs on http://localhost:5000

Start the frontend development server
```
cd frontend
yarn dev
```
## Application runs on http://localhost:5173/


📱 Usage
Admin Access

Email: admin@mkulima.com
Password: admin123
Full system access with farmer and crop management capabilities

Farmer Registration

New farmers can register through the signup page
Access limited to personal profile and crop management
