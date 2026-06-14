export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetail?: string;
  price: number;
  currency: string;
  cabin: string;
  seatsLeft?: number;
  affiliateUrl: string;
  provider: string;
  baggage: string;
  co2kg: number;
  isTopDeal?: boolean;
  isCheapest?: boolean;
}

export interface SearchParams {
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabin: string;
  tripType: "one-way" | "return" | "multi-city";
}

export const popularRoutes = [
  { from: "London", fromCode: "LHR", to: "New York", toCode: "JFK", price: 289, image: "🗽" },
  { from: "London", fromCode: "LHR", to: "Dubai", toCode: "DXB", price: 199, image: "🏙️" },
  { from: "London", fromCode: "LGW", to: "Barcelona", toCode: "BCN", price: 49, image: "🏖️" },
  { from: "London", fromCode: "LHR", to: "Tokyo", toCode: "NRT", price: 499, image: "🗼" },
  { from: "London", fromCode: "LHR", to: "Bangkok", toCode: "BKK", price: 379, image: "🛕" },
  { from: "London", fromCode: "LHR", to: "Bali", toCode: "DPS", price: 559, image: "🌴" },
];

export const airports = [
  { code: "LHR", name: "Heathrow", city: "London", country: "United Kingdom" },
  { code: "LGW", name: "Gatwick", city: "London", country: "United Kingdom" },
  { code: "STN", name: "Stansted", city: "London", country: "United Kingdom" },
  { code: "JFK", name: "John F. Kennedy", city: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles Intl", city: "Los Angeles", country: "United States" },
  { code: "DXB", name: "Dubai Intl", city: "Dubai", country: "UAE" },
  { code: "BCN", name: "El Prat", city: "Barcelona", country: "Spain" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "NRT", name: "Narita", city: "Tokyo", country: "Japan" },
  { code: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { code: "DPS", name: "Ngurah Rai", city: "Bali", country: "Indonesia" },
  { code: "SYD", name: "Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "SIN", name: "Changi", city: "Singapore", country: "Singapore" },
  { code: "HKG", name: "Hong Kong Intl", city: "Hong Kong", country: "China" },
  { code: "ORD", name: "O'Hare", city: "Chicago", country: "United States" },
  { code: "MIA", name: "Miami Intl", city: "Miami", country: "United States" },
  { code: "FCO", name: "Fiumicino", city: "Rome", country: "Italy" },
  { code: "MAD", name: "Barajas", city: "Madrid", country: "Spain" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
];

export function generateFlights(params: SearchParams): Flight[] {
  const airlines = [
    { name: "British Airways", code: "BA", logo: "🇬🇧" },
    { name: "Virgin Atlantic", code: "VS", logo: "✈️" },
    { name: "Emirates", code: "EK", logo: "🇦🇪" },
    { name: "easyJet", code: "U2", logo: "🟠" },
    { name: "Ryanair", code: "FR", logo: "🟡" },
    { name: "Lufthansa", code: "LH", logo: "🇩🇪" },
    { name: "KLM", code: "KL", logo: "🇳🇱" },
    { name: "Air France", code: "AF", logo: "🇫🇷" },
    { name: "Qatar Airways", code: "QR", logo: "🇶🇦" },
    { name: "Turkish Airlines", code: "TK", logo: "🇹🇷" },
  ];

  const basePrice = 100 + Math.floor(Math.random() * 400);
  const flights: Flight[] = [];

  for (let i = 0; i < 12; i++) {
    const airline = airlines[i % airlines.length];
    const stops = i < 4 ? 0 : i < 8 ? 1 : 2;
    const priceMultiplier = stops === 0 ? 1.2 : stops === 1 ? 1.0 : 0.85;
    const cabinMultiplier = params.cabin === "economy" ? 1 : params.cabin === "premium" ? 1.8 : params.cabin === "business" ? 3.5 : 6;
    const price = Math.round(basePrice * priceMultiplier * cabinMultiplier * (0.9 + Math.random() * 0.3)) * params.passengers;

    const depHour = 6 + (i * 2) % 16;
    const flightHours = 2 + stops * 3 + Math.floor(Math.random() * 4);
    const arrHour = (depHour + flightHours) % 24;

    flights.push({
      id: `FL${i + 1}${airline.code}`,
      airline: airline.name,
      airlineCode: airline.code,
      airlineLogo: airline.logo,
      origin: params.origin,
      originCode: params.originCode,
      destination: params.destination,
      destinationCode: params.destinationCode,
      departureTime: `${depHour.toString().padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`,
      arrivalTime: `${arrHour.toString().padStart(2, "0")}:${i % 2 === 0 ? "15" : "45"}`,
      duration: `${flightHours}h ${i % 2 === 0 ? "15" : "45"}m`,
      stops,
      stopDetail: stops === 1 ? "1 stop via AMS" : stops === 2 ? "2 stops via CDG, AMS" : undefined,
      price,
      currency: "GBP",
      cabin: params.cabin,
      seatsLeft: stops === 0 ? Math.floor(Math.random() * 5) + 1 : undefined,
      affiliateUrl: `https://www.skyscanner.net/transport/flights/${params.originCode.toLowerCase()}/${params.destinationCode.toLowerCase()}/?adults=${params.passengers}&cabinclass=${params.cabin}`,
      provider: "Skyscanner",
      baggage: stops === 0 ? "1 carry-on included" : "20kg hold bag included",
      co2kg: Math.round(80 + Math.random() * 200),
      isTopDeal: i === 2,
      isCheapest: i === Math.floor(Math.random() * 3) + 7,
    });
  }

  return flights.sort((a, b) => a.price - b.price);
}
