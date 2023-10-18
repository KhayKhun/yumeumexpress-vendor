import {
  CheckmarkFillIcon,
  RefreshIcon,
  XMarkFillIcon,
} from "@/components/essentials/Icons";
import { foodType } from "@/constants/global.types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "../../../../utils/supabase";
import { useFoodStore } from "@/states/foodState";
import { useState } from "react";
import { Ring } from "@uiball/loaders";

function ColumnComponent() {
  const { resturantId } = useParams();

  const setFoods = useFoodStore((state: any) => state.setFoods);
  const foods = useFoodStore((state: any) => state.foods);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const toggleIsAvailable = async (foodId: string) => {
    let { data, error }: any = await supabase
      .from("products")
      .select("is_available")
      .eq("id", foodId);

    if (error) {
      console.log(error);
      return;
    }

    if (data?.length > 0) {
      const currentIsAvailable = data[0].is_available;

      const update = await supabase
        .from("products")
        .update({ is_available: !currentIsAvailable })
        .eq("id", foodId);

      if (update.error) {
        console.log(update.error);
        return;
      }
      const updatedData = foods.map((food: foodType) => {
        if (food.id.toString() === foodId.toString()) {
          return {
            ...food,
            is_available: !currentIsAvailable,
          };
        }
        return food;
      });
      setFoods(updatedData);
    }
  };

  const fetchFoods = async () => {
    if (buttonDisabled) return;

    setButtonDisabled(true);
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

    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  const columns: ColumnDef<foodType>[] = [
    {
      accessorKey: " ",
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
      cell: ({ row }) => {
        const id: string = row.getValue("id");
        const available: string = row.getValue("is_available");
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                  toggleIsAvailable(id);
                }}
              >
                {available ? "Unavailble" : "Available"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`edit/${id}`} className="w-full h-full">Edit details</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <h1 className="tb-header">ID</h1>,
    },
    {
      accessorKey: "image",
      header: () => <h1 className="tb-header">Image</h1>,
      cell: ({ row }) => {
        const image_url: string = row.getValue("image");
        if (image_url)
          return (
            <img src={image_url} className="w-[50px] h-[50px] object-cover" />
          );
      },
    },
    {
      accessorKey: "name",
      header: () => <h1 className="tb-header">Title</h1>,
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
        if (available)
          return (
            <div className="w-full flex justify-center">
              <CheckmarkFillIcon className="text-primary-green text-2xl" />
            </div>
          );
        else
          return (
            <div className="w-full flex justify-center">
              <XMarkFillIcon className="text-red-600 text-xl" />
            </div>
          );
      },
    },
    {
      accessorKey: "price",
      header: () => <h1 className="tb-header">Price</h1>,
    },
    {
      accessorKey: "description",
      header: () => <h1 className="tb-header">Description</h1>,
    },
  ];

  return { columns };
}
export default ColumnComponent;
