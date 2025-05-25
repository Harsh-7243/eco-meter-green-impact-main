import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Fan, Tv, Computer, Refrigerator, WashingMachine, Microwave, Snowflake } from 'lucide-react';

const energyActions = [
  { label: '💡 Turned off lights', value: 'lights_off', icon: <Lightbulb size={24} />, defaultSavings: 0.1 },
  { label: '❄️ AC temperature adjusted', value: 'ac_adjusted', icon: <Snowflake size={24} />, defaultSavings: 0.5 },
  { label: '🖥️ Computer power saving', value: 'computer_saving', icon: <Computer size={24} />, defaultSavings: 0.2 },
  { label: '📺 TV turned off', value: 'tv_off', icon: <Tv size={24} />, defaultSavings: 0.15 },
  { label: '🧊 Fridge optimization', value: 'fridge_opt', icon: <Refrigerator size={24} />, defaultSavings: 0.3 },
  { label: '🧺 Efficient washing', value: 'washing_opt', icon: <WashingMachine size={24} />, defaultSavings: 0.4 },
  { label: '🍽️ Microwave usage', value: 'microwave', icon: <Microwave size={24} />, defaultSavings: 0.1 },
  { label: '💨 Fan speed adjusted', value: 'fan_adjusted', icon: <Fan size={24} />, defaultSavings: 0.05 },
];

const EnergySavingPage = () => {
  const navigate = useNavigate();
  const [energyForm, setEnergyForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    actionType: '',
    duration: '',
    applianceType: '',
    energySaved: '',
    notes: '',
  });
  const [energyLog, setEnergyLog] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ecoEnergyLog');
    if (stored) setEnergyLog(JSON.parse(stored));
  }, []);

  const handleEnergyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnergyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleActionSelect = (action: typeof energyActions[0]) => {
    setEnergyForm((prev) => ({
      ...prev,
      actionType: action.value,
      applianceType: action.label,
      energySaved: action.defaultSavings.toString(),
    }));
  };

  const handleEnergySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = {
      ...energyForm,
      id: Date.now(),
    };
    const updated = [entry, ...energyLog];
    setEnergyLog(updated);
    localStorage.setItem('ecoEnergyLog', JSON.stringify(updated));
    
    // Add to recent actions
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : now.toLocaleDateString();
    const newRecentAction = {
      id: Date.now(),
      action: `Saved ${energyForm.energySaved} kWh of energy`,
      date: dateStr,
      points: 3,
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newRecentAction, ...prev].slice(0, 20)));

    setEnergyForm({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      actionType: '',
      duration: '',
      applianceType: '',
      energySaved: '',
      notes: '',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <button onClick={() => navigate('/')} className="mb-4 text-eco hover:underline flex items-center">
            <span className="mr-2">←</span> Back
          </button>
          <h1 className="text-3xl font-bold text-center text-eco-dark mb-6">Energy Saving Log</h1>
          
          <form onSubmit={handleEnergySubmit} className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4 mb-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input type="date" name="date" value={energyForm.date} onChange={handleEnergyFormChange} className="border rounded p-2 w-full" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Time</label>
                <input type="time" name="time" value={energyForm.time} onChange={handleEnergyFormChange} className="border rounded p-2 w-full" required />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Action Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {energyActions.map((action) => (
                  <button
                    type="button"
                    key={action.value}
                    className={`p-3 rounded-lg border flex flex-col items-center ${
                      energyForm.actionType === action.value ? 'bg-eco text-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleActionSelect(action)}
                  >
                    <span className="mb-1">{action.icon}</span>
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Duration (hours)</label>
                <input type="number" name="duration" value={energyForm.duration} onChange={handleEnergyFormChange} className="border rounded p-2 w-full" min="0" step="0.5" />
              </div>
              <div>
                <label className="block font-medium mb-1">Energy Saved (kWh)</label>
                <input type="number" name="energySaved" value={energyForm.energySaved} onChange={handleEnergyFormChange} className="border rounded p-2 w-full" min="0" step="0.1" required />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Notes</label>
              <textarea name="notes" value={energyForm.notes} onChange={handleEnergyFormChange} className="border rounded p-2 w-full" rows={2} placeholder="Additional details about your energy saving action..." />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-eco hover:bg-eco-dark text-white">Log Energy Saving</Button>
            </div>
          </form>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Energy Saving History</h2>
            {energyLog.length === 0 ? (
              <div className="text-gray-400 text-center">No energy saving entries yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                  <thead>
                    <tr className="bg-eco-light text-eco-dark">
                      <th className="py-2 px-3">Date & Time</th>
                      <th className="py-2 px-3">Action</th>
                      <th className="py-2 px-3">Duration</th>
                      <th className="py-2 px-3">Energy Saved</th>
                      <th className="py-2 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {energyLog.map((entry) => (
                      <tr key={entry.id} className="border-t">
                        <td className="py-1 px-2">{entry.date} {entry.time}</td>
                        <td className="py-1 px-2">{entry.applianceType}</td>
                        <td className="py-1 px-2">{entry.duration ? `${entry.duration}h` : '-'}</td>
                        <td className="py-1 px-2 text-green-700 font-medium">{entry.energySaved} kWh</td>
                        <td className="py-1 px-2">{entry.notes || '-'}</td>
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

export default EnergySavingPage; 