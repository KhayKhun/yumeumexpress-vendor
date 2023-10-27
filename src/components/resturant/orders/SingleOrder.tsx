import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { orderType } from "@/constants/global.types";
import { Button } from "@/components/ui/button";
import { CheckmarkFillIcon } from "@/components/essentials/Icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { userOrderStore } from "@/states/orderState";
import socket from "@/lib/socket";

const SingleOrder = () => {
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
  const [items, setItems] = useState<any[]>([]);
  const [order, setOrder] = useState<orderType | null>(null);
  const [error, setError] = useState(false);
  const [rejectInput, setRejectInput] = useState("");
  const [searchParams, _] = useSearchParams({
    display: "none",
  });
  const display = searchParams.get("display");
  const { resturantId } = useParams();
  const fetchOrder = async () => {
    let { data, error } = await supabase
      .from("orders")
      .select("*, profiles:customer_id(id,full_name)") // This line performs the join
      .eq("id", Number(display));

    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      if (data[0]?.seller_id == resturantId) {
        setError(false);
        setOrder(data[0]);
      } else {
        setError(true);
      }
    }
  };
  const fetchOrderItems = async () => {
    let { data, error } = await supabase
      .from("order_items")
      .select("*, product:product_id(*)") // This line performs the join
      .eq("order_id", Number(display));

    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      setItems(data);
    }
  };

  async function responseOrder(status: string, message: string | null) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const { data, error: updateError } = await supabase
      .from("orders")
      .update({
        status: status,
        // Include the date and 'T' in responsed_at
        responsed_at: formattedDate,
        message: message,
      })
      .eq("id", display)
      .select();

    if (updateError) {
      console.log(updateError);
      return;
    }
    if (data[0]) {
      if(data[0].status === "accepted"){  
        socket.emit("approve", data[0]);
      }
      if(data[0].status === "rejected"){  
        socket.emit("reject", data[0]);
      }
    }
    fetchOrders();
    fetchOrder();
  }

  useEffect(() => {
    fetchOrder();
    fetchOrderItems();
  }, [searchParams]);

  function findSubTotal(arr: any[]) {
    let st = 0;
    arr.map((item) => {
      st += item.total_price;
    });
    return st;
  }
  return (
    <>
      {!error && Number(display) ? (
        <main className="w-full h-full max-h-[70vh] flex flex-col gap-2 pt-2 mb-4">
          <h1 className="mx-auto flex text-gray-600">
            no. <span className="text-lg text-black mr-4">{display}</span>
            <Badge variant={"success"} className="opacity-50">
              Paid <CheckmarkFillIcon />
            </Badge>
          </h1>
          <hr />
          <div className="text-gray-700 text-[13px]">
            <p className="">Name: {order?.profiles.full_name}</p>
            <p className="">Address: {order?.address}</p>
            {order?.customer_message && (
              <p className="">Message: {order.customer_message}</p>
            )}
          </div>
          <hr />
          <ul className="grid grid-cols-4 gap-2">
            {items?.map((item) => {
              return (
                <li key={item.id}>
                  <div className="w-[60px] h-[60px] relative ">
                    <img
                      src={item.product.image}
                      className="w-full h-full rounded-lg object-cover"
                    />
                    <Badge
                      variant={"destructive"}
                      className="absolute bottom-0 right-0"
                    >
                      &times;{item.quantity}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border">
            <Table>
              <TableBody>
                {items?.map((item, index) => {
                  return (
                    <TableRow key={item.product.id}>
                      <TableCell className="font-medium text-gray-500">
                        {index + 1}.
                      </TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>&times;{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {item.total_price}
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow className="border-0">
                  <TableCell colSpan={2} className="text-center">
                    SubTotal
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {items && findSubTotal(items)}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell colSpan={2} className="text-center">
                    Delivery Fee
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {order?.delivery_fee}
                  </TableCell>
                </TableRow>
                <TableRow className=" ">
                  <TableCell
                    colSpan={2}
                    className="text-center font-semibold text-[18px]"
                  >
                    Total
                  </TableCell>
                  <TableCell colSpan={2} className="text-right font-semibold">
                    {order?.delivery_fee &&
                      findSubTotal(items) &&
                      order?.delivery_fee + findSubTotal(items)}
                    <span className="text-gray-500"> MMK</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {order?.status === "pending" ? (
            <div className="flex justify-between px-4">
              <Dialog>
                <DialogTrigger className="h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg">
                  Reject
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject order no.{display}?</DialogTitle>
                  </DialogHeader>
                  <input
                    className="border p-3 rounded-md w-full"
                    onChange={(e) => {
                      setRejectInput(e.target.value);
                    }}
                    placeholder="Leave a message"
                  />
                  <div className="flex justify-between">
                    <DialogClose className="bg-gray-50 border p-2 px-4 rounded-lg">
                      Cancel
                    </DialogClose>
                    <DialogClose
                      disabled={rejectInput.length < 5}
                      className="h-10 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                      onClick={() => {
                        responseOrder("rejected", rejectInput);
                      }}
                    >
                      Reject
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant={"primary"}
                className="px-8"
                onClick={() => {
                  responseOrder("accepted", null);
                }}
              >
                Accept
              </Button>
            </div>
          ) : (
            <div
              className={`w-full flex justify-center items-center border-2 p-4 rounded-l border-dashed ${
                order?.status === "accepted"
                  ? "border-primary-green bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              {order?.status === "accepted" ? "Accepted" : "Rejected"}
            </div>
          )}
        </main>
      ) : (
        <h1>Select an order to see details</h1>
      )}
    </>
  );
};

export default SingleOrder;
