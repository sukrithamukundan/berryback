
import React from "react";
import { Smartphone } from "lucide-react";

interface PhonePreviewProps {
  children: React.ReactNode;
}

const PhonePreview = ({ children }: PhonePreviewProps) => {
  return (
    <div className="relative mx-auto my-8">
      {/* Phone frame */}
      <div className="relative mx-auto border-[8px] border-[#472D21] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden bg-white">
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-6 bg-[#472D21] flex items-center justify-center rounded-b-lg">
          <div className="w-20 h-4 bg-black rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="pt-8 h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto scrollbar-none">
            {children}
          </div>
        </div>
        
        {/* Home button */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#472D21] rounded-full"></div>
      </div>
      
      {/* Phone icon and label */}
      <div className="flex items-center justify-center mt-4 gap-2">
        <Smartphone className="w-5 h-5 text-[#472D21]" />
        <span className="text-sm font-medium text-[#472D21]">Mobile Preview</span>
      </div>
    </div>
  );
};

export default PhonePreview;
