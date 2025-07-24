
# React JWT Authentication with Protected Routes and User Profile

This is a React application demonstrating a full authentication flow with JWT, including login, signup, token management, protected routes, and user profile display.


## Features

- **Login and Signup** with form validation powered by [Zod](https://github.com/colinhacks/zod)
- **JWT Authentication** with access token stored in `sessionStorage` and refresh token stored in `localStorage`
- **Protected Routes** using a `ProtectedRoute` wrapper component that restricts access based on authentication state
- **User Profile** fetching and display on the welcome/dashboard page
- **Logout** functionality clearing tokens and redirecting users to login
- Integration with backend API endpoints for authentication and user data


## Tech Stack

- React 18
- React Router v6
- Axios for HTTP requests
- Zod for schema validation
- Sonner for toast notifications
- Tailwind CSS for UI styling
- Lucide-react for icons


## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- Backend server running with these endpoints:
  - `POST /auth/login` — for user login, returns access and refresh tokens
  - `POST /auth/signup` — for user registration
  - `GET /auth/welcome` — protected route returning authenticated user profile data

### Installation

1. Clone the repo:

```bash
git clone https://github.com/AnanthuSpace/simple_login_system
cd simple_login_system
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file and set your backend API URL:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
# or
yarn run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).


## Usage

* Navigate to `/login` or `/signup` to authenticate.
* On successful login:

  * Access token is saved to `sessionStorage`
  * Refresh token is saved to `localStorage`
* The `/welcome` route is protected; only accessible when logged in.
* User profile data is fetched and displayed on the welcome page.
* Click the **Logout** button to clear tokens and return to login.


## Project Structure

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── api/
│   │   └── authApi.js             # Axios API calls for authentication
│   ├── components/
│   │   └── ui/
│   │       └── ProtectedRoute.tsx # Component to protect routes based on auth
│   ├── pages/
│   │   ├── AuthPage.tsx           # Login / Signup form
│   │   └── WelcomePage.tsx        # Dashboard page showing user profile
│   ├── schemas/
│   │   └── authSchemas.ts         # Zod validation schemas for forms
│   ├── router.tsx                 # React Router setup with protected routes
│   └── App.tsx                   # Main React app entry point
├── package.json
└── tailwind.config.js             # Tailwind CSS config (if used)
```


### Backend (`/backend`)

```
backend/
├── controllers/
│   └── authController.js          # Logic for auth routes (login, signup, welcome)
├── middleware/
│   └── verifyToken.js             # Middleware to verify JWT access token
├── models/
│   └── User.js                    # Mongoose User schema and model
├── routes/
│   └── authRoutes.js              # Express router for auth endpoints
├── utils/
│   └── generateTokens.js          # Helper functions to create JWT tokens
├── app.js                        # Express app setup and middleware
├── server.js                     # Server entry point (starts app)
├── package.json
└── .env                         # Environment variables (DB URI, JWT secret, etc.)
```



## Important Notes

* This frontend requires a backend that supports JWT authentication and provides appropriate APIs.
* Access tokens are stored in `sessionStorage` to limit lifespan to the current tab session.
* Refresh tokens are stored in `localStorage` for persistent authentication across sessions.
* `ProtectedRoute` ensures unauthenticated users cannot access private pages.
* The welcome page fetches the user profile on load using the access token for authorization.


## Contributing

Contributions, issues, and feature requests are welcome! Please ensure you follow best practices and test thoroughly.
