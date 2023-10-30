
import { PlusIcon } from "lucide-react";
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
import { useRef, useState } from "react";
import { useAuthStore } from "@/states/authState";
import { useToast } from "@/components/ui/use-toast";
import { toSlug } from "@/constants/functions";


const Register = ({ fetchResturants }: { fetchResturants  : () => Promise<void>}) => {
  const { toast } = useToast();

  const titleRef = useRef<any>(null);
  const addressRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const user = useAuthStore((state: any) => state.user);

  const InsertNewResturant = async () => {
    const { data, error } = await supabase.from("sellers").insert({
      owner_id: user.id,
      name: titleRef.current.value,
      address: addressRef.current.value ? addressRef.current.value : null,
      image: imageFile ? imageFile : null,
      slug: toSlug(titleRef.current.value),
    });

    if (error) {
      console.log(error);
    toast({
      title: "Failed!",
      description: `Failed to register new resturant`,
    });
      return;
    }
    console.log(data);
    fetchResturants()
    toast({
      title: "Success!",
      description: `Created new resturant`,
    });
  };
  const handleFileUpload = () => {
    imageRef.current.click();
  };
  console.log('rendered')
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
      <SheetTrigger className=" bg-primary-green p-2 rounded-md text-white hover:bg-green-500 flex gap-2 items-center">
        Create new <PlusIcon />
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-scroll flex flex-col">
        <SheetHeader>
          <SheetTitle>Register a resturant</SheetTitle>
        </SheetHeader>
        <li className="w-full">
          <p>Title:</p>
          <input ref={titleRef} type="text" className="form-input" />
        </li>
        <li className="w-full">
          <p>Address</p>
          <input ref={addressRef} type="text" className="form-input" />
        </li>
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
            onClick={InsertNewResturant}
            className="w-full bg-primary-green p-3 text-white rounded-lg hover:bg-green-500"
          >
            Register
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Register;
