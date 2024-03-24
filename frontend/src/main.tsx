import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/Auth/Login.tsx";
import Register from "./components/Auth/Register.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import PrivateRoute from "./components/Auth/PrivateRoute.tsx";
import TaskDetail from "./components/Dashboard/TaskDetail.tsx";
import EditTaskPage from "./components/Dashboard/EditTaskPage.tsx";
import AddTaskPage from "./components/Dashboard/AddTaskPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/dashboard/tasks/:id",
        element: <TaskDetail />,
      },
      {
        path: "/dashboard/tasks/edit/:id",
        element: <EditTaskPage />,
      },
      {
        path: "/dashboard/tasks/add",
        element: <AddTaskPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
