
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg">
              <span className="text-green-600">Waste-to-Table</span> Connect
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Fighting food waste, one meal at a time.
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="font-medium mb-2">About</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Our Mission</li>
                <li>How It Works</li>
                <li>For Businesses</li>
                <li>For Consumers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Connect</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Contact Us</li>
                <li>Support</li>
                <li>Partnerships</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} Waste-to-Table Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
