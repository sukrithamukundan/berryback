
import { Check, LineChart, Map, ShoppingBag } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Redistribution</h3>
          <p className="text-muted-foreground">
            Connects restaurants and retailers with surplus food to consumers through discounted offers
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Map className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Monthly Surplus Maps</h3>
          <p className="text-muted-foreground">
            Visual data helps businesses track and identify waste patterns
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <LineChart className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smarter Procurement</h3>
          <p className="text-muted-foreground">
            Reduce over-ordering through data-driven insights and forecasting
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Win-Win Solution</h3>
          <p className="text-muted-foreground">
            Businesses save costs while consumers access affordable food
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
