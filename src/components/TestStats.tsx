import { TestStats as TestStatsType } from '../types';

interface Props {
  stats: TestStatsType;
}

export default function TestProgress({ stats }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Progress</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Questions</p>
          <p className="text-2xl font-bold text-blue-800">
            {stats.answeredQuestions}/{stats.totalQuestions}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Correct</p>
          <p className="text-2xl font-bold text-green-800">{stats.correctAnswers}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Wrong</p>
          <p className="text-2xl font-bold text-red-800">{stats.wrongAnswers}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Score</p>
          <p className="text-2xl font-bold text-purple-800">{stats.correctPercentage}%</p>
        </div>
      </div>
    </div>
  );
}