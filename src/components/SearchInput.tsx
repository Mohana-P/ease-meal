
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '@/lib/data';

interface SearchResult {
  id: string;
  title: string;
  category: string[];
}

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filteredResults = recipes
      .filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category
      }));

    setResults(filteredResults);
  }, [query]);

  const handleInputFocus = () => {
    setShowResults(true);
  };

  const handleResultClick = (id: string) => {
    navigate(`/recipe/${id}`);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleInputFocus}
        placeholder="Search recipes..."
        className="w-full py-2 pl-10 pr-4 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-recipe-400 focus:outline-none text-sm"
      />
      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-md overflow-hidden z-20">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() => handleResultClick(result.id)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <div className="font-medium">{result.title}</div>
              <div className="text-xs text-gray-500">
                {result.category.slice(0, 2).join(', ')}
                {result.category.length > 2 ? ' ...' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showResults && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-md overflow-hidden z-20">
          <div className="px-4 py-2 text-gray-500">No recipes found</div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
