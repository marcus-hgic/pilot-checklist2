import { useState } from 'react';
import { Question } from '../../types';
import { PlusCircle, Trash2, Save } from 'lucide-react';

interface Props {
  questions: Record<string, Question[]>;
  onSave: (questions: Record<string, Question[]>) => void;
}

export default function QuestionEditor({ questions, onSave }: Props) {
  const [editableQuestions, setEditableQuestions] = useState<Record<string, Question[]>>(questions);

  const addQuestion = (key: string) => {
    const newQuestion: Question = {
      id: `${key}-${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: '',
    };

    setEditableQuestions(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newQuestion],
    }));
  };

  const updateQuestion = (key: string, questionId: string, field: keyof Question, value: any) => {
    setEditableQuestions(prev => ({
      ...prev,
      [key]: prev[key].map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }));
  };

  const updateOption = (key: string, questionId: string, optionIndex: number, value: string) => {
    setEditableQuestions(prev => ({
      ...prev,
      [key]: prev[key].map(q =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      ),
    }));
  };

  const deleteQuestion = (key: string, questionId: string) => {
    setEditableQuestions(prev => ({
      ...prev,
      [key]: prev[key].filter(q => q.id !== questionId),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Test Questions Editor</h2>
        <button
          onClick={() => onSave(editableQuestions)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {Object.entries(editableQuestions).map(([key, questionList]) => (
        <div key={key} className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Question Set: {key}</h3>
            <button
              onClick={() => addQuestion(key)}
              className="text-blue-500 hover:text-blue-600"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {questionList.map(question => (
              <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={question.question}
                      onChange={e => updateQuestion(key, question.id, 'question', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options
                    </label>
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          checked={idx === question.correctIndex}
                          onChange={() => updateQuestion(key, question.id, 'correctIndex', idx)}
                          className="form-radio"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={e => updateOption(key, question.id, idx, e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder={`Option ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Explanation
                    </label>
                    <textarea
                      value={question.explanation}
                      onChange={e => updateQuestion(key, question.id, 'explanation', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  </div>

                  <button
                    onClick={() => deleteQuestion(key, question.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}