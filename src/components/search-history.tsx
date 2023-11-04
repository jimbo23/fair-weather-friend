import { useAppSelector } from '../redux/hooks';
import { selectSearchHistory } from '../redux/search-history-slice';
import { SearchHistoryItem } from './search-history-item';

export const SearchHistory = () => {
  const records = useAppSelector(selectSearchHistory);

  return (
    <div className="bg-white/20 p-3 md:p-4 rounded-2xl">
      <p className="font-semibold text-sm mb-3">Search History</p>
      {records.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {records.map((record) => (
            <SearchHistoryItem record={record} key={record.id} />
          ))}
        </ul>
      ) : (
        <NoRecordText />
      )}
    </div>
  );
};

const NoRecordText = () => (
  <span className="text-center font-medium text-black/60">
    No search record
  </span>
);
