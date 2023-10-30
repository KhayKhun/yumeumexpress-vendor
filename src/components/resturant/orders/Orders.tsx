import { useSearchParams } from "react-router-dom";
import OrderTable from "./OrderTable";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const [searchParams, _] = useSearchParams({
    pending: "false",
  });
  const display = searchParams.get("display");

  return (
    <div
      className={`flex gap-2 h-screen ${
        Number(display) ? "md:pr-[352px]" : "pr-0"
      }`}
    >
      <div className="w-full">
        <OrderTable />
      </div>
      <div
        className={`${
          Number(display) ? "w-[350px]" : "w-0"
        } fixed right-0 bottom-0 h-screen overflow-auto hidden md:block`}
      >
        <SingleOrder />
      </div>
    </div>
  );
};

export default Orders;
