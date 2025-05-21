
import BottomNavBar from "@/components/BottomNavBar";

const Orders = () => {
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-[#472D21]">Your Orders</h1>
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-[#472D21]/70 mb-4">You don't have any orders yet.</p>
        <p className="text-[#472D21]/70">When you reserve surplus food, your orders will appear here.</p>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Orders;
