import { useEffect } from "react";
import socket from "./socket";
import { userOrderStore } from "@/states/orderState";
import { useToast } from "@/components/ui/use-toast";
import supabase from "./supabase";

export default function TestSocket() {
  const { toast } = useToast();
  function JoinSocket(resturant_id: string | number) {
    socket.emit("join", resturant_id);
  }

  const setOrders = userOrderStore((state: any) => state.setOrders);

  const fetchOrders = async (resturantId: string | number) => {
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
    socket.on("server:order-from-client", (prop: any) => {
      async function fetchSeller() {
        const { data, error } = await supabase
          .from("sellers")
          .select("*")
          .eq("id", prop.seller_id);

        if (error) {
          console.log(error);
          return;
        }
        if (data[0]) {
          console.log(data);
          toast({
            title: "New order to " + data[0].name+"!",
          });
          fetchOrders(prop.seller_id);
        }
      }
      fetchSeller();
    });

  }, [socket]);

  const approveFunc = (order: any) => {
    socket.emit("approve", order);
  };
  const rejectFunc = (order: any) => {
    socket.emit("reject", order);
  };
  return { JoinSocket, approveFunc, rejectFunc };
}
