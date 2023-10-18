import { useFoodStore } from "@/states/foodState";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import supabase from "../../../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "@/components/essentials/ErrorPage";
import LoadingFoods from "@/components/essentials/LoadingFoods";
import ColumnComponent from "./columns";

export default function FoodTable() {
  const navigate = useNavigate();
  const { columns } = ColumnComponent();

  const { resturantId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const setFoods = useFoodStore((state: any) => state.setFoods);
  const foods = useFoodStore((state: any) => state.foods);
  const fetchFoods = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id,image,name,discount,is_available,price,description")
      .eq("seller_id", resturantId)
      .order("id");

    if (error) {
      console.log(error);
      return;
    }
    setFoods(data);
    setLoading(false);
  };

  const fetchOwner = async (owner_id: string) => {
    const { data, error } = await supabase
      .from("sellers")
      .select("owner_id")
      .eq("id", resturantId);

    if (error) {
      console.log(error);
      return;
    }
    if (data[0].owner_id === owner_id) {
      fetchFoods();
    } else {
    }
  };
  useEffect(() => {
    const getSession = supabase.auth.getSession();

    getSession.then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data.session?.user) {
        fetchOwner(response.data.session?.user.id);
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="container mx-auto py-10">
      {foods?.length > 0 ? (
        <div>
          <DataTable columns={columns} data={foods} />
        </div>
      ) : loading ? (
        <LoadingFoods />
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}
