interface Props {
  current: number;
  total: number;
}

export default function Progress({ current, total }: Props) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <div className="text-sm text-gray-600 mt-1">
        Progress: {current} of {total} items completed ({Math.round(percentage)}%)
      </div>
    </div>
  );
}