import {
  RefreshIcon,
} from "@/components/essentials/Icons";
import { foodType } from "@/constants/global.types";
import { ColumnDef } from "@tanstack/react-table";
import { useParams, useSearchParams } from "react-router-dom";
import supabase from "../../../lib/supabase";
import { useFoodStore } from "@/states/foodState";
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import ImageCard from "./cards/ImageCard";
import AvailableCard from "./cards/AvailableCard";

function ColumnComponent() {
  const { resturantId } = useParams();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const setFoods = useFoodStore((state: any) => state.setFoods);
  const foods = useFoodStore((state: any) => state.foods);
  useEffect(() => {
    if (foods?.length > 0) {
      localStorage.setItem("copy_foods", JSON.stringify(foods));
    }
  }, [foods]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fetchFoods = async () => {
    if (buttonDisabled) return;

    setButtonDisabled(true);
    const { data, error } = await supabase
      .from("products")
      .select("id,image,name,discount,is_available,price,description")
      .eq("seller_id", resturantId)
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }
    setFoods(data);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  const columns: ColumnDef<foodType>[] = [
    {
      accessorKey: "id",
      header: () => (
        <button
          className="text-white flex gap-1 items-center"
          onClick={fetchFoods}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? (
            <Ring size={15} lineWeight={5} speed={2} color="white" />
          ) : (
            <RefreshIcon className="text-[15px]" />
          )}
          refresh
        </button>
      ),
    },
    {
      accessorKey: "image",
      header: () => <h1 className="tb-header">Image</h1>,
      cell: ({ row }) => {
        const image_url: string = row.getValue("image");
        const id: string = row.getValue("id");
        return <ImageCard props={{image_url,foodId : id}}/>
      },
    },
    {
      accessorKey: "name",
      header: () => <h1 className="tb-header">Title</h1>,
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        const id: string = row.getValue("id");
        return (
          <input
            className="table-input"
            disabled={!(edit === "true")}
            onChange={(e) => {
              const ls: any = localStorage.getItem("copy_foods");
              const copy_foods = JSON.parse(ls);

              const updatedFoods = copy_foods.map((food: foodType) => {
                if (food.id.toString() == id.toString()) {
                  return { ...food, name: e.target.value };
                } else {
                  return { ...food };
                }
              });
              console.log(updatedFoods[0]);
              localStorage.setItem("copy_foods", JSON.stringify(updatedFoods));
            }}
            defaultValue={name}
          />
        );
      },
    },
    {
      accessorKey: "discount",
      header: () => <h1 className="tb-header">Discount</h1>,
      cell: ({ row }) => {
        const discount: any = row.getValue("discount");
        return (
          <p className="w-full flex justify-center">
            {" "}
            {discount ? discount : "-"}{" "}
          </p>
        );
      },
    },
    {
      accessorKey: "is_available",
      header: () => <h1 className="tb-header">Available</h1>,
      cell: ({ row }) => {
        const available: string = row.getValue("is_available");
        const id:string = row.getValue('id')
        return <AvailableCard foodId={id} defaultAvailable={Boolean(available)}/>
      },
    },
    {
      accessorKey: "price",
      header: () => <h1 className="tb-header">Price</h1>,
      cell: ({ row }) => {
        const price: string = row.getValue("price");
        const id: string = row.getValue("id");
        return (
          <input
            className="table-input"
            disabled={!(edit === "true")}
            onChange={(e) => {
              const ls: any = localStorage.getItem("copy_foods");
              const copy_foods = JSON.parse(ls);

              const updatedFoods = copy_foods.map((food: foodType) => {
                if (food.id.toString() == id.toString()) {
                  return { ...food, price: e.target.value };
                } else {
                  return { ...food };
                }
              });
              localStorage.setItem("copy_foods", JSON.stringify(updatedFoods));
            }}
            defaultValue={price}
          />
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <h1 className="tb-header">Description</h1>,
      cell: ({ row }) => {
        const description: string = row.getValue("description");
        const id: string = row.getValue("id");
        return (
          <input
            className="table-input"
            disabled={!(edit === "true")}
            onChange={(e) => {
              const ls: any = localStorage.getItem("copy_foods");
              const copy_foods = JSON.parse(ls);

              const updatedFoods = copy_foods.map((food: foodType) => {
                if (food.id.toString() == id.toString()) {
                  return { ...food, description: e.target.value };
                } else {
                  return { ...food };
                }
              });
              localStorage.setItem("copy_foods", JSON.stringify(updatedFoods));
            }}
            defaultValue={description}
          />
        );
      },
    },
  ];
  return { columns };
}
export default ColumnComponent;
