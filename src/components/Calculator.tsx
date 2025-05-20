
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Calculator = () => {
  const [transportationType, setTransportationType] = useState('car');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const distanceValue = parseFloat(distance);
    if (isNaN(distanceValue) || distanceValue <= 0) {
      return;
    }

    let emissionFactor = 0;
    switch (transportationType) {
      case 'car':
        emissionFactor = 0.12; // kg CO2 per km
        break;
      case 'bus':
        emissionFactor = 0.08; // kg CO2 per km
        break;
      case 'train':
        emissionFactor = 0.04; // kg CO2 per km
        break;
      case 'bike':
        emissionFactor = 0; // kg CO2 per km
        break;
      default:
        emissionFactor = 0.12;
    }

    setResult(parseFloat((distanceValue * emissionFactor).toFixed(2)));
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="bg-eco-gradient rounded-t-lg text-white">
        <CardTitle>Carbon Footprint Calculator</CardTitle>
        <CardDescription className="text-white text-opacity-80">Calculate your transportation emissions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transportation-type">Transportation Type</Label>
            <Select value={transportationType} onValueChange={setTransportationType}>
              <SelectTrigger id="transportation-type">
                <SelectValue placeholder="Select transportation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="bike">Bicycle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <Input
              id="distance"
              type="number"
              placeholder="Enter distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleCalculate} 
            className="w-full bg-eco hover:bg-eco-dark text-white"
          >
            Calculate Emissions
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-eco-light rounded-lg border border-eco">
            <p className="text-center">
              <span className="block text-xl font-semibold text-eco-dark">Your Carbon Footprint</span>
              <span className="text-3xl font-bold text-eco">{result} kg</span>
              <span className="block text-sm text-gray-600 mt-2">CO₂ emissions</span>
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                {result === 0 ? (
                  "Fantastic choice! Biking produces zero direct emissions."
                ) : result < 2 ? (
                  "Good job! Your choice has a relatively low carbon impact."
                ) : result < 5 ? (
                  "Consider using public transport when possible to reduce your emissions."
                ) : (
                  "Consider carpooling or public transport to reduce your carbon footprint."
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500">
          These calculations are estimates based on average emission factors.
        </p>
      </CardFooter>
    </Card>
  );
};

export default Calculator;
