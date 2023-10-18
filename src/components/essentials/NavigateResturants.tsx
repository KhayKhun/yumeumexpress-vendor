import { useEffect} from 'react';
import supabase from '../../../utils/supabase';
import { useAuthStore } from '../../states/authState';

const NavigateResturants = () => {

    const user = useAuthStore((state:any) => state.user);
     const fetchResturants = async () => {
       const { data, error } = await supabase
         .from("sellers")
         .select("name,id")
         .eq("owner_id", user?.id);

       if (error) {
         console.log(error);
         // navigate('/dashboard')
         return;
       }
       console.log(data);
     };
     useEffect(()=>{
        if(user?.id) fetchResturants();
     },[]);
  return (
    <div className="z-60">
    </div>
  );
}

export default NavigateResturants



