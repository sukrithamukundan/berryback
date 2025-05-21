
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        <span className="text-[#472D21]">Berry</span> Back
      </h1>
      <p className="text-xl text-[#472D21] max-w-2xl mx-auto mb-8">
        Reducing food waste by connecting surplus food from restaurants and 
        retailers with consumers at discounted prices.
      </p>
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
          <span className="text-green-700 font-medium">1.05B</span>
          <span className="text-sm text-green-600">tons wasted annually</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
          <span className="text-amber-700 font-medium">828M</span>
          <span className="text-sm text-amber-600">people go hungry</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
          <span className="text-blue-700 font-medium">10%</span>
          <span className="text-sm text-blue-600">of global emissions</span>
        </div>
      </div>
      
      <Button
        onClick={handleGetStarted}
        className="bg-[#472D21] hover:bg-[#5A392C] px-8 py-6 text-lg"
        size="lg"
      >
        Get Started <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};

export default HeroSection;
