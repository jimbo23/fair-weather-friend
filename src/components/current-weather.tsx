import { useSearchParams } from 'react-router-dom';
import { useGetWeatherQuery } from '../api/weather-api';
import { getFormattedDateTimeString } from '../utils/get-formatted-date-time-string';

export const CurrentWeather = () => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('q');
  const { data, isLoading, isFetching, isError, error } = useGetWeatherQuery(
    currentSearch || 'singapore'
  );

  if (isLoading || isFetching) return <CurrentWeather.Loading />;
  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  if (data)
    return (
      <div className="flex justify-between mb-3">
        <div className="flex flex-col flex-[0.5]">
          <span className="font-semibold text-sm mb-1">Today's weather</span>
          <span className="text-5xl md:text-6xl mb-1 text-purple-700 font-bold tracking-tighter">
            {data.main.temp.toFixed(0)}&#8451;
          </span>
          <span className="text-sm font-semibold mb-1">
            H:{data.main.temp_max.toFixed(0)}&#8451; L:
            {data.main.temp_min.toFixed(0)}&#8451;
          </span>
          <span className="text-sm text-gray-800/80 font-semibold">
            {data.name}, {data.sys.country}
          </span>
        </div>
        <div className="flex flex-col-reverse text-end self-end md:flex-row md:justify-between flex-[0.5] md:flex-1">
          <span className="text-sm text-gray-800/50 font-medium">
            {getFormattedDateTimeString(data.dt * 1000)}
          </span>
          <span className="text-sm text-gray-800/50 font-medium">
            Humidity: {data.main.humidity}%
          </span>
          <span className="text-sm text-gray-800/50 font-medium">
            {data.weather[0].main}
          </span>
        </div>
      </div>
    );
};

CurrentWeather.Loading = () => (
  <div className="flex flex-col gap-4">
    <div className="h-6 w-20 animate-pulse bg-white/40 rounded-lg" />
    <div className="h-10 w-20 animate-pulse bg-white/40 rounded-lg" />
    <div className="h-6 w-20 animate-pulse bg-white/40 rounded-lg" />
    <div className="h-6 w-full animate-pulse bg-white/40 rounded-lg mb-4" />
  </div>
);
