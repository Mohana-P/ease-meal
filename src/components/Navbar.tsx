
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { shoppingCart } from "@/lib/data";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-recipe-600">
              <ShoppingCart size={24} />
            </span>
            <span className="text-xl font-semibold">Ease Meal</span>
          </Link>
          
          {/* Search Bar (on larger screens) */}
          <div className="hidden md:flex items-center relative w-1/3">
            <SearchInput />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1 sm:space-x-4">
            <Link to="/favorites" className="p-2 text-gray-600 hover:text-recipe-600 transition-colors">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Favorites</span>
            </Link>
            <Link to="/order-history" className="p-2 text-gray-600 hover:text-recipe-600 transition-colors">
              <History className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Order History</span>
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-recipe-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Shopping Cart</span>
              {shoppingCart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-recipe-500 text-white">
                  {shoppingCart.length}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchInput />
      </div>
    </nav>
  );
};

export default Navbar;
