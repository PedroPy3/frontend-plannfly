import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <LoaderCircle 
        className="animate-spin text-[#646cff] w-8 h-8" 
        strokeWidth={2}
      />
    </div>
  );
};

export default Loading;