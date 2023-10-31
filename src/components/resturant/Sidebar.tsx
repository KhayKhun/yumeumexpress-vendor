import { Link } from "react-router-dom";
import { BackButton, FoodIcon, NotiIcon, ResturantIcon } from "../essentials/Icons";
import { useLocation } from "react-router-dom";
import AuthComponent from "../auth/AuthComponent";
import { Selector } from "./Selector";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex sm:block items-center justify-between w-screen sm:w-full sm:bg-transparent bg-white px-4 sm:p-0  h-[40px] fixed top-0 left-0 z-50">
      <SidebarContent className="hidden sm:flex items-center" />
      <div className="sm:hidden [&>*]:flex [&>*]:items-center text-primary-green">
        {path.includes("/info") ? (
          <p>
            <BackButton text="Info" />
          </p>
        ) : path.includes("/foods") ? (
          <p>
            <BackButton text="Foods" />
          </p>
        ) : path.includes("/orders") ? (
          <p>
            <BackButton text="Orders"/> 
          </p>
        ) : (
          <></>
        )}
      </div>
      <Sheet>
        <SheetTrigger className="sm:hidden">
          <MenuIcon className="text-primary-green" />
        </SheetTrigger>
        <SheetContent side={"left"} className="">
          <SidebarContent className="flex sm:hidden" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;

export function SidebarContent({ className }: { className: string }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <main
      className={`${className} bg-white flex-col justify-between p-2  h-screen fixed z-50 border-0 md:border-r md:shadow-lg w-[200px] left-0 text-green-800 items-start text-base`}
    >
      <ul className=" flex flex-col gap-1 w-full">
        <Selector />
        <Link
          className={` p-2 rounded-md flex items-center w-full gap-2 ${
            path.includes("/orders")
              ? "bg-primary-green text-white"
              : "hover:bg-gray-50 bg-white"
          }`}
          to={{
            pathname: "orders",
            search: "?pending=false",
          }}
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
      </ul>
      <AuthComponent />
    </main>
  );
}
