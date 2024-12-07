import { DollarSign, TrendingUp } from 'lucide-react';

export function ExpenseSummary({ data }) {
  const total = data.values.reduce((acc, curr) => acc + curr, 0);
  const colors = [
    'bg-indigo-100 text-indigo-600',
    'bg-rose-100 text-rose-600',
    'bg-yellow-100 text-yellow-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-sky-100 text-sky-600',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2 opacity-90">
          <TrendingUp className="w-5 h-5" />
          <h3 className="text-sm font-medium">Total Monthly Expenses</h3>
        </div>
        <p className="text-3xl font-bold">${total.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
        <div className="grid gap-4">
          {data.labels.map((label, index) => {
            const percentage = ((data.values[index] / total) * 100).toFixed(1);
            return (
              <div key={label} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${colors[index].split(' ')[0]}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-semibold">${data.values[index].toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors[index].replace('100', '500')}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
