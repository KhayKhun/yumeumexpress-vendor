import { DotPulse } from "@uiball/loaders";


const LoadingFoods = () => {
  return (
    <div className="bg-black opacity-50 w-screen h-screen fixed flex justify-center items-center top-0 left-0 z-50">
      <DotPulse size={40} speed={1} color="#44B621" />
    </div>
  );
}

export default LoadingFoods