import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';



// lazy loading for optimization
const Sign = lazy(()=> import("./Components/SignIn.jsx"));
const Home = lazy(()=> import("./Components/Home.jsx"));
const VideoPlayer = lazy(()=> import("./Components/VideoPlayer.jsx"));

// create routing config
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home/>
          </Suspense>
        ),
      },

      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoPlayer />
          </Suspense>
        ),
      },
    ]
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
