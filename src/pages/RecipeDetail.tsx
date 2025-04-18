import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ChevronLeft, Heart, Clock, User, ShoppingCart, 
  Check, Plus, ListChecks, IndianRupee, MinusCircle, PlusCircle,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import RestaurantOrderModal from "@/components/RestaurantOrderModal";
import { 
  recipes, Recipe, toggleFavorite, addToCart, addRecipeToCart, 
  shoppingCart, getRestaurantsForRecipe
} from "@/lib/data";
import { toast } from "@/components/ui/sonner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(0);
  const [originalServings, setOriginalServings] = useState(0);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundRecipe = recipes.find((r) => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setServings(foundRecipe.servings);
        setOriginalServings(foundRecipe.servings);
      } else {
        toast.error("Recipe not found");
        navigate("/");
      }
    }
    setLoading(false);
  }, [id, navigate]);

  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite(recipe.id);
      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    }
  };

  const isIngredientInCart = (ingredientId: string, recipeId: string) => {
    return shoppingCart.some(
      item => item.ingredient.id === ingredientId && item.recipeId === recipeId
    );
  };

  const handleAddIngredient = (ingredientId: string) => {
    if (recipe) {
      const ingredient = recipe.ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        const ratio = servings / originalServings;
        const adjustedIngredient = {
          ...ingredient,
          price: ingredient.price * ratio,
          amount: calculateAdjustedAmount(ingredient.amount, ratio)
        };
        
        addToCart(adjustedIngredient, recipe.id, recipe.title);
        setRecipe({ ...recipe });
      }
    }
  };

  const handleAddAllIngredients = () => {
    if (recipe) {
      addRecipeToCart(recipe.id, servings / originalServings);
      setRecipe({ ...recipe });
    }
  };
  
  const calculateAdjustedAmount = (amount: string, ratio: number) => {
    const numericMatch = amount.match(/[\d.]+/);
    if (!numericMatch) return amount;
    
    const numericValue = parseFloat(numericMatch[0]);
    const adjustedValue = (numericValue * ratio).toFixed(1);
    return amount.replace(/[\d.]+/, adjustedValue);
  };

  const calculateTotalPrice = () => {
    if (!recipe) return 0;
    const ratio = servings / originalServings;
    return recipe.ingredients.reduce((sum, ingredient) => sum + (ingredient.price * ratio), 0);
  };

  const decreaseServings = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  const increaseServings = () => {
    setServings(servings + 1);
  };

  const handleCheckout = () => {
    toast.success("Order placed! Redirecting to tracking page...");
    setTimeout(() => {
      navigate('/order-tracking');
    }, 1500);
  };

  const getRestaurants = () => {
    if (!recipe || !id) return [];
    return getRestaurantsForRecipe(id);
  };

  const openRestaurantModal = () => {
    setShowRestaurantModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-medium mb-4">Recipe not found</h1>
          <Link to="/" className="text-recipe-600 hover:underline">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  const restaurants = getRestaurants();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Recipe Hero */}
      <div className="w-full relative">
        <div className="h-56 md:h-72 lg:h-96 w-full relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="absolute top-4 left-4 flex space-x-2 z-10">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Recipe Info */}
      <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex gap-2 flex-wrap mb-2">
                {recipe.category.map((cat) => (
                  <span
                    key={cat}
                    className="badge bg-recipe-50 text-recipe-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {recipe.title}
              </h1>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
            </div>
            <div className="flex gap-2">
              {restaurants.length > 0 && (
                <Button 
                  onClick={openRestaurantModal}
                  variant="outline" 
                  size="sm"
                  className="text-recipe-700 border-recipe-200 flex gap-1"
                >
                  <Utensils className="h-4 w-4" />
                  Order Ready
                </Button>
              )}
              <Button 
                onClick={handleToggleFavorite}
                variant="outline" 
                size="icon" 
                className={`h-10 w-10 rounded-full ${
                  recipe.isFavorite ? "text-red-500 border-red-200" : ""
                }`}
              >
                <Heart 
                  fill={recipe.isFavorite ? "currentColor" : "none"} 
                  className="h-5 w-5"
                />
              </Button>
            </div>
          </div>
          
          {/* Recipe Meta */}
          <div className="grid grid-cols-4 gap-4 py-4 border-t border-b border-gray-100 my-4">
            <div className="text-center">
              <div className="flex justify-center">
                <Clock className="h-5 w-5 text-recipe-600 mr-1" />
                <span className="text-sm font-medium">Prep</span>
              </div>
              <p className="text-gray-600">{recipe.prepTime} min</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Clock className="h-5 w-5 text-recipe-600 mr-1" />
                <span className="text-sm font-medium">Cook</span>
              </div>
              <p className="text-gray-600">{recipe.cookTime} min</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <User className="h-5 w-5 text-recipe-600 mr-1" />
                <span className="text-sm font-medium">Serves</span>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-0" 
                  onClick={decreaseServings}
                  disabled={servings <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="text-gray-600">{servings}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 p-0" 
                  onClick={increaseServings}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <IndianRupee className="h-5 w-5 text-recipe-600 mr-1" />
                <span className="text-sm font-medium">Cost</span>
              </div>
              <p className="text-gray-600">₹{Math.round(calculateTotalPrice())}</p>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <Button 
                onClick={handleAddAllIngredients}
                variant="secondary" 
                size="sm" 
                className="text-recipe-700 bg-recipe-50 hover:bg-recipe-100"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add all to cart
              </Button>
            </div>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient) => {
                const inCart = isIngredientInCart(ingredient.id, recipe.id);
                const ratio = servings / originalServings;
                const adjustedPrice = ingredient.price * ratio;
                const adjustedAmount = calculateAdjustedAmount(ingredient.amount, ratio);
                
                return (
                  <li 
                    key={ingredient.id}
                    className="flex justify-between items-center p-2 rounded hover:bg-gray-50"
                  >
                    <span>
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-gray-600"> • {adjustedAmount}</span>
                      <span className="text-recipe-600 ml-1">₹{Math.round(adjustedPrice)}</span>
                    </span>
                    <Button
                      onClick={() => handleAddIngredient(ingredient.id)}
                      variant="ghost"
                      size="icon"
                      disabled={inCart}
                      className={inCart ? "text-recipe-600" : "text-gray-400"}
                    >
                      {inCart ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Instructions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="bg-recipe-100 text-recipe-700 rounded-full h-6 w-6 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      
      {/* Restaurant Order Modal */}
      <RestaurantOrderModal
        open={showRestaurantModal}
        onClose={() => setShowRestaurantModal(false)}
        recipeId={recipe.id}
        recipeName={recipe.title}
        restaurants={restaurants}
      />
      
      {/* Floating Action Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        <Link to="/cart">
          <Button className="h-14 w-14 rounded-full bg-recipe-600 hover:bg-recipe-700 text-white shadow-lg">
            <ListChecks className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
