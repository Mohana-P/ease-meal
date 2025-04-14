
import { useState } from "react";
import { Restaurant } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { placeRestaurantOrder } from "@/lib/data";
import { Clock, Star, MapPin, IndianRupee } from "lucide-react";

interface RestaurantOrderModalProps {
  open: boolean;
  onClose: () => void;
  recipeId: string;
  recipeName: string;
  restaurants: Restaurant[];
}

const RestaurantOrderModal = ({ open, onClose, recipeId, recipeName, restaurants }: RestaurantOrderModalProps) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>(restaurants.length > 0 ? restaurants[0].id : "");
  const [quantity, setQuantity] = useState<number>(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();

  const handleSubmitOrder = () => {
    if (!selectedRestaurant) {
      toast.error("Please select a restaurant");
      return;
    }

    setIsOrdering(true);
    
    try {
      const order = placeRestaurantOrder(recipeId, selectedRestaurant, quantity);
      
      setTimeout(() => {
        setIsOrdering(false);
        toast.success("Order placed successfully!");
        onClose();
        navigate('/order-tracking', { state: { orderId: order.orderId, estimatedDelivery: order.estimatedDelivery } });
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
      setIsOrdering(false);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const getSelectedRestaurantPrice = () => {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    return restaurant ? restaurant.price * quantity : 0;
  };

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order {recipeName} from Restaurant</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Select Restaurant</Label>
            <RadioGroup 
              value={selectedRestaurant} 
              onValueChange={setSelectedRestaurant}
              className="space-y-2"
            >
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.id} 
                  className={`flex items-start space-x-3 p-3 rounded-md border ${
                    selectedRestaurant === restaurant.id ? "border-recipe-600 bg-recipe-50" : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem value={restaurant.id} id={restaurant.id} />
                  <div className="flex-1">
                    <Label htmlFor={restaurant.id} className="font-medium text-base cursor-pointer">
                      {restaurant.name}
                    </Label>
                    <div className="space-y-1 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {restaurant.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {restaurant.rating}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {restaurant.deliveryTime} mins
                      </div>
                      <div className="flex items-center text-sm text-recipe-600 font-medium">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {restaurant.price} per serving
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <div className="flex items-center space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span className="text-recipe-600">₹{getSelectedRestaurantPrice()}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmitOrder} 
            className="bg-recipe-600 hover:bg-recipe-700"
            disabled={isOrdering}
          >
            {isOrdering ? "Placing Order..." : "Place Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantOrderModal;
