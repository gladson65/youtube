import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App.jsx';
import './index.css';



// lazy loading for optimization
const Sign = lazy(()=> import("./Components/SignIn.jsx"));
const Home = lazy(()=> import("./Components/Home.jsx"));
const VideoPlayer = lazy(()=> import("./Components/VideoPlayer.jsx"));
const ChannelPage = lazy(()=> import("./Components/ChannelPage.jsx"));
const CreateChannel = lazy(()=> import("./Components/CreateChannel.jsx"));
const Error = lazy(()=> import("./Components/Error.jsx"));

// create routing config
const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
    children: [
      {
        path: "/",
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

      {

        path: "/createchannel",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreateChannel />
          </Suspense>
        )

      },

      {
        path: "/channelpage",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ChannelPage />
          </Suspense>
        )
      },
    ],

    errorElement: <Suspense><Error /></Suspense>
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
