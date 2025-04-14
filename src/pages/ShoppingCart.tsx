
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  shoppingCart, removeFromCart, clearCart, CartItem,
  getGroceryCategories
} from "@/lib/data";
import { 
  ShoppingCart as CartIcon, ChevronLeft, Trash2, 
  Check, PackagePlus, ShoppingBasket
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";

// Group cart items by category
const groupItemsByCategory = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    const category = item.ingredient.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);
};

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>(shoppingCart);

  const handleRemoveItem = (ingredientId: string, recipeId: string) => {
    removeFromCart(ingredientId, recipeId);
    setCart([...shoppingCart]); // Update local state
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const handleCheckout = () => {
    toast.success("Order placed! Your groceries will arrive soon.");
    clearCart();
    setCart([]);
  };

  const groupedItems = groupItemsByCategory(cart);
  const groceryCategories = getGroceryCategories();
  const isEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold flex items-center">
                <CartIcon className="h-5 w-5 mr-2 text-recipe-600" />
                Shopping List
              </h1>
            </div>
            
            {!isEmpty && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear shopping list?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all items from your shopping list. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart}>
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
      
      {/* Cart Content */}
      <div className="container mx-auto px-4 py-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <ShoppingBasket className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium mb-2">Your shopping list is empty</h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Add ingredients from recipes to create your shopping list
            </p>
            <Link to="/">
              <Button>
                <PackagePlus className="mr-2 h-4 w-4" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            {groceryCategories.map((category) => {
              const items = groupedItems[category.id];
              if (!items || items.length === 0) return null;
              
              return (
                <div key={category.id} className="mb-6">
                  <h2 className="text-lg font-medium mb-3 pb-2 border-b">
                    {category.name}
                  </h2>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={`${item.ingredient.id}-${item.recipeId}`}
                        className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div>
                          <div className="font-medium">{item.ingredient.name}</div>
                          <div className="text-sm text-gray-500">
                            <span>{item.ingredient.amount}</span>
                            <span className="mx-2">•</span>
                            <Link 
                              to={`/recipe/${item.recipeId}`}
                              className="text-recipe-600 hover:underline"
                            >
                              {item.recipeTitle}
                            </Link>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.ingredient.id, item.recipeId)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            
            {/* Checkout Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 z-10">
              <div className="container mx-auto px-4">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-recipe-600 hover:bg-recipe-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Complete Order ({cart.length} items)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
