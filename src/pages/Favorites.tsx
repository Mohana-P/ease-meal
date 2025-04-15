
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/lib/data";

const Favorites = () => {
  const [favorites] = useState(() => recipes.filter(recipe => recipe.isFavorite));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-recipe-500 to-recipe-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Favorite Recipes</h1>
          <p className="text-recipe-50 mb-6">
            Your collection of saved recipes
          </p>
        </div>
      </div>
      
      {/* Recipes Grid */}
      <div className="container mx-auto px-4 py-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500">
              Click the heart icon on recipes to add them to your favorites
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
