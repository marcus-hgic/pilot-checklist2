import { Plane, Settings } from 'lucide-react';
import { Mode } from '../types';

interface Props {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Header({ currentMode, onModeChange }: Props) {
  return (
    <header className="bg-slate-800 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Plane className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Pilot Checklist Trainer</h1>
        </div>
        <nav className="flex space-x-6">
          {(['learn', 'test'] as Mode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`transition-colors capitalize ${
                currentMode === mode
                  ? 'text-blue-400 font-semibold'
                  : 'hover:text-blue-400'
              }`}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={() => onModeChange('admin')}
            className={`transition-colors flex items-center space-x-1 ${
              currentMode === 'admin'
                ? 'text-blue-400 font-semibold'
                : 'hover:text-blue-400'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Admin</span>
          </button>
        </nav>
      </div>
    </header>
  );
}