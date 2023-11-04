import { Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');

  return (
    <form
      className="flex w-full gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchText !== '') {
          searchParams.set('q', searchText);
        } else {
          searchParams.delete('q');
        }
        setSearchParams(searchParams);
      }}
    >
      <input
        className="w-full px-3 rounded-lg md:rounded-2xl bg-white/20 focus-visible:outline-none focus:bg-white/30 text-sm md:text-md"
        type="search"
        defaultValue={searchText}
        value={searchText}
        autoCapitalize="words"
        autoComplete="on"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg md:rounded-2xl bg-purple-700 p-2 md:p-3 text-white"
      >
        <Search className="h-4 w-4 md:h-6 md:w-6" />
      </button>
    </form>
  );
};
