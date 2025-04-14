
import { Link } from "react-router-dom";
import { ShoppingCart, Book, Heart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { shoppingCart } from "@/lib/data";

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
            <span className="text-xl font-semibold">RecipeCart</span>
          </Link>
          
          {/* Search Bar (on larger screens) */}
          <div className="hidden md:flex items-center relative w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full py-2 pl-10 pr-4 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-recipe-400 focus:outline-none text-sm"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1 sm:space-x-4">
            <Link to="/" className="p-2 text-gray-600 hover:text-recipe-600 transition-colors">
              <Book className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Recipes</span>
            </Link>
            <Link to="/favorites" className="p-2 text-gray-600 hover:text-recipe-600 transition-colors">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Favorites</span>
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full py-2 pl-10 pr-4 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-recipe-400 focus:outline-none text-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
