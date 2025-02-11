const { create } = require("zustand");

type City = {
  id: string;
  name: string;
  timezone: string;
  temperature?: number;
  weather?: string;
  isFavorite?: boolean;
  country?: string;
  countryCode?: string;
  flag?: string;
  localTime?: string;
};

type CityStore = {
  cities: City[];
  favorites: string[];
  setCities: (cities: City[]) => void;
  toggleFavorite: (cityId: string) => void;
  updateCityTime: (cityId: string, time: string) => void;
};

const useCityStore = create<CityStore>((set) => ({
  cities: [],
  favorites: [],
  setCities: (cities) =>
    set((state) => ({
      cities: cities.map((city) => ({
        ...city,
        isFavorite: state.favorites.includes(city.id),
      })),
    })),
  toggleFavorite: (cityId) =>
    set((state) => {
      const newFavorites = state.favorites.includes(cityId)
        ? state.favorites.filter((id) => id !== cityId)
        : [...state.favorites, cityId];
      return {
        favorites: newFavorites,
        cities: state.cities.map((city) => ({
          ...city,
          isFavorite: newFavorites.includes(city.id),
        })),
      };
    }),
  updateCityTime: (cityId, time) =>
    set((state) => ({
      cities: state.cities.map((city) =>
        city.id === cityId ? { ...city, localTime: time } : city,
      ),
    })),
}));

async function getCityData(query?: string) {
  try {
    const url = query
      ? `https://api.timezonedb.com/v2.1/search-city?key=${import.meta.env.VITE_TIMEZONE_DB_API_KEY}&format=json&fields=cityName,countryCode,zoneName&limit=10&city=${query}`
      : `https://api.timezonedb.com/v2.1/list-time-zone?key=${import.meta.env.VITE_TIMEZONE_DB_API_KEY}&format=json&fields=zoneName,countryCode,countryName`;

    const response = await fetch(url);
    const data = await response.json();

    if (query) {
      return data.cities.map((city) => ({
        city: city.cityName,
        timezone: city.zoneName,
        countryCode: city.countryCode,
      }));
    } else {
      // Get a selection of major cities from different timezones
      const uniqueTimezones = new Set();
      const majorCities = [];

      for (const zone of data.zones) {
        const baseZone = zone.zoneName.split("/")[0];
        if (!uniqueTimezones.has(baseZone) && majorCities.length < 9) {
          uniqueTimezones.add(baseZone);
          majorCities.push({
            city: zone.zoneName.split("/").pop().replace(/_/g, " "),
            timezone: zone.zoneName,
            countryCode: zone.countryCode,
          });
        }
      }

      return majorCities;
    }
  } catch (error) {
    console.error("Error fetching timezone data:", error);
    return [];
  }
}

async function getCountryData(countryCode) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`,
    );
    const [data] = await response.json();
    return {
      country: data.name.common,
      flag: data.flags.svg,
    };
  } catch (error) {
    console.error("Error fetching country data:", error);
    return {
      country: "",
      flag: `https://flagcdn.com/${countryCode.toLowerCase()}.svg`,
    };
  }
}

async function getWeatherData(city: string, countryCode: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    );
    const data = await response.json();
    return {
      temperature: Math.round(data.main.temp),
      weather: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      temperature: 20,
      weather: "Unknown",
    };
  }
}

const getAllCities = async () => {
  const cityData = await getCityData();
  const cities = await Promise.all(
    cityData.map(async (city, index) => {
      const [countryData, weatherData] = await Promise.all([
        getCountryData(city.countryCode),
        getWeatherData(city.city, city.countryCode),
      ]);

      const localTime = new Date().toLocaleTimeString("en-US", {
        timeZone: city.timezone,
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: index.toString(),
        name: city.city,
        timezone: city.timezone,
        countryCode: city.countryCode,
        localTime,
        ...countryData,
        ...weatherData,
        isFavorite: false,
      };
    }),
  );

  return cities;
};

const searchCities = async (query) => {
  if (!query) return [];

  const cityData = await getCityData(query);
  const cities = await Promise.all(
    cityData.map(async (city, index) => {
      const [countryData, weatherData] = await Promise.all([
        getCountryData(city.countryCode),
        getWeatherData(city.city, city.countryCode),
      ]);

      const localTime = new Date().toLocaleTimeString("en-US", {
        timeZone: city.timezone,
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: `${query}-${index}`,
        name: city.city,
        timezone: city.timezone,
        countryCode: city.countryCode,
        localTime,
        ...countryData,
        ...weatherData,
        isFavorite: false,
      };
    }),
  );

  return cities;
};

const updateCityTimes = (cities) => {
  const store = useCityStore.getState();

  cities.forEach((city) => {
    const localTime = new Date().toLocaleTimeString("en-US", {
      timeZone: city.timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
    store.updateCityTime(city.id, localTime);
  });
};

module.exports = {
  City: null,
  useCityStore,
  getAllCities,
  searchCities,
  updateCityTimes,
};
