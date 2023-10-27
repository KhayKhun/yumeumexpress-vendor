import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRelativeDate } from "@/constants/functions";
import { Badge } from "@/components/ui/badge";
import { orderType } from "@/constants/global.types";
import supabase from "@/lib/supabase";
import { userOrderStore } from "@/states/orderState";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const OrderTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    display: "none",
  });
  const display = searchParams.get("display");
  const pending = searchParams.get("pending");

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
  }, []);

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
              .filter((o : orderType) => {
                if(pending === 'true'){
                  return o.status === 'pending'
                }
                else{
                  return true;
                }
              })
              .map((order: orderType) => {
                return (
                  <TableRow
                    className={`${display == order.id && "selected"} w-full`}
                    key={order.id}
                    onClick={() => {
                      setSearchParams(
                        (prev: any) => {
                          prev.set("display", order.id);
                          return prev;
                        },
                        { replace: true }
                      );
                    }}
                  >
                    <TableCell>
                      <Badge variant={"outline"}>{order.id}</Badge>
                    </TableCell>
                    <TableCell>
                      {formatRelativeDate(order.ordered_at)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          order.status === "pending" && "bg-amber-100"
                        }`}
                        variant={
                          order.status === "pending"
                            ? "outline"
                            : order.status === "accepted"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
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
