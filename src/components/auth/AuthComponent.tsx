import supabase from "../../lib/supabase";
import { useEffect } from "react";
import { useAuthStore } from "../../states/authState";
import { Link } from "react-router-dom";
import { UserIcon } from "../essentials/Icons";

function AuthComponent() {
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

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
      <Link to={{ pathname: "/profile", search: "?edit=false" }}>
        <UserIcon />
      </Link>
    );
  } else {
    return (
      <button onClick={SignInWithGoogle} className="border rounded-lg border-primary-green py-2 px-4  text-sm">
        Sign In
      </button>
    );
  }
}

export default AuthComponent;
