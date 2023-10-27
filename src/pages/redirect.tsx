import supabase from "../lib/supabase"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import LoadingFoods from "../components/essentials/LoadingFoods";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = supabase.auth.getSession();

    getSession.then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      if (response.data.session?.user) {
        navigate("/dashboard/resturants");
      } else {
        navigate("/");
      }
    });
  }, []);
  return <LoadingFoods/>
}

export default Redirect