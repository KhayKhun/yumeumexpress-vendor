import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useResturantStore } from "@/states/resturantState";
import { resturantType } from "@/constants/global.types";
import { useParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
export function Selector() {
  const navigate = useNavigate();
  const resturants: resturantType[] = useResturantStore(
    (state: any) => state.resturants
  );

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("");

  const { resturantId } = useParams();

  const fetchSellerData = async () => {
    const { data, error } = await supabase
      .from("sellers")
      .select("name")
      .eq("id", resturantId);

    if (error) {
      console.log(error);
      return;
    }
    if (data[0]) {
      setValue(data[0].name);
    }
  };

  React.useEffect(() => {
    fetchSellerData();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select res..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search resturant..." />
          <CommandEmpty>No resturant found.</CommandEmpty>
          <CommandGroup>
            {resturants.map((res) => (
              <CommandItem
                key={res.id}
                value={res.name}
                onSelect={(currentValue) => {
                  console.log(currentValue);
                  if (currentValue !== value) {
                    setValue(currentValue);
                  }
                  resturants.map((r) => {
                    if (
                      r.name.toLocaleLowerCase() ===
                      currentValue.toLocaleLowerCase()
                    ) {
                      const x = resturants.findIndex(
                        (r) =>
                          r.name.toLocaleLowerCase() ===
                          currentValue.toLocaleLowerCase()
                      );
                      navigate(`/dashboard/resturant/${resturants[x].id}/orders`);
                    }
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLocaleLowerCase() === res.name.toLocaleLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {res.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
