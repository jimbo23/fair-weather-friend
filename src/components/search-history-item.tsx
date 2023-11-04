import { Delete, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFormattedDateTimeString } from '../utils/get-formatted-date-time-string';
import { useAppDispatch } from '../redux/hooks';
import { removeFromSearchHistory } from '../redux/search-history-slice';
import { SearchHistoryType } from '../types';

type SearchHistoryItemProps = { record: SearchHistoryType };

export const SearchHistoryItem = ({ record }: SearchHistoryItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <li className="bg-white/40 px-3 py-2 md:py-3 flex justify-between gap-2 items-center rounded-xl">
      <div className="flex flex-col md:flex-row md:justify-between w-full md:items-center">
        <span className="capitalize text-sm">
          {record.location}, {record.countryCode}
        </span>
        <span className="text-xs">
          {getFormattedDateTimeString(record.searchAt)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded-[50%] bg-white p-2"
          onClick={() => navigate(`/?q=${record.location.toLowerCase()}`)}
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          className="rounded-[50%] bg-white p-2"
          onClick={() => dispatch(removeFromSearchHistory({ id: record.id }))}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};
