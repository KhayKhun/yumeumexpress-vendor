import { useEffect } from "react";
import socket from './socket'
import { userOrderStore } from "@/states/orderState";
import { useToast } from "@/components/ui/use-toast";
import supabase from "./supabase";

export default function TestSocket() {
  const{toast} = useToast();
  const updateOrders = userOrderStore((state:any) => state?.updateOrders)
  function JoinSocket(resturant_id:string) {
    socket.emit("join", resturant_id);
  }
  
  const setOrders = userOrderStore((state: any) => state.setOrders);

  const fetchOrders = async (resturantId : string|number) => {
    let { data, error } = await supabase
      .from("orders")
      .select("*,order_items (*)")
      .eq("seller_id", resturantId);
    if (error) {
      console.log(error);
      return;
    }
    setOrders(data);
  };
  useEffect(() => {
    socket.on("server:order-from-client", (data:any) => {
      console.log(data);
      toast({
        title: "New order!",
      });
      fetchOrders(data.seller_id);
    });
  }, [socket]);

  const approveFunc = (order: any) => {
    socket.emit("approve", order);
  };
  return {JoinSocket,approveFunc}

}
