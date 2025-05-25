import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Bus, Leaf, Trash, Lightbulb, Calculator, Droplet, Sun, Users, ShoppingBag, Hammer, Bird, Bike, Monitor, RefreshCw, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface ActionStats {
  carbonFootprint: number;
  carPool: number;
  publicTransport: number;
  treesPlanted: number;
  wasteSegregated: number;
  energySaved: number;
  mentalExercise: number;
}

const moreActions = [
  {
    title: "Rainwater Harvesting",
    icon: <Droplet size={28} className="text-blue-500" />,
    description: "Collect and use rainwater for gardening or cleaning."
  },
  {
    title: "Solar Panel Usage",
    icon: <Sun size={28} className="text-yellow-500" />,
    description: "Generate clean energy with solar panels at home."
  },
  {
    title: "Community Clean-up",
    icon: <Users size={28} className="text-eco" />,
    description: "Participate in or organize a local clean-up event."
  },
  {
    title: "Eco-friendly Product Purchase",
    icon: <ShoppingBag size={28} className="text-green-600" />,
    description: "Choose products with minimal packaging or made from recycled materials."
  },
  {
    title: "Upcycling/DIY Projects",
    icon: <Hammer size={28} className="text-orange-500" />,
    description: "Repurpose old items into something useful or beautiful."
  },
  {
    title: "Wildlife Support",
    icon: <Bird size={28} className="text-amber-600" />,
    description: "Install bird feeders, bee hotels, or plant pollinator-friendly flowers."
  },
  {
    title: "Car-Free Day",
    icon: <Bike size={28} className="text-blue-700" />,
    description: "Go a day without using a car to reduce emissions."
  },
  {
    title: "Digital Declutter",
    icon: <Monitor size={28} className="text-gray-600" />,
    description: "Delete unused files and emails to reduce e-waste and energy use."
  },
  {
    title: "Water Bottle Refill",
    icon: <RefreshCw size={28} className="text-blue-400" />,
    description: "Refill a reusable water bottle instead of buying new plastic ones."
  },
  {
    title: "Home Energy Audit",
    icon: <Home size={28} className="text-eco-dark" />,
    description: "Check your home for energy leaks and improve efficiency."
  }
];

const QuickActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ActionStats>({
    carbonFootprint: 0,
    carPool: 0,
    publicTransport: 0,
    treesPlanted: 0,
    wasteSegregated: 0,
    energySaved: 0,
    mentalExercise: 0,
  });
  const [showAllActions, setShowAllActions] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showWasteModal, setShowWasteModal] = useState(false);
  const [wasteForm, setWasteForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    types: [],
    volume: '',
    weight: '',
    count: '',
    method: '',
    notes: '',
  });
  const [wasteLog, setWasteLog] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('ecoWasteLog');
    if (stored) setWasteLog(JSON.parse(stored));
  }, []);

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

  const handleWasteTypeToggle = (type) => {
    setWasteForm((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleWasteFormChange = (e) => {
    const { name, value } = e.target;
    setWasteForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWasteSubmit = (e) => {
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
    setShowWasteModal(false);
    toast({
      title: 'Waste Logged!',
      description: 'Your waste segregation entry has been saved.',
    });
  };

  const logActivity = (action: keyof ActionStats) => {
    setStats((prev) => ({
      ...prev,
      [action]: prev[action] + 1,
    }));
    const messages: Record<keyof ActionStats, string> = {
      carbonFootprint: "Carbon footprint calculated!",
      carPool: "Great job carpooling! 🚗 You saved 2.5kg of CO2 emissions",
      publicTransport: "You chose public transport! 🚌 Saved 2.8kg of CO2 emissions",
      treesPlanted: "You planted a tree! 🌱 It will absorb ~25kg of CO2 annually",
      wasteSegregated: "Waste properly segregated! ♻️ Thank you for recycling",
      energySaved: "Energy efficient choice! 💡 Saved 5 kWh of electricity",
      mentalExercise: "Mental wellness exercise logged! 🧘 Great for your wellbeing",
    };
    const pointsMap: Record<keyof ActionStats, number> = {
      carbonFootprint: 2,
      carPool: 5,
      publicTransport: 5,
      treesPlanted: 20,
      wasteSegregated: 3,
      energySaved: 3,
      mentalExercise: 10,
    };
    const actionNames: Record<keyof ActionStats, string> = {
      carbonFootprint: "Completed carbon footprint calculation",
      carPool: "Car pooled",
      publicTransport: "Used public transport",
      treesPlanted: "Planted a tree",
      wasteSegregated: "Segregated waste",
      energySaved: "Saved energy",
      mentalExercise: "Completed mental exercise",
    };
    const now = new Date();
    const dateStr = now.toLocaleDateString() === new Date().toLocaleDateString() ? "Today" : now.toLocaleDateString();
    const newEntry = {
      id: Date.now(),
      action: actionNames[action],
      date: dateStr,
      points: pointsMap[action],
    };
    const prev = JSON.parse(localStorage.getItem('ecoRecentActions') || '[]');
    localStorage.setItem('ecoRecentActions', JSON.stringify([newEntry, ...prev].slice(0, 20)));
    toast({
      title: "Action Recorded!",
      description: messages[action],
    });
  };

  const handleActionClick = (action: keyof ActionStats) => {
    logActivity(action);
  };

  const ActionCard = ({ title, icon, action, isLink = false, to = "", onClick }: { 
    title: string; 
    icon: React.ReactNode; 
    action: keyof ActionStats;
    isLink?: boolean;
    to?: string;
    onClick?: () => void;
  }) => {
    const content = (
      <div className="text-eco mb-3 text-3xl">{icon}</div>
    );

    if (isLink) {
      return (
        <Card className="eco-card hover:shadow-lg transition-all duration-300">
          <Link
            to={to}
            onClick={onClick}
          >
            <CardContent className="p-4 flex flex-col items-center cursor-pointer">
              {content}
              <h3 className="font-medium text-gray-800">{title}</h3>
            </CardContent>
          </Link>
        </Card>
      );
    }

    return (
      <Card 
        className="eco-card hover:shadow-lg transition-all duration-300" 
        onClick={onClick}
      >
        <CardContent className="p-4 flex flex-col items-center">
          {content}
          <h3 className="font-medium text-gray-800">{title}</h3>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <ActionCard 
            title="Carbon Footprint" 
            icon={<Calculator size={36} />} 
            action="carbonFootprint" 
            isLink={true}
            to="/calculator"
          />
          <ActionCard 
            title="Car Pool" 
            icon={<Car size={36} />} 
            action="carPool"
            isLink={true}
            to="/carpool"
          />
          <ActionCard 
            title="Public Transport" 
            icon={<Bus size={36} />} 
            action="publicTransport"
            isLink={true}
            to="/public-transport"
          />
          <ActionCard 
            title="Plant a Tree" 
            icon={<Leaf size={36} />} 
            action="treesPlanted"
            isLink={true}
            to="/plant-tree"
          />
          <ActionCard 
            title="Waste Segregation" 
            icon={<Trash size={36} />} 
            action="wasteSegregated" 
            isLink={true}
            to="/waste-segregation"
            onClick={() => navigate('/waste-segregation')}
          />
          <ActionCard 
            title="Energy Saved" 
            icon={<Lightbulb size={36} />} 
            action="energySaved" 
            isLink={true}
            to="/energy-saving"
          />
          <ActionCard 
            title="Mental Exercise" 
            icon={<span role="img" aria-label="yoga">🧘</span>} 
            action="mentalExercise"
            isLink={true}
            to="/yoga"
          />
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-eco hover:bg-eco-dark text-white px-6" onClick={() => setShowAllActions(true)}>
            View All Actions
          </Button>
        </div>

        {showAllActions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-[90%] max-h-[80vh] relative animate-fade-in overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-eco-dark">More Eco Actions</h3>
                <button
                  className="text-gray-400 hover:text-eco text-xl font-bold"
                  onClick={() => setShowAllActions(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {moreActions.map((action, idx) => (
                    <Card
                      key={idx}
                      className="eco-card hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                      onClick={() => setSelectedAction(action)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-eco text-2xl mt-1">{action.icon}</div>
                          <div>
                            <h3 className="font-medium text-gray-800 mb-1">{action.title}</h3>
                            <p className="text-gray-600 text-sm">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            {/* Popup for selected action */}
            {selectedAction && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-[90%] relative animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-eco-dark">Action Details</h3>
                    <button
                      className="text-gray-400 hover:text-eco text-xl font-bold"
                      onClick={() => setSelectedAction(null)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-4xl">{selectedAction.icon}</div>
                    <h3 className="font-bold text-xl text-eco-dark mb-2 text-center">{selectedAction.title}</h3>
                    <p className="text-gray-700 text-center mb-4">{selectedAction.description}</p>
                    <Button 
                      className="bg-eco hover:bg-eco-dark text-white"
                      onClick={() => {
                        setSelectedAction(null);
                        setShowAllActions(false);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showWasteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-eco text-2xl font-bold"
                onClick={() => setShowWasteModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold text-eco-dark mb-4">Daily Waste Logging</h3>
              <form onSubmit={handleWasteSubmit} className="space-y-4">
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
              <div className="mt-8">
                <h4 className="text-lg font-bold mb-2">Waste Log & History</h4>
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
                            <td className="py-1 px-2">{entry.types.map((t) => wasteTypes.find(wt => wt.value === t)?.label).join(', ')}</td>
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
          </div>
        )}
      </div>
    </div>
  );
};

function impactSummary(entry) {
  // Example: "Diverted 1.2 kg from landfill"
  let impact = 0;
  if (entry.weight) impact = parseFloat(entry.weight);
  else if (entry.count) impact = parseInt(entry.count) * 0.5; // assume 0.5kg per bag/item
  else if (entry.volume) impact = parseFloat(entry.volume) * 0.2; // assume 0.2kg per liter
  if (impact > 0) return `Diverted ${impact.toFixed(2)} kg from landfill`;
  return '';
}

export default QuickActions;
