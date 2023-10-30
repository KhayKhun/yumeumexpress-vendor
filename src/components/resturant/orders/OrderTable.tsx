import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderType } from "@/constants/global.types";
import supabase from "@/lib/supabase";
import { userOrderStore } from "@/states/orderState";
import { useEffect} from "react";
import { useParams,
  } from "react-router-dom";
import OrderRow from "./OrderRow";
const OrderTable = () => {

  const orders = userOrderStore((state: any) => state.orders);
  const { resturantId } = useParams();
  const setOrders = userOrderStore((state: any) => state.setOrders);
  const fetchOrders = async () => {
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
    fetchOrders();
  }, [resturantId]);

  return (
    <div className="w-full h-full">
      {orders?.length > 0 ? (
        <Table>
          <TableHeader className="sticky top-0 w-full">
            <TableRow className="[&>*]:text-white max-h-[40px]">
              <TableHead className="w-[100px]">Num</TableHead>
              <TableHead>Ordered_at</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full h-full">
            {orders
              ?.sort((a: orderType, b: orderType) => {
                const dateA: any = new Date(a.ordered_at);
                const dateB: any = new Date(b.ordered_at);
                return dateB - dateA;
              })
              .map((order: orderType) => {
                return (
                  <OrderRow key={order.id} order={order}/>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <p className="w-full h-full flex justify-center items-center bg-gray-50">
          No orders yet
        </p>
      )}
    </div>
  );
};

export default OrderTable;
