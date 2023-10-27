import { useRef, useState } from "react";
import { useAuthStore } from "@/states/authState";
import { useSearchParams } from "react-router-dom";
import { EditIcon } from "lucide-react";
import supabase from "@/lib/supabase";
import type { foodType } from "@/constants/global.types";
import LoadingFoods from "@/components/essentials/LoadingFoods";

interface Props {
  props: {
    image_url: string;
    foodId: string;
  };
}

const ImageCard = ({ props }: Props) => {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");
  const fileInputRef = useRef<any>(null);
    const [newImage,setNewImage] = useState<null|string>(null);
    const [loading,setLoading] = useState(false);
  const user = useAuthStore((state: any) => state.user);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageSelect = (event: any, foodId: string) => {
    const selectedFile = event.target.files[0];
    const path = `${user.id}/${Date.now()}_${selectedFile.name}`;
    if (selectedFile) {
      async function uploadImage() {
        setLoading(true);
        const { error } = await supabase.storage
          .from("resturants")
          .upload(path, selectedFile);

        if (error) {
          console.log(error);
          return;
        }
        const { data: getUrl } = await supabase.storage
          .from("resturants")
          .getPublicUrl(path);

        // Update localStorage
        const ls: any = localStorage.getItem("copy_foods");
        const copy_foods = JSON.parse(ls);

        const updatedFoods = copy_foods.map((food: foodType) => {
          if (food.id.toString() == foodId.toString()) {
            console.log(
              food.id.toString() == foodId.toString(),
              foodId,
              food.id
            );
            return { ...food, image: getUrl.publicUrl };
          } else {
            return { ...food };
          }
        });
        // console.log(updatedFoods[0].id, updatedFoods[0].image);
        localStorage.setItem("copy_foods", JSON.stringify(updatedFoods));
        setNewImage(getUrl.publicUrl)
        setLoading(false);
      }
      uploadImage();
    }
  };
  return (
    <div className="w-[60px] h-[60px] flex justify-center items-center bg-gray-200 relative">
      {
        loading && <LoadingFoods/>
      }
      <img src={newImage ? newImage : props.image_url} className="w-full h-full object-cover absolute top-0 left-0 z-10" />
      <span className="text-gray-400 text-[10px]">no image</span>
      <input
        type="file"
        accept="image/*" // Specify accepted file types (in this case, only images)
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => {
          handleImageSelect(e, props.foodId);
        }}
      />
      {edit === "true" && (
        <button
          onClick={() => {
            handleFileUpload();
          }}
          className="absolute z-20 bg-gray-50 shadow-md text-black rounded-full p-2 right-[-12px] bottom-[-12px]"
        >
          <EditIcon className="w-[12px] h-[12px]" />
        </button>
      )}
    </div>
  );
};

export default ImageCard;
