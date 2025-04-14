
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, ShoppingCart as CartIcon, ArrowRight, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { shoppingCart, placeOrder } from "@/lib/data";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Group items by recipe
  const recipeGroups = shoppingCart.reduce((groups, item) => {
    if (!groups[item.recipeId]) {
      groups[item.recipeId] = {
        recipeName: item.recipeName,
        items: [],
      };
    }
    groups[item.recipeId].items.push(item);
    return groups;
  }, {} as Record<string, { recipeName: string; items: typeof shoppingCart }>);

  // Calculate total price
  const totalPrice = shoppingCart.reduce(
    (sum, item) => sum + item.ingredient.price,
    0
  );

  const handleRemoveItem = (index: number) => {
    shoppingCart.splice(index, 1);
    // Force re-render by updating state
    navigate("/cart");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    setTimeout(() => {
      const order = placeOrder();
      
      if (order) {
        toast.success("Order placed successfully!");
        setIsCheckingOut(false);
        navigate("/order-tracking");
      } else {
        toast.error("Failed to place order. Cart is empty.");
        setIsCheckingOut(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {shoppingCart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                {Object.entries(recipeGroups).map(([recipeId, group]) => (
                  <div key={recipeId} className="mb-6 last:mb-0">
                    <div className="flex items-center justify-between mb-4">
                      <Link
                        to={`/recipe/${recipeId}`}
                        className="text-lg font-medium text-recipe-600 hover:underline"
                      >
                        {group.recipeName}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {group.items.length} ingredients
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.items.map((item, index) => {
                        const cartIndex = shoppingCart.findIndex(
                          (i) =>
                            i.ingredient.id === item.ingredient.id &&
                            i.recipeId === item.recipeId
                        );
                        return (
                          <div
                            key={item.ingredient.id}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium">{item.ingredient.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.ingredient.amount}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-4 text-recipe-600 flex items-center">
                                <IndianRupee className="h-4 w-4 mr-1" />
                                {Math.round(item.ingredient.price * 83)}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(cartIndex)}
                                className="text-gray-400 hover:text-gray-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {Math.round(totalPrice * 83)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {totalPrice >= 10 ? "0" : Math.round(2 * 83)}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-recipe-600 flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {Math.round(totalPrice * 83) + (totalPrice >= 10 ? 0 : Math.round(2 * 83))}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full flex items-center justify-center"
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                >
                  {isCheckingOut ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By checking out, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <CartIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Add some ingredients to your cart from our delicious recipes.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/">Browse Recipes</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
