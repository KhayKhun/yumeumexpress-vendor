import supabase from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ErrorPage from "../essentials/ErrorPage";
import { useSellerStore } from "@/states/resturantState";
import { PlusIcon } from "lucide-react";
import { useAuthStore } from "@/states/authState";
import LoadingFoods from "../essentials/LoadingFoods";

const Info = () => {
  const { resturantId } = useParams();
 const fetchSellerData = async (userId: string) => {
   const { data, error } = await supabase
     .from("sellers")
     .select("id,name,address,opens_at,closes_at,image,owner_id")
     .eq("id", resturantId);

   if (error) {
     console.log(error);
     return;
   }
   if (data[0]?.owner_id === userId) {
     setSeller(data[0]);
     setLoading(false);
   } else {
     setLoading(false);
     setSeller(null);
   }
 };
  const seller = useSellerStore((state: any) => state.seller);
  const setSeller = useSellerStore((state: any) => state.setSeller);
  const [imageFile, setImageFile] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    edit: "false",
  });
  const edit = searchParams.get("edit");
  const user = useAuthStore((state: any) => state.user);

  const nameRef = useRef<any>(null);
  const addressRef = useRef<any>(null);
  const opensRef = useRef<any>(null);
  const closesRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

 

  useEffect(() => {
    setLoading(true);
    const getSession = supabase.auth.getSession();

    getSession.then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data.session?.user) {
        fetchSellerData(response.data.session?.user.id);
      } else {
        setSeller(null);
        setLoading(false);
      }
    });
  }, []);

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
  const UpdateSellerInfo = async () => {
    const { error } = await supabase
      .from("sellers")
      .update({
        name: nameRef.current.value,
        address: addressRef.current.value,
        opens_at: opensRef.current.value,
        closes_at: closesRef.current.value,
        image: imageFile ? imageFile : seller.image,
      })
      .eq("id", seller.id);

    if (error) {
      console.log(error);
      return;
    }
    setSearchParams(
      (prev: any) => {
        prev.set("edit", "false");
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <>
      {seller ? (
        <main className="w-full flex justify-center">
          {
            loading && <LoadingFoods/>
          }
          <div className="shadow-lg rounded-lg w-[90vw] sm:w-[70%] p-4 flex flex-col gap-3">
            <h1 className="text-primary-green font-semibold mx-auto uppercase text-lg self-center">
              vendor info
            </h1>
            <div>
              <p>Resturant Name:</p>
              <input
                ref={nameRef}
                disabled={!(edit === "true")}
                type="text"
                defaultValue={seller.name}
                className="info-input"
              />
            </div>
            <div>
              <p>Address:</p>
              <input
                ref={addressRef}
                disabled={!(edit === "true")}
                type="text"
                defaultValue={seller.address}
                className="info-input"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <p>Opens at:</p>
                <input
                  ref={opensRef}
                  disabled={!(edit === "true")}
                  type="text"
                  defaultValue={seller.opens_at}
                  className="info-input"
                />
              </div>
              <div>
                <p>Closes at:</p>
                <input
                  ref={closesRef}
                  disabled={!(edit === "true")}
                  type="text"
                  defaultValue={seller.closes_at}
                  className="info-input"
                />
              </div>
            </div>

            <div className="w-full">
              <p>Resturant image:</p>
              <input
                type="file"
                accept="image/*" // Specify accepted file types (in this case, only images)
                style={{ display: "none" }}
                ref={imageRef}
                onChange={(e) => {
                  handleImageSelect(e);
                }}
              />
              <div className=" w-full h-[200px] flex justify-center items-center bg-green-50 border border-primary-green rounded-lg overflow-hidden relative">
                <img
                  src={imageFile ? imageFile : seller.image}
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-50 blur-none"
                />
                {edit === 'true' && <button
                  onClick={handleFileUpload}
                  disabled={!(edit === "true")}
                  className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-black opacity-80"
                >
                  <PlusIcon />
                  <span>Choose Image</span>
                </button>}
              </div>
            </div>
            <div className="flex w-full justify-end mt-4 gap-4">
              <button
                className="btn-sm btn-edit"
                disabled={edit === "true"}
                onClick={() => {
                  setSearchParams(
                    (prev: any) => {
                      prev.set("edit", "true");
                      return prev;
                    },
                    { replace: true }
                  );
                }}
              >
                Edit
              </button>
              <button className="btn-sm btn-save" onClick={UpdateSellerInfo}>
                Save
              </button>
            </div>
          </div>
        </main>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Info;
