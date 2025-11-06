import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";
import { cityTiers } from "../data/cityTiers";

interface EarningsCalculatorProps {
  category?: "ccm-cm" | "doctor";
}

interface CitySearchProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

const CitySearch = ({ selectedCity, onCitySelect }: CitySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const allCities = cityTiers.flatMap(tier => tier.cities);
  
  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    setSearchTerm(city);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <Label htmlFor="city-search" className="text-sm font-medium mb-2 block">
        Select Your City
      </Label>
      <div className="relative">
        <Input
  id="city-search"
  type="text"
  placeholder="Search for your city..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  }}
  onFocus={() => setIsOpen(true)}
  onBlur={() => setTimeout(() => setIsOpen(false), 200)}
  className="w-full pr-10 h-[54px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
  style={{
    backgroundColor: "#f9fbfd",
  }}
/>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {isOpen && searchTerm && (
        <div className="absolute z-50 w-full -mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground text-sm">
              No cities found. Try a different search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EarningsCalculator = ({ category = "ccm-cm" }: EarningsCalculatorProps) => {
  const [visits, setVisits] = useState([15]);
  const [subscriptions, setSubscriptions] = useState([5]);
  const [selectedCity, setSelectedCity] = useState("");

  // Get current tier based on selected city (internal calculation only)
  const currentTier = useMemo(() => {
    if (!selectedCity) return cityTiers[1]; // Default to Tier 2
    return cityTiers.find(tier => 
      tier.cities.includes(selectedCity)
    ) || cityTiers[1];
  }, [selectedCity]);

  // Base rates (averages of the ranges)
  const baseVisitRate = category === "doctor" ? 1150 : 400;
  const baseSubscriptionRate = category === "doctor" ? 4000 : 1500;

  // Adjusted rates based on city tier (internal calculation only)
  const visitRate = Math.round(baseVisitRate * currentTier.visitRateMultiplier);
  const subscriptionRate = Math.round(baseSubscriptionRate * currentTier.subscriptionRateMultiplier);

  const weeklyVisits = visits[0];
  const monthlyVisits = weeklyVisits * 4;
  const monthlyFromVisits = monthlyVisits * visitRate;

  const monthlyClients = subscriptions[0];
  const monthlyFromSubscriptions = monthlyClients * subscriptionRate;

  const totalMonthly = monthlyFromVisits + monthlyFromSubscriptions;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="grid md:grid-cols-2 gap-6 items-start mb-6">
          {/* Left Side - City Search */}
          <div className="space-y-2">
            <CitySearch 
              selectedCity={selectedCity} 
              onCitySelect={setSelectedCity} 
            />
          </div>
          
          {/* Right Side - Selected City Display */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected City</Label>
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg border">
              {selectedCity ? (
                <>
                  <MapPin className="h-7 w-5 text-primary" />
                  <span className="font-semibold text-lg">{selectedCity}</span>
                </>
              ) : (
                <span className="text-muted-foreground  ">No city selected</span>
              )}
            </div>
          </div>
        </div>

        <CardTitle className="text-2xl font-bold">Calculate Your Earning Potential</CardTitle>
        <CardDescription>
          {category === "doctor" 
            ? "Adjust the sliders to see what you could earn as a Telth Doctor"
            : "Adjust the sliders to see what you could earn as a Telth Care Manager"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Current Rates Display - Only show when city is selected */}
        {selectedCity && (
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Per Visit Rate</p>
                <p className="text-lg font-bold text-primary">₹{visitRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Subscription</p>
                <p className="text-lg font-bold text-secondary">₹{subscriptionRate}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {category === "doctor" ? "Home Consultations Per Week" : "Home Visits Per Week"}
            </Label>
            <span className="text-2xl font-bold text-primary">{weeklyVisits}</span>
          </div>
          <Slider
            value={visits}
            onValueChange={setVisits}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            {monthlyVisits} visits/month × ₹{visitRate} = ₹{monthlyFromVisits.toLocaleString("en-IN")}/month
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">
              {category === "doctor" ? "Ongoing Patients" : "Subscription Clients"}
            </Label>
            <span className="text-2xl font-bold text-secondary">{monthlyClients}</span>
          </div>
          <Slider
            value={subscriptions}
            onValueChange={setSubscriptions}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            {monthlyClients} clients × ₹{subscriptionRate}/month = ₹{monthlyFromSubscriptions.toLocaleString("en-IN")}/month
          </p>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">Your Total Monthly Income</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ₹{totalMonthly.toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Plus referral bonuses and potential for growth
              {selectedCity && (
                <span className="block text-primary font-semibold mt-2">
                  Rates customized for {selectedCity}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Weekly Visits</p>
              <p className="font-semibold">{weeklyVisits} visits</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Recurring Clients</p>
              <p className="font-semibold">{monthlyClients} clients</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <TrendingUp className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Growth Potential</p>
              <p className="font-semibold">Unlimited</p>
            </div>
          </div>
        </div>

        {!selectedCity && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-800">
              💡 Select your city to see accurate earning estimates for your location
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};