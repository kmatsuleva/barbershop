# Barbershop Booking System

Visit the website: [Barbershop Booking System](https://barbershop-booking-syste-62a19.web.app/)

## Credentials

**Admin:**

- **Email:** american.barbershop.office@gmail.com
- **Password:** american.barbershop.office1

**Client:**

- **Email:** pavel.georgiev@abv.bg
- **Password:** pavel.georgiev@abv.bg

## Overview

This project is a Single Page Application (SPA) built using React.js and Firebase. It includes both public and private sections, with user authentication and role-based access control. The application features several dynamic pages and incorporates various React concepts and best practices.

### User Roles

- **Guest:** Unauthenticated users who can view basic information about the barbershop.
- **Client:** Registered users who can manage their favorite barbers, and leave testimonials.
- **Admin:** Users with administrative privileges who can manage barbers, oversee client data, and assign roles.

## Technologies Used

- **React.js:** A powerful frontend library for building user interfaces.
- **Firebase:**
  - **Firebase Authentication:** User authentication and management.
  - **Firebase Firestore:** A real-time database for storing and syncing data.
  - **Firebase Storage:** Used for storing files like images and documents.
  - **Firebase Hosting:** Deploys and hosts the web application.
- **Vite:** A fast development and build tool for modern web projects.
- **React Leaflet:** Integrates interactive maps into the application.
- **EmailJS:** Facilitates sending and receiving emails within the app.
- **Swiper:** Enables the creation of smooth slideshows and carousels.

## React Techniques and Concepts

This project leverages several advanced React.js techniques, including:

- **Custom and Native Hooks:** Utilized to manage state and side effects, promoting code reuse and simplicity.
- **React Providers:** Implemented for state management across the application, providing a clean and efficient way to pass data through the component tree.
- **Lazy Loading:** Employed to optimize performance by loading components only when needed, reducing initial load times.

## Project Setup

Follow the steps below to set up and run the project locally:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/kmatsuleva/barbershop.git

   ```

2. **Navigate to the root folder, install dependencies, and run the application:**

   ```sh
   npm install
   npm run dev

   ```

3. **Open the generated URL in your browser:**

   Once the development server is running, you'll see a URL in the terminal output (usually `http://localhost:5173`). Open this URL in your web browser to access the application.
