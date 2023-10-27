import { Link } from "react-router-dom"
import {  FoodIcon, NotiIcon, ResturantIcon } from "../essentials/Icons"
import { useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname
  return (
    <main className="bg-white flex flex-col gap-1 p-2 text-green-800 items-start text-base border-r shadow-lg w-[200px] left-0 h-screen fixed z-50">
      <Link
        className={` p-2 rounded-md flex items-center w-full gap-2 ${
          path.includes("/orders")
            ? "bg-primary-green text-white"
            : "hover:bg-gray-50 bg-white"
        }`}
        to="orders"
      >
        <NotiIcon /> <span className="">Orders</span>
      </Link>
      <Link
        className={` p-2 rounded-md flex items-center w-full gap-2 ${
          path.includes("/foods")
            ? "bg-primary-green text-white"
            : "hover:bg-gray-50 bg-white"
        }`}
        to="foods"
      >
        <FoodIcon />
        <span className="">Foods</span>
      </Link>
      <Link
        className={` p-2 rounded-md flex items-center w-full gap-2 ${
          path.includes("/info")
            ? "bg-primary-green text-white"
            : "hover:bg-gray-50 bg-white"
        }`}
        to="info"
      >
        <ResturantIcon />
        <span className="">Vendor info</span>
      </Link>
    </main>
  );
}

export default Sidebar