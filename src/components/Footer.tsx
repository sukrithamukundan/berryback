
const Footer = () => {
  return (
    <footer className="bg-[#F5F3F2] mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">
              <span className="text-[#472D21]">Berry</span> Back
            </h3>
            <p className="text-sm text-[#472D21]/70 mt-1">
              Fighting food waste, one meal at a time.
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="font-medium mb-2 text-[#472D21]">About</h4>
              <ul className="text-sm space-y-1 text-[#472D21]/70">
                <li>Our Mission</li>
                <li>How It Works</li>
                <li>For Businesses</li>
                <li>For Consumers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-[#472D21]">Connect</h4>
              <ul className="text-sm space-y-1 text-[#472D21]/70">
                <li>Contact Us</li>
                <li>Support</li>
                <li>Partnerships</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#472D21]/20 mt-8 pt-6 text-sm text-center text-[#472D21]/70">
          © {new Date().getFullYear()} Berry Back. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
