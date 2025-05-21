
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 1000);
    const timer2 = setTimeout(() => setAnimationStage(2), 2000);
    const timer3 = setTimeout(() => setAnimationStage(3), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center z-50">
      <div className="max-w-md text-center px-4">
        <div className="mb-8">
          <div className={`transition-all duration-700 ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-12 h-12 text-white"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="M8 11h8" />
                <path d="M12 15V7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className={`text-4xl font-bold mb-3 transition-all duration-700 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-green-600">Waste-to-Table</span> Connect
        </h1>
        
        <p className={`text-lg text-gray-600 mb-8 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Fighting food waste by connecting surplus to people in need
        </p>
        
        <div className={`transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 px-6"
            size="lg"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Reduce Waste</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Save Money</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span>Help Community</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
