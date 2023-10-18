import { Link } from "react-router-dom"
import {  FoodIcon, NotiIcon, ResturantIcon } from "../essentials/Icons"
import { useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname
  console.log(path)
  return (
    <main className="bg-white flex flex-col gap-1 pt-4 text-primary-green items-center text-2xl border-r shadow-lg w-[60px] left-0 h-screen fixed">
      <Link className={` p-2 rounded-md ${path.includes('/orders') ? 'bg-green-700 text-white' : 'hover:bg-gray-50 bg-white'}`} to="orders">
        <NotiIcon/>
      </Link>
      <Link className={` p-2 rounded-md ${path.includes('/foods') ? 'bg-green-700 text-white' : 'hover:bg-gray-50 bg-white'}`} to="foods">
        <FoodIcon/>
      </Link>
      <Link className={` p-2 rounded-md ${path.includes('/info') ? 'bg-green-700 text-white' : 'hover:bg-gray-50 bg-white'}`} to="info" >
        <ResturantIcon/>
      </Link>

    </main>
  )
}

export default Sidebar