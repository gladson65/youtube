import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';


// lazy loading for optimization
const Sign = lazy(()=> import("./Components/SignIn.jsx"))

// create routing config
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Sign />
      </Suspense>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
