import { useFoodStore } from "@/states/foodState";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import {useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "@/components/essentials/ErrorPage";
import LoadingFoods from "@/components/essentials/LoadingFoods";
import ColumnComponent from "./columns";
import { CheckmarkFillIcon, EditIcon } from "@/components/essentials/Icons";
import AddMoreFoods from "./cards/AddMoreFoods";

export default function FoodTable() {
  const { columns } = ColumnComponent();
  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const { resturantId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const setFoods = useFoodStore((state: any) => state.setFoods);
  const foods = useFoodStore((state: any) => state.foods);
  const [error,setError] = useState(false);

  const updateMultipleRows = async () => {
    setError(false);
    setLoading(true);
    const ls: any = localStorage.getItem("copy_foods");
    const copy_foods = JSON.parse(ls);

    try {
      for (const food of copy_foods) {
        const { error } = await supabase
          .from("products")
          .update(food)
          .eq("id", food.id);

        if (error) {
          console.log("Error updating row:", error);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setError(true)
      alert("error updating foods");
      return;
    }


    setSearchParams(
      (prev: any) => {
        prev.set("edit", "false");
        return prev;
      },
      { replace: true }
    );
    fetchFoods();
  };

  const fetchFoods = async () => {
    setError(false);
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id,image,name,discount,is_available,price,description")
      .eq("seller_id", resturantId)
      .order("id",{ascending:false});

    if (error) {
      console.log(error);
      setError(true);
      return;
    }
    setFoods(data);
    setLoading(false);
  };
useEffect(()=>{
  fetchFoods();
},[])
  return (
    <div className="container mx-auto py-10">
      {loading && <LoadingFoods />}
      {foods?.length > 0 ? (
        <main className="flex flex-col gap-3">
          {/* Buttons */}
          <div className="flex justify-between">
            {/* Add more and edit btn */}
            <div className="flex gap-3">
              {/* Add more */}
              <AddMoreFoods />
              {/* Edit */}
              <button
                className="flex gap-2 items-center py-1 px-5 text-sm rounded-md border border-green-700 text-green-700 bg-green-50 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
                disabled={edit === "true"}
                onClick={() => {
                  setSearchParams(
                    (prev: any) => {
                      if (prev.get("edit") === "true") {
                        prev.set("edit", "false");
                        return prev;
                      } else {
                        prev.set("edit", "true");
                        return prev;
                      }
                    },
                    { replace: true }
                  );
                }}
              >
                <span className="hidden sm:inline">Edit foods</span>
                <span className="inline sm:hidden">Edit</span>
                <EditIcon />
              </button>
            </div>
            {/* Save */}
            <button
              className="flex gap-2 items-center py-1 px-5 text-sm rounded-md border border-green-700 text-white bg-green-700 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
              disabled={!(edit === "true")}
              onClick={() => {
                updateMultipleRows();
              }}
            >
              Save <CheckmarkFillIcon />
            </button>
          </div>
          <DataTable columns={columns} data={foods} />
        </main>
      ) : (!error) ? (
        <main>
          No foods yet
          <AddMoreFoods />
        </main>
      ) : <ErrorPage/>}
    </div>
  );
}
