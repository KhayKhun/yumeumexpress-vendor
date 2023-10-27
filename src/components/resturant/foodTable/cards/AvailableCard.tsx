import { useSearchParams } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import type { foodType } from "@/constants/global.types";

const AvailableCard = ({
  defaultAvailable,
  foodId,
}: {
  defaultAvailable: boolean;
  foodId: string;
}) => {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  function onChange(event: any) {
    const ls: any = localStorage.getItem("copy_foods");
    const copy_foods = JSON.parse(ls);

    const updatedFoods = copy_foods.map((food: foodType) => {
      if (food.id.toString() == foodId.toString()) {
        console.log(food.id.toString() == foodId.toString(), foodId, food.id);
        return { ...food, is_available: event };
      } else {
        return { ...food };
      }
    });
    localStorage.setItem("copy_foods", JSON.stringify(updatedFoods));
  }
  return (
    <div>
      <Switch
        onCheckedChange={onChange}
        defaultChecked={defaultAvailable}
        disabled={!(edit === "true")}
      />
    </div>
  );
};

export default AvailableCard;
