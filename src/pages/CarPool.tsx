import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Download, Car, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';

interface CarPoolEntry {
  id: string;
  dateTime: string;
  driverName: string;
  passengers: number;
  startLocation: string;
  destination: string;
  distance: number;
  vehicleType: string;
  fuelType: string;
  notes?: string;
}

const CARPOOL_COUNT_KEY = 'carPoolCount';

const CarPool = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<CarPoolEntry[]>([]);
  const [formData, setFormData] = useState({
    dateTime: '',
    driverName: '',
    passengers: '',
    startLocation: '',
    destination: '',
    distance: '',
    vehicleType: '',
    fuelType: '',
    notes: ''
  });
  const navigate = useNavigate();

  // On mount, load carpool count from localStorage (for future use if needed)
  React.useEffect(() => {
    if (!localStorage.getItem(CARPOOL_COUNT_KEY)) {
      localStorage.setItem(CARPOOL_COUNT_KEY, '0');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: CarPoolEntry = {
      id: Date.now().toString(),
      ...formData,
      passengers: parseInt(formData.passengers),
      distance: parseFloat(formData.distance)
    };

    setEntries(prev => [newEntry, ...prev]);
    
    // Increment car pool count in localStorage
    const prevCount = parseInt(localStorage.getItem(CARPOOL_COUNT_KEY) || '0', 10);
    localStorage.setItem(CARPOOL_COUNT_KEY, String(prevCount + 1));

    // Add to recent actions
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : now.toLocaleDateString();
    const newRecentAction = {
      id: Date.now(),
      action: `Carpooled with ${formData.passengers} passengers`,
      date: dateStr,
      points: 5,
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newRecentAction, ...prev].slice(0, 20)));

    // Reset form
    setFormData({
      dateTime: '',
      driverName: '',
      passengers: '',
      startLocation: '',
      destination: '',
      distance: '',
      vehicleType: '',
      fuelType: '',
      notes: ''
    });

    toast({
      title: 'Action Recorded! 😊',
      description: 'Your carpool entry has been saved and counted!',
    });
  };

  const CarPoolPDF = () => (
    <div>
      <h1>Carpool History</h1>
      {entries.map(entry => (
        <div key={entry.id}>
          <p>Date: {entry.dateTime}</p>
          <p>Driver: {entry.driverName}</p>
          <p>Passengers: {entry.passengers}</p>
          <p>Route: {entry.startLocation} to {entry.destination}</p>
          <p>Distance: {entry.distance} km</p>
          <p>Vehicle: {entry.vehicleType}</p>
          <p>Fuel: {entry.fuelType}</p>
          {entry.notes && <p>Notes: {entry.notes}</p>}
          <hr />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-dark">Carpool Management</h1>
            <p className="text-gray-600 mt-2">Track your carpooling activities and reduce carbon emissions</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-6 w-6 mr-2 text-eco" />
                Add New Carpool Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateTime">Date & Time</Label>
                    <Input
                      id="dateTime"
                      name="dateTime"
                      type="datetime-local"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input
                      id="driverName"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Input
                      id="passengers"
                      name="passengers"
                      type="number"
                      min="1"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startLocation">Start Location</Label>
                    <Input
                      id="startLocation"
                      name="startLocation"
                      value={formData.startLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (km)</Label>
                    <Input
                      id="distance"
                      name="distance"
                      type="number"
                      step="0.1"
                      value={formData.distance}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => handleSelectChange('vehicleType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="ev">Electric Vehicle</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) => handleSelectChange('fuelType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes or Purpose (optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-eco hover:bg-eco-dark">
                    Save Entry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Carpool History</CardTitle>
              <PDFDownloadLink
                document={<CarPoolPDF />}
                fileName={`carpool-history-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? 'Generating PDF...' : 'Export PDF'}
                  </Button>
                )}
              </PDFDownloadLink>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.map(entry => (
                  <Card key={entry.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-medium">{entry.dateTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Driver</p>
                        <p className="font-medium">{entry.driverName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-medium">{entry.startLocation} → {entry.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Details</p>
                        <p className="font-medium">
                          {entry.passengers} passengers • {entry.distance} km
                        </p>
                        <p className="text-sm">
                          {entry.vehicleType} • {entry.fuelType}
                        </p>
                      </div>
                      {entry.notes && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="text-sm">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                {entries.length === 0 && (
                  <p className="text-center text-gray-500">No carpool entries yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarPool; 