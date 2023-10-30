import { formatRelativeDate } from "@/constants/functions";
import { Badge } from "@/components/ui/badge";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SingleOrder from "./SingleOrder";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { orderType } from "@/constants/global.types";

const OrderRow = ({order} : {order:orderType}) => {
  const triggerRef = useRef<any>();
  const [searchParams, setSearchParams] = useSearchParams({
    display: "none",
  });
  const display = searchParams.get("display");
  return (
    <Sheet key={order.id}>
      <TableRow
        className={`${display == order.id && "selected"} w-full`}
        onClick={() => {
          setSearchParams(
            (prev: any) => {
              prev.set("display", order.id);
              return prev;
            },
            { replace: true }
          );
          if (window.innerWidth < 768) {
            triggerRef.current?.click();
          }
        }}
      >
        <TableCell>
          <SheetTrigger className="hidden" ref={triggerRef}></SheetTrigger>
          <Badge variant={"outline"}>{order.id}</Badge>
        </TableCell>
        <TableCell>{formatRelativeDate(order.ordered_at)}</TableCell>
        <TableCell>
          <Badge
            className={`${order.status === "pending" && "bg-amber-100"}`}
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
      <SheetContent side={'right'} className="overflow-auto w-[90vw]">
        <SingleOrder />
      </SheetContent>
    </Sheet>
  );
};

export default OrderRow;
