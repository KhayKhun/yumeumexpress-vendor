import type { foodType } from "../../constants/global.types";
import { BsStarFill, BsPlus, BsX } from "react-icons/bs";
import { useSelectedFoodStore } from "../../states/foodState";

type Props = {
  foodData: foodType;
};

const DetailFoodCard = ({ foodData }: Props) => {
  const toggleSelectedFood = useSelectedFoodStore(
    (state: any) => state.toggleFood
  );
  // const selectedFoods = useSelectedFoodStore((state: any) => state.selectedFoods);

  return (
    <li
    id={foodData.id.toString()}
      className={`border flex items-center px-2 rounded-lg overflow-hidden  ${
        foodData.count > 0
          ? "outline outline-1 outline-green-500 bg-green-50 opacity-50"
          : "bg-white"
      }`}
    >
      <div className="w-[150px] h-[150px]">
        <img
          src={foodData.image}
          alt="food image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* text area */}
      <div className="w-full px-4 py-2 flex flex-col gap-3 justify-between">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 font-semibold text-lg tracking-wider">
            <span className="tracking-normal">MMK</span> 
            {foodData.price}
          </span>
          <h1 className="font-semibold text-base tracking-wide leading-4">
            {foodData.name}
          </h1>
          <p className="text-gray-500">{foodData.description}</p>
        </div>
        {/* Details */}
        <div className="w-full flex flex-row-reverse justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSelectedFood(foodData);
            }}
            className={` flex font-semibold text-sm items-center gap-3 border rounded-full p-2 shadow-md ${
              foodData.count > 0
                ? "bg-red-50  text-red-500 border-red-500 opacity-100"
                : "bg-green-50 text-primary-green border-primary-green"
            }`}
          >
            {foodData.count > 0 ? (
              <BsX className="text-2xl" />
            ) : (
              <BsPlus className="text-2xl" />
            )}
          </button>
          <span className="flex items-center gap-2 ">
            <BsStarFill className="text-amber-600 font-lg" />
            4.5
          </span>
        </div>
      </div>
    </li>
  );
};

export default DetailFoodCard;
