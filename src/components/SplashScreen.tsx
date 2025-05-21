
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [animationStage, setAnimationStage] = useState(0);
  const navigate = useNavigate();
  
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

  const handleGetStarted = () => {
    navigate('/auth');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 px-6">
      <div className="max-w-xs w-full text-center">
        <div className="mb-8">
          <div className={`transition-all duration-700 ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-32 w-32 mx-auto mb-6">
              {/* Berry logo - a circular "berry" with a smiling face */}
              <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path 
                  d="M50 90c22.1 0 40-17.9 40-40S72.1 10 50 10 10 27.9 10 50s17.9 40 40 40z" 
                  stroke="#472D21" 
                  strokeWidth="4"
                  fill="#FFF"
                />
                <path 
                  d="M65 45c0 8.3-6.7 15-15 15s-15-6.7-15-15 6.7-15 15-15 15 6.7 15 15z" 
                  fill="#472D21" 
                />
                <path 
                  d="M37 70c0-7.2 5.8-13 13-13s13 5.8 13 13" 
                  stroke="#472D21" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className={`text-4xl font-bold mb-3 transition-all duration-700 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#472D21]`}>
          Berry Back
        </h1>
        
        <p className={`text-lg mb-12 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-[#472D21]`}>
          Why wait in line when you can have your discounted food ready and waiting for you?
        </p>
        
        <div className={`space-y-3 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={handleGetStarted}
            className="bg-[#472D21] hover:bg-[#5A392C] w-full text-lg py-6"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
