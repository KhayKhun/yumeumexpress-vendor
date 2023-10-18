import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/profile.tsx";
import DashboardPage from "./pages/dashboard.tsx";
import ResturantPage from "./pages/resturant.tsx";
import Redirect from "./pages/redirect.tsx";
import Orders from "./components/resturant/Orders.tsx";
import FoodsManage from "./components/resturant/FoodsManage.tsx";
import Info from "./components/resturant/Info.tsx";

const MarginGap = () => <div className="mb-[60px]" />;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard/resturants",
    element: <DashboardPage />,
  },
  {
    path: "dashboard",
    element: <Redirect />,
  },
  {
    path: "dashboard/resturant/:resturantId/*",
    element: <ResturantPage />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "foods",
        element: <FoodsManage />,
      },
      {
        path: "info",
        element: <Info />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MarginGap />
    <RouterProvider router={router} />
  </React.StrictMode>
);
