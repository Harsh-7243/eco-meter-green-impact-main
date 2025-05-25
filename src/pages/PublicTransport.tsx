import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bus, Train, TramFront, Ship, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PublicTransportEntry {
  id: string;
  dateTime: string;
  mode: string;
  routeNumber: string;
  startLocation: string;
  destination: string;
  distance: string;
  ticketCost?: string;
  notes?: string;
}

const PT_COUNT_KEY = 'publicTransportCount';

const PublicTransport = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<PublicTransportEntry[]>([]);
  const [formData, setFormData] = useState({
    dateTime: '',
    mode: '',
    routeNumber: '',
    startLocation: '',
    destination: '',
    distance: '',
    ticketCost: '',
    notes: ''
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem(PT_COUNT_KEY)) {
      localStorage.setItem(PT_COUNT_KEY, '0');
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
    const newEntry: PublicTransportEntry = {
      id: Date.now().toString(),
      ...formData
    };
    setEntries(prev => [newEntry, ...prev]);
    // Increment public transport count in localStorage
    const prevCount = parseInt(localStorage.getItem(PT_COUNT_KEY) || '0', 10);
    localStorage.setItem(PT_COUNT_KEY, String(prevCount + 1));

    // Add to recent actions
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : now.toLocaleDateString();
    const newRecentAction = {
      id: Date.now(),
      action: `Used ${formData.mode} for travel`,
      date: dateStr,
      points: 5,
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newRecentAction, ...prev].slice(0, 20)));

    // Reset form
    setFormData({
      dateTime: '',
      mode: '',
      routeNumber: '',
      startLocation: '',
      destination: '',
      distance: '',
      ticketCost: '',
      notes: ''
    });
    toast({
      title: 'Action Recorded! 😊',
      description: 'Your public transport entry has been saved and counted!',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-dark">Public Transport Log</h1>
            <p className="text-gray-600 mt-2">Log your eco-friendly public transport trips</p>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bus className="h-6 w-6 mr-2 text-eco" />
                Add New Public Transport Entry
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
                    <Label htmlFor="mode">Mode of Transport</Label>
                    <Select
                      value={formData.mode}
                      onValueChange={value => handleSelectChange('mode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bus"><span className="flex items-center"><Bus className="h-4 w-4 mr-1" />Bus</span></SelectItem>
                        <SelectItem value="metro"><span className="flex items-center"><Train className="h-4 w-4 mr-1" />Metro</span></SelectItem>
                        <SelectItem value="train"><span className="flex items-center"><Train className="h-4 w-4 mr-1" />Train</span></SelectItem>
                        <SelectItem value="tram"><span className="flex items-center"><TramFront className="h-4 w-4 mr-1" />Tram</span></SelectItem>
                        <SelectItem value="ferry"><span className="flex items-center"><Ship className="h-4 w-4 mr-1" />Ferry</span></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routeNumber">Route/Line Number</Label>
                    <Input
                      id="routeNumber"
                      name="routeNumber"
                      value={formData.routeNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., Bus 102, Metro Blue Line"
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
                    <Label htmlFor="distance">Distance Traveled (km/miles)</Label>
                    <Input
                      id="distance"
                      name="distance"
                      value={formData.distance}
                      onChange={handleInputChange}
                      placeholder="Enter distance"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticketCost">Ticket Cost (optional)</Label>
                    <Input
                      id="ticketCost"
                      name="ticketCost"
                      value={formData.ticketCost}
                      onChange={handleInputChange}
                      placeholder="e.g., 20 INR"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
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
                    Log Trip
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* History Section */}
          <Card>
            <CardHeader>
              <CardTitle>Public Transport History</CardTitle>
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
                        <p className="text-sm text-gray-500">Mode</p>
                        <p className="font-medium capitalize">{entry.mode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Route/Line</p>
                        <p className="font-medium">{entry.routeNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">From → To</p>
                        <p className="font-medium">{entry.startLocation} → {entry.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-medium">{entry.distance}</p>
                      </div>
                      {entry.ticketCost && (
                        <div>
                          <p className="text-sm text-gray-500">Ticket Cost</p>
                          <p className="font-medium">{entry.ticketCost}</p>
                        </div>
                      )}
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
                  <p className="text-center text-gray-500">No public transport entries yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicTransport; 