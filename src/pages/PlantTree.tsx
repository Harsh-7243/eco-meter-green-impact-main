import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TreeLogEntry {
  id: string;
  date: string;
  species: string;
  location: string;
  type: string;
  number: number;
  photo?: string;
  notes?: string;
}

const TREE_TYPES = [
  'Personal',
  'Community Event',
  'NGO',
  'Virtual (Donation)'
];

const COMMON_SPECIES = [
  'Neem',
  'Peepal',
  'Banyan',
  'Mango',
  'Ashoka',
  'Other'
];

const carbonCapturePerTree = 25; // kg CO2/year

const PlantTree = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<TreeLogEntry[]>([]);
  const [formData, setFormData] = useState({
    date: '',
    species: '',
    location: '',
    type: '',
    number: '',
    photo: '',
    notes: ''
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      ...formData,
      id: Date.now().toString(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('ecoTreesPlanted', JSON.stringify(updated));

    // Add to recent actions
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : now.toLocaleDateString();
    const newRecentAction = {
      id: Date.now(),
      action: `Planted a ${formData.type} tree`,
      date: dateStr,
      points: 20,
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newRecentAction, ...prev].slice(0, 20)));

    setFormData({
      date: new Date().toISOString().slice(0, 10),
      species: '',
      location: '',
      type: '',
      number: '',
      photo: '',
      notes: ''
    });
    setPhotoPreview(null);
    toast({
      title: 'Action Recorded! 🌳',
      description: 'Your tree planting entry has been saved!',
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
            <h1 className="text-3xl font-bold text-eco-dark">Tree Planting Log</h1>
            <p className="text-gray-600 mt-2">Log your tree planting activities and help the planet!</p>
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-eco" />
                Add New Tree Planting Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date Planted</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="species">Tree Species</Label>
                    <Select
                      value={COMMON_SPECIES.includes(formData.species) ? formData.species : ''}
                      onValueChange={value => handleSelectChange('species', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select species or enter below" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMON_SPECIES.map(species => (
                          <SelectItem key={species} value={species}>{species}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="species"
                      name="species"
                      value={formData.species}
                      onChange={handleInputChange}
                      placeholder="Or enter species manually"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., City Park, GPS, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={value => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TREE_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Number of Trees</Label>
                    <Input
                      id="number"
                      name="number"
                      type="number"
                      min="1"
                      value={formData.number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo Upload</Label>
                    <Input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                      <img src={photoPreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
                    )}
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
                    Save Entry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* Tree Log Display */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-eco-dark flex items-center"><Leaf className="h-5 w-5 mr-2" />Tree Log</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map(entry => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="flex flex-col md:flex-row items-center p-4">
                    {entry.photo ? (
                      <img src={entry.photo} alt="Tree" className="w-24 h-24 object-cover rounded mr-4" />
                    ) : (
                      <div className="w-24 h-24 flex items-center justify-center bg-eco-light rounded mr-4">
                        <ImageIcon className="h-10 w-10 text-eco" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-lg text-eco-dark">{entry.species}</div>
                      <div className="text-gray-700">{entry.location}</div>
                      <div className="text-sm text-gray-500">{entry.date}</div>
                      <div className="text-sm text-gray-700">Type: {entry.type}</div>
                      <div className="text-sm text-gray-700">Number: {entry.number}</div>
                      <div className="text-sm text-green-700 font-semibold">Carbon Capture: ~{entry.number * carbonCapturePerTree} kg CO₂/year</div>
                      {entry.notes && <div className="text-xs text-gray-500 mt-1">{entry.notes}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {entries.length === 0 && (
                <p className="text-center text-gray-500 col-span-2">No tree planting entries yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantTree; 