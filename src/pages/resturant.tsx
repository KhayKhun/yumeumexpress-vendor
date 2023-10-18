import Header from "../components/essentials/Header";
import FoodsManage from "../components/resturant/FoodsManage";
import Info from "../components/resturant/Info";
import Orders from "../components/resturant/Orders";
import Sidebar from "../components/resturant/Sidebar";
import { Routes, Route} from "react-router-dom";

const ResturantPage = () => {
  return (
    <main className="ml-[60px]">
      <Header />
      <Sidebar />
      <Routes>
        <Route index element={<Orders />} />
        <Route path="orders/*" element={<Orders />} />
        <Route path="foods/*" element={<FoodsManage />} />
        <Route path="foods/edit/:foodId" element={<FoodsManage />} />
        <Route path="info/*" element={<Info />} />
      </Routes>
    </main>
  );
};

export default ResturantPage;
