import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Station as StationType, Mode } from '../types';
import TestMode from './TestMode';

interface Props {
  station: StationType;
  mode: Mode;
  completedItems: Set<string>;
  onItemComplete: (stationId: number, itemId: number, correct?: boolean) => void;
}

export default function Station({ station, mode, completedItems, onItemComplete }: Props) {
  const [isExpanded, setIsExpanded] = useState(mode === 'test');

  if (mode === 'test' && station.id === 1) {
    return (
      <TestMode
        onComplete={(correct) => onItemComplete(station.id, 0, correct)}
      />
    );
  }

  if (mode === 'test') {
    return null;
  }

  return (
    <div className="mb-8">
      <button
        className="w-full flex items-center justify-between bg-slate-800 text-white p-4 rounded-lg mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">Station {station.id}: {station.name}</h2>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>
      
      {isExpanded && (
        <div className="space-y-4">
          {station.items.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg mb-2 cursor-pointer transition-all ${
                completedItems.has(`${station.id}-${item.id}`)
                  ? 'bg-green-50 border-green-500'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => onItemComplete(station.id, item.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{item.description}</h3>
                  <p className="text-gray-600 mt-1">{item.checks}</p>
                </div>
                <div className="flex space-x-3 ml-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium mb-1">BFF</span>
                    <div className={`w-6 h-6 rounded-full ${item.BFF ? 'bg-green-500' : 'bg-gray-200'}`} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium mb-1">TA</span>
                    <div className={`w-6 h-6 rounded-full ${item.TA ? 'bg-yellow-500' : 'bg-gray-200'}`} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium mb-1">ALF</span>
                    <div className={`w-6 h-6 rounded-full ${item.ALF ? 'bg-red-500' : 'bg-gray-200'}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}