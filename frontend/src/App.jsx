import { useState } from "react";
//import Pages for router dom
import Homepage from "./routes/Homepage/Homepage";
import Loginpage from "./routes/Loginpage/Loginpage";
import Layout from "./routes/layout/layout";
import Uploadpage from "./routes/Uploadpage/Uploadpage";
import Chatpage from "./routes/Chatpage/Chatpage";
import Preloader from "./routes/Preloader/Preloader";
import ProtectedRoute from "./routes/utils/ProtectedRoute";
//router dom setup
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <Loginpage />,
        },
        {
          path: "/upload",
          element: <ProtectedRoute element={<Uploadpage />} />,
        },
        {
          path: "/chat",
          element: <ProtectedRoute element={<Chatpage />} />,
        },
        {
          path: "/preloader",
          element: <ProtectedRoute element={<Preloader />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

// function App() {
//
// }

export default App;
