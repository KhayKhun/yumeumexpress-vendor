import AuthComponent from "./components/auth/AuthComponent";
import supabase from "./lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
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
      }
    });
  }, []);

  return (
    <main>
      <AuthComponent />
    </main>
  );
}

export default App;
