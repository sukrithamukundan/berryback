
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    navigate('/');
  };
  
  const handleCreateAccount = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-xs w-full">
        <div className="text-center mb-16">
          <div className="h-32 w-32 mx-auto mb-6">
            <svg 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path 
                d="M35 45C35 36.7 41.7 30 50 30C58.3 30 65 36.7 65 45C65 53.3 58.3 60 50 60C41.7 60 35 53.3 35 45Z" 
                stroke="#472D21" 
                strokeWidth="3"
              />
              <path 
                d="M63 50C63 50 68 60 75 60C82 60 85 52 85 52" 
                stroke="#472D21" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M50 60C60 60 65 70 65 80C65 80 60 76 50 76C40 76 35 80 35 80C35 70 40 60 50 60Z" 
                stroke="#472D21" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#472D21] mb-3">
            Berry Back
          </h1>
          <p className="text-lg text-[#472D21] px-6">
            Why wait in line when you can have your discounted food ready and waiting for you?
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleSignIn}
            className="bg-[#472D21] hover:bg-[#5A392C] w-full text-white py-6 text-lg"
          >
            Sign in
          </Button>
          <Button 
            onClick={handleCreateAccount}
            variant="outline"
            className="w-full border-2 border-[#472D21] text-[#472D21] hover:bg-[#472D21]/10 py-6 text-lg"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
