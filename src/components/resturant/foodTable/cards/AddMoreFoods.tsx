import { PlusIcon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import supabase from "@/lib/supabase";
import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";
import { useAuthStore } from "@/states/authState";
import { useFoodStore } from "@/states/foodState";
import { useToast } from "@/components/ui/use-toast";

const AddMoreFoods = () => {
  const {toast} = useToast();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");

  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const priceRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const[available,setAvailable] = useState(true);

  const user = useAuthStore((state: any) => state.user);
  const {resturantId} = useParams();
 

  const setFoods = useFoodStore((state: any) => state.setFoods);
  const fetchFoods = async () => {
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
  };

  const InsertNewFood = async () => {
    const { error } = await supabase
      .from("products")
      .insert({ 
        seller_id : Number(resturantId),
        name: titleRef.current.value,
        description : descriptionRef.current.value ?descriptionRef.current.value:null,
        price : priceRef.current.value,
        image : imageFile ? imageFile : null,
        is_available : available
    });

    if(error){
        console.log(error);
    toast({
      title: "Error",
      description: `Error on adding new food`,
    });
        return;
    }
    console.log('success');
    toast({
      title: "Success!",
      description: `Added new food`,
    });
    fetchFoods()
  };
 const handleFileUpload = () => {
   imageRef.current.click();
 };

  const handleImageSelect = (event: any) => {
    const selectedFile = event.target.files[0];
    const path = `${user.id}/${Date.now()}_${selectedFile.name}`;
    if (selectedFile) {
      async function uploadImage() {
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
        setImageFile(getUrl.publicUrl);
      }
      uploadImage();
    }
  };
  return (
    <Sheet>
      <SheetTrigger
        className="flex gap-2 items-center py-1 px-5 text-sm rounded-md border border-green-700 text-white bg-green-700 disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
        disabled={edit === "true"}
      >
        <span className="hidden md:inline">Add new food </span>
        <span className="inline sm:hidden">Add </span>
        <PlusIcon className="w-[15px] h-[15px]" />
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-scroll flex flex-col">
        <SheetHeader>
          <SheetTitle>Add new food</SheetTitle>
        </SheetHeader>
        <li className="w-full flex gap-2">
          <Switch
            defaultChecked={true}
            onCheckedChange={(e) => {
              setAvailable(e);
            }}
          />
          <p>Available:</p>
        </li>
        <li className="w-full">
          <p>Title:</p>
          <input ref={titleRef} type="text" className="form-input" />
        </li>
        <li className="w-full">
          <p>Description:</p>
          <input ref={descriptionRef} type="text" className="form-input" />
        </li>
        <li className="w-full">
          <p>Price:</p>
          <div className="flex w-full gap-2 items-center">
            <input ref={priceRef} type="number" className="form-input" />
            <span>MMK</span>
          </div>
        </li>
        {/* <li className="w-full">
          <p>Discount:</p>
          <input ref={discountRef} type="text" className="form-input" />
        </li>
        <li className="w-full">
          <p>Categories:</p>
          <input ref={categoriesRef} type="text" className="form-input" />
        </li> */}
        <li className="w-full flex justify-center">
          <input
            type="file"
            accept="image/*" // Specify accepted file types (in this case, only images)
            style={{ display: "none" }}
            ref={imageRef}
            onChange={(e) => {
              handleImageSelect(e);
            }}
          />
          <div className=" w-[200px] h-[200px] flex justify-center items-center bg-green-50 border border-primary-green rounded-lg overflow-hidden relative">
            <img
              src={imageFile ? imageFile : ""}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-50 blur-none"
            />
            <button
              onClick={handleFileUpload}
              className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-black opacity-80"
            >
              <PlusIcon />
              <span>{imageFile ? "Rechoose Image" : "Upload Image"}</span>
            </button>
          </div>
        </li>
        <SheetFooter>
          <SheetClose
            onClick={InsertNewFood}
            className="w-full bg-primary-green p-3 text-white rounded-lg hover:bg-green-500"
          >
            Add
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddMoreFoods;
