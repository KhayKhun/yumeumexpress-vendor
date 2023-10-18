import { Link } from "react-router-dom";
import { resturantType } from "../../constants/global.types"
import { RightArrowOpenIcon } from "../essentials/Icons";

const ResturantCard = ({data}: {data :resturantType}) => {
  return (
    <Link to={`/dashboard/resturant/${data.id}/orders`} className="group border bg-white hover:bg-gray-50 shadow-md relative overflow-hidden shadow-gray-300">
      <div className="w-full p-4">
        <RightArrowOpenIcon className="absolute top-6 right-6 text-lg group-hover:right-3 transition-all ease-in-out"/>
        <div>
          <h1  className="text-xl font-semibold tracking-wide">{data.name}</h1>
          <p className="text-gray-600 text-sm">{data.address}</p>
        </div>
      </div>
      <img src={data.image}className="w-full h-[200px] object-cover opacity-80 group-hover:opacity-100"/>
    </Link>
  );
}

export default ResturantCard