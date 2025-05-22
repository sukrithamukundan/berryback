
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WelcomeMessageProps {
  businessName?: string;
}

const WelcomeMessage = ({ businessName = "Your Business" }: WelcomeMessageProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-4 p-4 bg-[#472D21]/10 rounded-lg">
      <h3 className="text-lg font-semibold text-[#472D21]">Welcome to BerryBack, {businessName}!</h3>
      <p className="text-sm text-gray-700 mb-3">
        Your business is now registered. Start adding surplus food items to reduce waste and earn more.
      </p>
      <Button 
        className="bg-[#472D21] hover:bg-[#5A392C] w-full"
        onClick={() => navigate('/add-surplus')}
      >
        Add Your First Item
      </Button>
    </div>
  );
};

export default WelcomeMessage;
