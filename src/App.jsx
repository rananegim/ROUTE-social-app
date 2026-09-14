import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Profile from "./Components/Profile/Profile";
import Feed from "./Components/Feed/Feed";
import Notfound from "./Components/Notfound/Notfound";
import { CounterContextProvider } from "./context/CounterContext";
import { AuthContextProvider } from "./context/Authcontext";
import Notifications from "./Components/Notifications/Notifications";
import ProtectRoute from "./ProtectRoute/ProtectRoute";
import ProtectAuth from "./ProtectAuth/ProtectAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./Components/PostDetails/PostDetails";


const queryClient = new QueryClient()
function App() {
  let route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectAuth> <Register /> </ProtectAuth> },
        { path: "login", element: <ProtectAuth> <Login /> </ProtectAuth> },
        { path: "profile", element: <ProtectRoute>  <Profile/> </ProtectRoute>},
        { path: "feed", element: <ProtectRoute> <Feed/> </ProtectRoute> },
        {path:"notifications" , element:<ProtectRoute> <Notifications/> </ProtectRoute>},
        {path:'postDetails/:id' , element:<ProtectRoute> <PostDetails/> </ProtectRoute>},
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
   <QueryClientProvider client={queryClient}>
       <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={route} />
        </CounterContextProvider>
      </AuthContextProvider>
   </QueryClientProvider>
    </>
  );
}

export default App;
