import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addToSearchHistory } from '../redux/search-history-slice';
import { WeatherResponseType } from '../types';
import { APP_CONFIG } from '../config';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APP_CONFIG.BASE_URL,
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponseType, string>({
      query: (currentSearch: string) =>
        `weather?q=${currentSearch}&units=metric&appId=${APP_CONFIG.OPEN_WEATHER_API_KEY}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            addToSearchHistory({
              countryCode: data.sys.country,
              location: data.name,
            })
          );
        } catch (err) {}
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetWeatherQuery, useLazyGetWeatherQuery } = weatherApi;
