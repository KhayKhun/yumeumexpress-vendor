import AuthComponent from "../auth/AuthComponent";
// import { useLocation } from "react-router-dom";
// import NavigateResturants from "./NavigateResturants";
const Header = () => {
  // const location = useLocation();
  // const path = location.pathname;

  return (
    <main className="border flex items-center justify-between px-[40px] fixed z-40 top-0 left-0 w-screen h-[60px] shadow-md text-primary-green bg-white">
      {
        // path.includes('/resturant/') && <NavigateResturants/>
      }

      <ul className="flex gap-7 items-center text-2xl">
        <AuthComponent />
      </ul>
    </main>
  );
};

export default Header;
