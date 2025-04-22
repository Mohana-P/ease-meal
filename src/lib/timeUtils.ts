
// Time-based utility functions for recipe suggestions

/**
 * Get current time period (morning, afternoon, evening, night)
 */
export const getTimePeriod = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
};

/**
 * Get meal suggestion based on time period
 */
export const getMealSuggestion = (): 'breakfast' | 'lunch' | 'dinner' | 'snack' => {
  const timePeriod = getTimePeriod();
  
  switch (timePeriod) {
    case 'morning': return 'breakfast';
    case 'afternoon': return 'lunch';
    case 'evening': return 'dinner';
    case 'night': return 'snack';
  }
};

/**
 * Get personalized greeting based on time period
 */
export const getGreeting = (): string => {
  const timePeriod = getTimePeriod();
  
  switch (timePeriod) {
    case 'morning':
      return "Hey! Good morning. Feeling fresh? Want to have a healthy breakfast?";
    case 'afternoon':
      return "Good afternoon! Looking for a delicious lunch option?";
    case 'evening':
      return "Good evening! Time for a hearty dinner to end your day.";
    case 'night':
      return "Still up? How about a light snack before bed?";
  }
};

/**
 * Filter recipes based on meal time
 */
export const filterRecipesByMealTime = (recipes: any[], mealType: string): any[] => {
  const mealTypeCategories: Record<string, string[]> = {
    'breakfast': ['Breakfast', 'South Indian'],
    'lunch': ['Main Course', 'North Indian', 'Hyderabadi'],
    'dinner': ['Main Course', 'Vegetarian', 'Non-Vegetarian'],
    'snack': ['Snack', 'Street Food']
  };
  
  const categories = mealTypeCategories[mealType.toLowerCase()] || [];
  
  return recipes.filter(recipe => 
    recipe.category.some((cat: string) => 
      categories.some(mealCat => cat.toLowerCase().includes(mealCat.toLowerCase()))
    )
  );
};
