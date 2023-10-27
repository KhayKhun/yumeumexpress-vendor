import { useSearchParams } from "react-router-dom";
import OrderTable from "./OrderTable";
import SingleOrder from "./SingleOrder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  const [_, setSearchParams] = useSearchParams({
    pending: "false",
  });

  const setPending = (value:string) => {
    setSearchParams(
      (prev: any) => {
        prev.set("pending", value);
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <div className="flex gap-2 h-screen pr-[352px]">
      <div className="w-full">
        <Tabs defaultValue="All" className="w-full">
          <TabsList>
            <TabsTrigger
              value="Pending"
              onClick={() => {
                setPending("true");
              }}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="All"
              onClick={() => {
                setPending("false");
              }}
            >
              All
            </TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <OrderTable />
          </TabsContent>
          <TabsContent value="Pending">
            <OrderTable />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[350px] fixed right-0 bottom-0 h-screen pt-[60px] overflow-auto">
        <SingleOrder />
      </div>
    </div>
  );
};

export default Orders;
