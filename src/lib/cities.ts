export interface City {
  id: string;
  name: string;
  timezone: string;
  temperature?: number;
  weather?: string;
  isFavorite?: boolean;
  country?: string;
}

// Mock data since city-timezones is causing issues
const MOCK_CITIES = [
  { city: "New York", timezone: "America/New_York", country: "United States" },
  { city: "London", timezone: "Europe/London", country: "United Kingdom" },
  { city: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { city: "Paris", timezone: "Europe/Paris", country: "France" },
  { city: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
  { city: "Dubai", timezone: "Asia/Dubai", country: "United Arab Emirates" },
  { city: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { city: "Berlin", timezone: "Europe/Berlin", country: "Germany" },
  { city: "Moscow", timezone: "Europe/Moscow", country: "Russia" },
];

export const getAllCities = (): City[] => {
  return MOCK_CITIES.map((city, index) => ({
    id: index.toString(),
    name: city.city,
    timezone: city.timezone,
    country: city.country,
    temperature: Math.floor(Math.random() * 30) + 5,
    weather: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
      Math.floor(Math.random() * 4)
    ],
    isFavorite: false,
  }));
};

export const searchCities = (query: string): City[] => {
  if (!query) return [];
  const filteredCities = MOCK_CITIES.filter(
    (city) =>
      city.city.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase()),
  );
  return filteredCities.map((city, index) => ({
    id: `${query}-${index}`,
    name: city.city,
    timezone: city.timezone,
    country: city.country,
    temperature: Math.floor(Math.random() * 30) + 5,
    weather: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
      Math.floor(Math.random() * 4)
    ],
    isFavorite: false,
  }));
};
