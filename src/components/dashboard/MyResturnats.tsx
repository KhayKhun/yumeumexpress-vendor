import { useEffect } from "react";
import supabase from "../../lib/supabase";
import { useAuthStore } from "../../states/authState";
import { useResturantStore } from "../../states/resturantState";
import { resturantType } from "../../constants/global.types";
import ResturantCard from "./ResturantCard";
import AuthComponent from "../auth/AuthComponent";
import Register from "./Register";

const MyResturants = () => {
  const user = useAuthStore((state: any) => state.user);
  const resturants = useResturantStore((state: any) => state.resturants);
  const setResturants = useResturantStore((state: any) => state.setResturants);

  const fetchResturants = async () => {
    const { data, error } = await supabase
      .from("sellers")
      .select()
      .eq("owner_id", user.id);

    if (error) {
      console.log(error);
      return;
    }
    setResturants(data);
  };
  
  useEffect(() => {
    if (user?.id) {
      fetchResturants();
    }
  }, [user]);
  return (
    <div className="flex flex-col gap-3 items-start">
      <AuthComponent />
      <h1 className="text-2xl font-semibold tracking-wide">My Resturants</h1>
      <Register fetchResturants={fetchResturants} />

      {resturants?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resturants.map((resturant: resturantType) => {
            return <ResturantCard key={resturant.id} data={resturant} />;
          })}
        </ul>
      ) : (
        <main className="p-4">
          <div className="w-full border-2 border-gray-400 text-gray-400 border-dashed rounded-lg flex flex-col justify-center items-center py-7 gap-4">
            <p>
              No resturants found with the owner{" "}
              <span className="underline"> {user?.email}</span>. Register a new
              resturant?
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default MyResturants;
