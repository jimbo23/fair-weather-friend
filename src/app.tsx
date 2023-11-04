import { CurrentWeather } from './components/current-weather';
import { SearchBox } from './components/search-box';
import { SearchHistory } from './components/search-history';

export const App = () => (
  <div className="bg-[url('/bg-light.png')] min-h-screen bg-center">
    <main className="flex flex-col items-center max-w-sm md:max-w-2xl mx-auto gap-16 pt-3 md:pt-6 pb-10 w-[90%]">
      <SearchBox />
      <section className="bg-white/30 shadow-lg p-4 md:p-8 rounded-3xl w-full flex flex-col justify-center relative ">
        <img
          fetchpriority="high"
          src="/sun.png"
          className="h-36 w:36 md:h-48 md:w-48 absolute right-3 -top-12"
          alt="weather-icon"
        />
        <CurrentWeather />
        <SearchHistory />
      </section>
    </main>
  </div>
);
