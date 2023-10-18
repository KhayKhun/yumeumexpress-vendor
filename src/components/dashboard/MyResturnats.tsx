import { useEffect } from "react";
import supabase from "../../../utils/supabase";
import { useAuthStore } from "../../states/authState";
import { useResturantStore } from "../../states/resturantState";
import { resturantType } from "../../constants/global.types";
import ResturantCard from "./ResturantCard";
import { Link } from "react-router-dom";
import { PlusIcon } from "../essentials/Icons";
const MyResturants = () => {
  const user = useAuthStore((state: any) => state.user);
  const resturants = useResturantStore((state: any) => state.resturants);
  const setResturants = useResturantStore((state: any) => state.setResturants);

  const fetchResturants = async (id: string) => {
    const { data, error } = await supabase
      .from("sellers")
      .select()
      .eq("owner_id", id);

    if (error) {
      console.log(error);
      return;
    }
    setResturants(data);
  };

  useEffect(() => {
    if (user?.id) {
      fetchResturants(user.id);
    }
  }, [user]);
  console.log(user);
  return (
    <div className="flex flex-col gap-3 items-start">
      <h1 className="text-2xl font-semibold tracking-wide">
        My Resturants
      </h1>
      <Link
        to="/register"
        className="bg-primary-green p-2 rounded-md text-white hover:bg-green-500 flex gap-2 items-center"
      >
        Create new <PlusIcon />
      </Link>

      {resturants?.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3">
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
            <Link
              to="/register"
              className="shadow-sm bg-primary-green hover:bg-green-500 py-2 px-4 rounded-lg text-white"
            >
              Register new resturant
            </Link>
          </div>
        </main>
      )}
    </div>
  );
};

export default MyResturants;
