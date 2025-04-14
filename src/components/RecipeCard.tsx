
import { Link } from "react-router-dom";
import { Recipe } from "@/lib/data";
import { Clock, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/lib/data";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="recipe-card bg-white rounded-lg overflow-hidden shadow">
        <div className="relative">
          {/* Recipe Image */}
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full",
              recipe.isFavorite ? "bg-white/90 text-red-500" : "bg-white/70 text-gray-400"
            )}
          >
            <Heart
              fill={recipe.isFavorite ? "currentColor" : "none"}
              size={18}
            />
          </button>
          
          {/* Categories */}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
            {recipe.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="badge bg-white/80 backdrop-blur-sm text-gray-800"
              >
                {cat}
              </span>
            ))}
            {recipe.category.length > 2 && (
              <span className="badge bg-white/80 backdrop-blur-sm text-gray-800">
                +{recipe.category.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {/* Recipe Info */}
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          
          {/* Recipe Meta */}
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
