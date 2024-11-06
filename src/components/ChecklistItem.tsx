import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { ChecklistItem as ChecklistItemType, Mode } from '../types';
import TestMode from './TestMode';

interface Props {
  item: ChecklistItemType;
  mode: Mode;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  stationId: number;
}

export default function ChecklistItem({ item, mode, isActive, isCompleted, onClick, stationId }: Props) {
  if (mode === 'test' && isActive && !isCompleted) {
    return (
      <div className="mb-4">
        <TestMode
          stationId={stationId}
          itemId={item.id}
          onComplete={(correct) => {
            if (correct) onClick();
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`p-4 border rounded-lg mb-2 cursor-pointer transition-all ${
        isCompleted
          ? 'bg-green-50 border-green-500'
          : isActive
          ? 'bg-blue-50 border-blue-500 shadow-md'
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{item.description}</h3>
          {(mode === 'learn' || isCompleted || isActive) && (
            <p className="text-gray-600 mt-1">{item.checks}</p>
          )}
        </div>
        {(mode === 'learn' || isCompleted || isActive) && (
          <div className="flex space-x-3 ml-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium mb-1">BFF</span>
              {item.BFF ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium mb-1">TA</span>
              {item.TA ? (
                <CheckCircle2 className="w-6 h-6 text-yellow-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium mb-1">ALF</span>
              {item.ALF ? (
                <AlertCircle className="w-6 h-6 text-red-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}