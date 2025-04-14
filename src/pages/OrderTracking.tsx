
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  PackageCheck, 
  Truck, 
  ChefHat, 
  Home,
  Clock
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

const OrderTracking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  
  useEffect(() => {
    // Set estimated delivery time (1 hour from now)
    const deliveryTime = new Date();
    deliveryTime.setHours(deliveryTime.getHours() + 1);
    setEstimatedDelivery(
      deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    
    // Simulate order progress
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      toast.success("Your order is being prepared!");
    }, 5000);
    
    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      toast.success("Your order is on the way!");
    }, 10000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const steps = [
    { 
      id: 1, 
      title: "Order Confirmed", 
      description: "We've received your order", 
      icon: <PackageCheck className="h-6 w-6" /> 
    },
    { 
      id: 2, 
      title: "Preparing", 
      description: "Your groceries are being prepared", 
      icon: <ChefHat className="h-6 w-6" /> 
    },
    { 
      id: 3, 
      title: "On the Way", 
      description: "Your order is on the way", 
      icon: <Truck className="h-6 w-6" /> 
    },
    { 
      id: 4, 
      title: "Delivered", 
      description: "Your order has been delivered", 
      icon: <Home className="h-6 w-6" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <h1 className="text-2xl font-bold">Order Tracking</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Estimated Delivery</h2>
            <div className="flex items-center text-recipe-600">
              <Clock className="h-5 w-5 mr-1" />
              <span className="font-bold">{estimatedDelivery}</span>
            </div>
          </div>
          
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200">
              <div 
                className="h-full bg-recipe-500 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            {/* Steps */}
            <div className="flex justify-between mb-8 pt-1">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      step.id <= currentStep ? 'bg-recipe-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step details */}
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <div key={step.id} className="w-1/4 px-2 text-center">
                  <p className={`font-medium ${step.id <= currentStep ? 'text-recipe-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
