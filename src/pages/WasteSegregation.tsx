import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const wasteTypes = [
  { label: '♻️ Recyclable', value: 'recyclable' },
  { label: '🍌 Organic', value: 'organic' },
  { label: '☠️ Hazardous', value: 'hazardous' },
  { label: '🚮 Landfill', value: 'landfill' },
];
const wasteMethods = [
  'Composting',
  'Recycling bin',
  'E-waste center',
  'Landfill',
];

function impactSummary(entry: any) {
  let impact = 0;
  if (entry.weight) impact = parseFloat(entry.weight);
  else if (entry.count) impact = parseInt(entry.count) * 0.5;
  else if (entry.volume) impact = parseFloat(entry.volume) * 0.2;
  if (impact > 0) return `Diverted ${impact.toFixed(2)} kg from landfill`;
  return '';
}

const WasteSegregationPage = () => {
  const navigate = useNavigate();
  const [wasteForm, setWasteForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    types: [],
    volume: '',
    weight: '',
    count: '',
    method: '',
    notes: '',
  });
  const [wasteLog, setWasteLog] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ecoWasteLog');
    if (stored) setWasteLog(JSON.parse(stored));
  }, []);

  const handleWasteTypeToggle = (type: string) => {
    setWasteForm((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleWasteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWasteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      ...wasteForm,
      id: Date.now(),
    };
    const updated = [entry, ...wasteLog];
    setWasteLog(updated);
    localStorage.setItem('ecoWasteLog', JSON.stringify(updated));
    setWasteForm({
      date: new Date().toISOString().slice(0, 10),
      types: [],
      volume: '',
      weight: '',
      count: '',
      method: '',
      notes: '',
    });
    // Add to recent actions
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : now.toLocaleDateString();
    const newRecentAction = {
      id: Date.now(),
      action: 'Segregated waste',
      date: dateStr,
      points: 3,
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newRecentAction, ...prev].slice(0, 20)));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/')} className="mb-4 text-eco hover:underline flex items-center">
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-3xl font-bold text-center text-eco-dark mb-6">Waste Segregation Log</h1>
          <form onSubmit={handleWasteSubmit} className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4 mb-10">
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input type="date" name="date" value={wasteForm.date} onChange={handleWasteFormChange} className="border rounded p-2 w-full" required />
            </div>
            <div>
              <label className="block font-medium mb-1">Waste Type</label>
              <div className="flex flex-wrap gap-2">
                {wasteTypes.map((type) => (
                  <button
                    type="button"
                    key={type.value}
                    className={`px-3 py-1 rounded-full border ${wasteForm.types.includes(type.value) ? 'bg-eco text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => handleWasteTypeToggle(type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label className="block font-medium mb-1">Volume (liters)</label>
                <input type="number" name="volume" value={wasteForm.volume} onChange={handleWasteFormChange} className="border rounded p-2 w-full" min="0" step="any" />
              </div>
              <div>
                <label className="block font-medium mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={wasteForm.weight} onChange={handleWasteFormChange} className="border rounded p-2 w-full" min="0" step="any" />
              </div>
              <div>
                <label className="block font-medium mb-1">Count (bags/items)</label>
                <input type="number" name="count" value={wasteForm.count} onChange={handleWasteFormChange} className="border rounded p-2 w-full" min="0" />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Method</label>
              <select name="method" value={wasteForm.method} onChange={handleWasteFormChange} className="border rounded p-2 w-full" required>
                <option value="">Select method</option>
                {wasteMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Notes</label>
              <textarea name="notes" value={wasteForm.notes} onChange={handleWasteFormChange} className="border rounded p-2 w-full" rows={2} placeholder="Composted at home, Dropped off at local center, etc." />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-eco hover:bg-eco-dark text-white">Log Waste</Button>
            </div>
          </form>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Waste Log & History</h2>
            {wasteLog.length === 0 ? (
              <div className="text-gray-400 text-center">No waste entries yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead>
                    <tr className="bg-eco-light text-eco-dark">
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Method</th>
                      <th className="py-2 px-3">Volume (L)</th>
                      <th className="py-2 px-3">Weight (kg)</th>
                      <th className="py-2 px-3">Count</th>
                      <th className="py-2 px-3">Notes</th>
                      <th className="py-2 px-3">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wasteLog.map((entry) => (
                      <tr key={entry.id} className="border-t">
                        <td className="py-1 px-2">{entry.date}</td>
                        <td className="py-1 px-2">{entry.types.map((t: string) => wasteTypes.find(wt => wt.value === t)?.label).join(', ')}</td>
                        <td className="py-1 px-2">{entry.method}</td>
                        <td className="py-1 px-2">{entry.volume}</td>
                        <td className="py-1 px-2">{entry.weight}</td>
                        <td className="py-1 px-2">{entry.count}</td>
                        <td className="py-1 px-2">{entry.notes}</td>
                        <td className="py-1 px-2 text-green-700 font-medium">{impactSummary(entry)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WasteSegregationPage; 