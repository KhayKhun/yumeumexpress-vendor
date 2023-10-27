import { useEffect, useState } from "react";
import Header from "../components/essentials/Header";
import FoodsManage from "../components/resturant/FoodsManage";
import Info from "../components/resturant/Info";
import Orders from "../components/resturant/orders/Orders";
import Sidebar from "../components/resturant/Sidebar";
import { Routes, Route } from "react-router-dom";
import { useSellerStore } from "@/states/resturantState";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import TestSocket from "@/lib/TestSocket";
const ResturantPage = () => {
  const navigate = useNavigate();
  const { resturantId } = useParams();
  const [error,setError] = useState(false);
  const setSeller = useSellerStore((state: any) => state.setSeller);

  const {JoinSocket} = TestSocket();

  const fetchOwner = async (owner_id: string) => {
    const { data, error } = await supabase
      .from("sellers")
      .select("*")
      .eq("id", resturantId);

    if (error) {
      console.log(error);
      return;
    }
    if (data[0].owner_id === owner_id) {
      setError(false);
        setSeller(data[0]);
        JoinSocket(data[0].id)

    } else {
      setError(true)
    }
  };
  useEffect(() => {
    const getSession = supabase.auth.getSession();

    getSession.then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data.session?.user) {
        fetchOwner(response.data.session?.user.id);
        console.log('authed')
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <main className="ml-[200px]">
      <Header />
      <Sidebar />
      {!error && (
        <Routes>
          <Route index element={<Orders />} />
          <Route path="orders/*" element={<Orders />} />
          <Route path="foods/*" element={<FoodsManage />} />
          <Route path="info/*" element={<Info />} />
        </Routes>
      )}
    </main>
  );
};

export default ResturantPage;
