# BloomVision Frontend

A React application for managing BloomVision organisations and users.

## Features

- **Organisation Management**: View and manage organisation users with a responsive table
- **Temporary Login Bypass**: Test the application without authentication
- **Redux State Management**: Centralized state management with Redux Toolkit
- **Material-UI Components**: Modern, responsive UI components
- **Mock API Support**: Fallback to mock data when API is unavailable

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## Testing the Organisation Page

### Method 1: Bypass Login (Recommended for Testing)

1. Navigate to the sign-in page
2. Click the **"🚀 Bypass Login (Testing Only)"** button
3. You'll be automatically redirected to the Organisation page

### Method 2: Environment Variable

Add this to your `.env` file:

```
VITE_BYPASS_AUTH=true
```

### Method 3: Manual localStorage

In browser console, run:

```javascript
localStorage.setItem("bypassAuth", "true");
```

## Organisation Page Features

- **Responsive Table**: Displays organisation data with proper mobile support
- **Row Selection**: Select individual or all organisations with checkboxes
- **Avatar Generation**: Automatic avatar creation based on business names
- **Status Indicators**: Visual chips showing subscription and template status
- **Action Buttons**: Edit, view, delete, and template access controls
- **Date Editing**: Inline editing for trial start/end dates
- **Mock Data Fallback**: Uses sample data when API at `http://localhost:5000` is unavailable

## API Integration

The app attempts to fetch data from:

```
GET http://localhost:5000/organisations/owners/
```

If the API is unavailable, it automatically falls back to mock data for testing purposes.

## Project Structure

```
src/
├── api/                 # API layer and mock data
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   └── organisation/   # Organisation management
├── routes/             # Routing configuration
├── store/              # Redux store and slices
└── utils/              # Helper functions
```

## Technologies Used

- **React 19** - UI framework
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

## Development Notes

This implementation includes a temporary login bypass specifically for testing the Organisation page while the authentication API is being developed. The bypass can be easily removed once the real authentication system is ready.
