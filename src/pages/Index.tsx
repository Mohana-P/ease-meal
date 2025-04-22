
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CategoryFilter from "@/components/CategoryFilter";
import RecipeCard from "@/components/RecipeCard";
import { filterRecipesByCategory, recipes, toggleFavorite } from "@/lib/data";
import { getGreeting, getMealSuggestion, filterRecipesByMealTime } from "@/lib/timeUtils";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart, Clock, Timer } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [greeting, setGreeting] = useState("");
  const [mealType, setMealType] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all', 'healthy', 'quick', 'tasty'
  const [timeBasedRecipes, setTimeBasedRecipes] = useState<any[]>([]);

  // Get filtered recipes based on category
  const filteredRecipes = filterRecipesByCategory(selectedCategory);

  // Initialize time-based data
  useEffect(() => {
    setGreeting(getGreeting());
    const currentMealType = getMealSuggestion();
    setMealType(currentMealType);
    
    // Filter recipes based on meal time
    const suggestedRecipes = filterRecipesByMealTime(recipes, currentMealType);
    setTimeBasedRecipes(suggestedRecipes.slice(0, 4)); // Show up to 4 suggestions
  }, []);

  // Apply additional filter type
  const applyFilterType = (recipes: any[]) => {
    if (filterType === 'all') return recipes;
    
    switch (filterType) {
      case 'healthy':
        // Consider recipes with less than 30 minutes cook time as "healthy"
        return recipes.filter(recipe => 
          recipe.category.some((cat: string) => 
            cat.toLowerCase().includes('vegetarian') || 
            cat.toLowerCase().includes('healthy')
          )
        );
      case 'quick':
        // Quick recipes take less than 30 minutes total
        return recipes.filter(recipe => (recipe.prepTime + recipe.cookTime) < 30);
      case 'tasty':
        // For demo purposes, consider non-vegetarian or street food as "tasty"
        return recipes.filter(recipe => 
          recipe.category.some((cat: string) => 
            cat.toLowerCase().includes('non-vegetarian') || 
            cat.toLowerCase().includes('street food')
          )
        );
      default:
        return recipes;
    }
  };

  // Final filtered recipes
  const displayRecipes = applyFilterType(filteredRecipes);

  // Handle favorite toggle
  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
    // Force re-render
    setFilterType(prev => prev);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Personalized Greeting */}
      <div className="bg-gradient-to-r from-recipe-500 to-recipe-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Ease Meal</h1>
          <p className="text-recipe-50 mb-3">
            Discover authentic Indian recipes and easily shop for ingredients
          </p>
          <p className="text-xl text-white mb-6 font-medium">
            {greeting}
          </p>
        </div>
      </div>

      {/* Time-based Recipe Suggestions */}
      {timeBasedRecipes.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-semibold mb-4">
            {mealType === 'breakfast' ? 'Breakfast Ideas' :
             mealType === 'lunch' ? 'Lunch Suggestions' :
             mealType === 'dinner' ? 'Dinner Recommendations' : 'Snack Options'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {timeBasedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recipe Type Filter */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">Find Recipes</h2>
          <ToggleGroup type="single" value={filterType} onValueChange={(value) => value && setFilterType(value)}>
            <ToggleGroupItem value="all" aria-label="All recipes">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="healthy" aria-label="Healthy recipes">
              <Heart className="mr-1 h-4 w-4" />
              Healthy
            </ToggleGroupItem>
            <ToggleGroupItem value="quick" aria-label="Quick recipes">
              <Clock className="mr-1 h-4 w-4" />
              Quick
            </ToggleGroupItem>
            <ToggleGroupItem value="tasty" aria-label="Tasty recipes">
              <Timer className="mr-1 h-4 w-4" />
              Tasty
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      {/* Recipes Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        
        {displayRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No recipes found. Try another filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
