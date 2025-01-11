import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Store/store';
import { fetchItems, setFilteredItems } from '../Reducer/searchSlice';

// Custom hook to debounce the search query
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Item {
  id: number;
  title: string;
  overview: string;
  type: string;
  imageUrl: string;
  releaseDate: string;
}

const SearchComponent: FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  
  const { filteredItems, loading, error } = useSelector((state: RootState) => state.items);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearchQuery(query);
      dispatch(fetchItems(query));
    }
  }, [location, dispatch]);

  
   useEffect(() => {
    if (debouncedSearchQuery) {
      dispatch(fetchItems(debouncedSearchQuery));
    }
  }, [debouncedSearchQuery, dispatch]);

     (query: string, allItems: Item[]) => {
    const filtered = allItems.filter((item) => {
      const titleMatch = item.title && item.title.toLowerCase().includes(query.toLowerCase());
      const overviewMatch = item.overview && item.overview.toLowerCase().includes(query.toLowerCase());
      const imageMatch = item.imageUrl && item.imageUrl.toLowerCase().includes(query.toLowerCase());
      const releaseDateMatch = item.releaseDate && item.releaseDate.toLowerCase().includes(query.toLowerCase());

      return titleMatch || overviewMatch || imageMatch || releaseDateMatch;
    });

    dispatch(setFilteredItems(filtered));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold m-4">Search Results for: "{searchQuery}"</h2>
      <div>
        {filteredItems.map((item, index) => (
          <div key={index} className="border border-gray-500 rounded-xl m-4 p-2 flex items-center">
            <div className="w-28 pr-4">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="flex-1">
              <p><b>{item.title}</b></p>
              <p className="font-light">{item.releaseDate}</p>
              <p>{item.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;