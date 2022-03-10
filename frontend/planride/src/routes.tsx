import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTransportationRequest from "./pages/CreateTransportationRequest";
import CreateTransportationOffer from "./pages/CreateTransportationOffer";
import Requests from "./pages/Requests";
import Request from "./pages/Request";
import Offers from "./pages/Offers";
import Signup from "./pages/Signup";

const Router: React.FC = () => {
  return useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        {
          path: "create-transportation-request",
          element: <CreateTransportationRequest />,
        },
        {
          path: "create-transportation-offer",
          element: <CreateTransportationOffer />,
        },
        {
          path: "requests",
          element: <Requests />,
        },
        {
          path: "requests/:requestId",
          element: <Request />,
        },
        { path: "offers", element: <Offers /> },
        { path: "signup", element: <Signup /> },
      ],
    },
  ]);
};

export default Router;
