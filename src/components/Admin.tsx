import { useState } from 'react';
import { Station, Question } from '../types';
import { stations } from '../data/stations';
import { scenarios } from '../data/scenarios';
import { saveData } from '../utils/fileOperations';
import ChecklistEditor from './Admin/ChecklistEditor';
import QuestionEditor from './Admin/QuestionEditor';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'checklists' | 'questions'>('checklists');
  const [stationsData, setStationsData] = useState<Station[]>(stations);
  const [questionsData, setQuestionsData] = useState<Record<string, Question[]>>(scenarios);

  const handleStationSave = async (updatedStations: Station[]) => {
    setStationsData(updatedStations);
    await saveData('stations.json', updatedStations);
  };

  const handleQuestionsSave = async (updatedQuestions: Record<string, Question[]>) => {
    setQuestionsData(updatedQuestions);
    await saveData('scenarios.json', updatedQuestions);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('checklists')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'checklists'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Checklists
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'questions'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Test Questions
          </button>
        </div>

        {activeTab === 'checklists' ? (
          <ChecklistEditor stations={stationsData} onSave={handleStationSave} />
        ) : (
          <QuestionEditor questions={questionsData} onSave={handleQuestionsSave} />
        )}
      </div>
    </div>
  );
}