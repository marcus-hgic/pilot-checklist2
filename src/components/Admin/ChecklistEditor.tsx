import { useState } from 'react';
import { Station, ChecklistItem } from '../../types';
import { PlusCircle, Trash2, Save } from 'lucide-react';

interface Props {
  stations: Station[];
  onSave: (stations: Station[]) => void;
}

export default function ChecklistEditor({ stations, onSave }: Props) {
  const [editableStations, setEditableStations] = useState<Station[]>(stations);
  const [expandedStationId, setExpandedStationId] = useState<number | null>(null);

  const addStation = () => {
    const newStation: Station = {
      id: Math.max(0, ...editableStations.map(s => s.id)) + 1,
      name: 'New Station',
      items: [],
    };
    setEditableStations([...editableStations, newStation]);
    setExpandedStationId(newStation.id);
  };

  const deleteStation = (stationId: number) => {
    setEditableStations(prev => prev.filter(s => s.id !== stationId));
  };

  const updateStation = (stationId: number, field: keyof Station, value: any) => {
    setEditableStations(prev =>
      prev.map(station =>
        station.id === stationId ? { ...station, [field]: value } : station
      )
    );
  };

  const addItem = (stationId: number) => {
    setEditableStations(prev =>
      prev.map(station => {
        if (station.id === stationId) {
          const newItem: ChecklistItem = {
            id: Math.max(0, ...station.items.map(i => i.id)) + 1,
            description: '',
            checks: '',
            BFF: false,
            TA: false,
            ALF: false,
          };
          return { ...station, items: [...station.items, newItem] };
        }
        return station;
      })
    );
  };

  const updateItem = (stationId: number, itemId: number, field: keyof ChecklistItem, value: any) => {
    setEditableStations(prev =>
      prev.map(station => {
        if (station.id === stationId) {
          return {
            ...station,
            items: station.items.map(item =>
              item.id === itemId ? { ...item, [field]: value } : item
            ),
          };
        }
        return station;
      })
    );
  };

  const deleteItem = (stationId: number, itemId: number) => {
    setEditableStations(prev =>
      prev.map(station => {
        if (station.id === stationId) {
          return {
            ...station,
            items: station.items.filter(item => item.id !== itemId),
          };
        }
        return station;
      })
    );
  };

  const toggleStation = (stationId: number) => {
    setExpandedStationId(expandedStationId === stationId ? null : stationId);
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-white z-10 pb-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Checklist Editor</h2>
          <div className="space-x-4">
            <button
              onClick={addStation}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Station</span>
            </button>
            <button
              onClick={() => onSave(editableStations)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {editableStations.map(station => (
          <div key={station.id} className="border rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleStation(station.id)}
            >
              <input
                type="text"
                value={station.name}
                onChange={e => updateStation(station.id, 'name', e.target.value)}
                className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                onClick={e => e.stopPropagation()}
              />
              <div className="flex space-x-4">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    addItem(station.id);
                  }}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteStation(station.id);
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </button>

            {expandedStationId === station.id && (
              <div className="p-4 space-y-4">
                {station.items.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => updateItem(station.id, item.id, 'description', e.target.value)}
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        value={item.checks}
                        onChange={e => updateItem(station.id, item.id, 'checks', e.target.value)}
                        placeholder="Checks"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.BFF}
                          onChange={e => updateItem(station.id, item.id, 'BFF', e.target.checked)}
                          className="form-checkbox"
                        />
                        <span>BFF</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.TA}
                          onChange={e => updateItem(station.id, item.id, 'TA', e.target.checked)}
                          className="form-checkbox"
                        />
                        <span>TA</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.ALF}
                          onChange={e => updateItem(station.id, item.id, 'ALF', e.target.checked)}
                          className="form-checkbox"
                        />
                        <span>ALF</span>
                      </label>
                      <button
                        onClick={() => deleteItem(station.id, item.id)}
                        className="text-red-500 hover:text-red-600 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}