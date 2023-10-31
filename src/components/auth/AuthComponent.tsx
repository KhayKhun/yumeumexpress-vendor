import supabase from "../../lib/supabase";
import { useEffect } from "react";
import { useAuthStore } from "../../states/authState";
import { Link } from "react-router-dom";
import { UserIcon } from "../essentials/Icons";
import { useResturantStore } from "@/states/resturantState";
import { resturantType } from "@/constants/global.types";
import TestSocket from "@/lib/TestSocket";
import { requestAudioPermission } from "@/constants/functions";

function AuthComponent() {
  const { JoinSocket } = TestSocket();
  const resturants = useResturantStore((state: any) => state.resturants);
  const setResturants = useResturantStore((state: any) => state.setResturants);
  const user = useAuthStore((state: any) => state.user);
  const setUser = useAuthStore((state: any) => state.setUser);
  const SignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
      return;
    }
  };

  const fetchResturants = async (id: string) => {
    const { data, error } = await supabase
      .from("sellers")
      .select()
      .eq("owner_id", id);

    if (error) {
      console.log(error);
      return;
    }
    setResturants(data);
  };

  useEffect(() => {
    resturants.map((resturant: resturantType) => {
      JoinSocket(resturant.id);
    });
  }, [resturants]);
  useEffect(()=>{
    requestAudioPermission();
  },[])
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user.id) {
          fetchResturants(session?.user.id);
        }
        // console.log("Auth state changed =>", event, session?.expires_at);
        if (event === "INITIAL_SESSION" && session) {
          setUser(session?.user);
        } else if (event === "SIGNED_IN") {
          setUser(session?.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  if (user) {
    return (
      <Link
        className="p-2 rounded-md flex items-center w-full gap-2 hover:bg-gray-50"
        to={{ pathname: "/profile", search: "?edit=false" }}
      >
        <UserIcon /> {user?.user_metadata.full_name}
      </Link>
    );
  } else {
    return (
      <button
        onClick={SignInWithGoogle}
        className="border rounded-lg border-primary-green py-2 px-4  text-sm"
      >
        Sign In
      </button>
    );
  }
}

export default AuthComponent;
