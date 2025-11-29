import { useState } from 'react';
import { Plus, Trash2, Receipt } from 'lucide-react';
import { ExtraExpense } from '../types';

interface ExtraExpensesProps {
  expenses: ExtraExpense[];
  onAdd: (expense: ExtraExpense) => void;
  onRemove: (name: string) => void;
}

const ExtraExpenses = ({ expenses, onAdd, onRemove }: ExtraExpensesProps) => {
  const [name, setName] = useState('');
  const [monthlyValue, setMonthlyValue] = useState('');
  const [annualValue, setAnnualValue] = useState('');

  const handleAddMonthly = () => {
    if (!name.trim() || !monthlyValue) {
      alert('Insira um nome e valor válidos.');
      return;
    }
    const monthly = parseFloat(monthlyValue);
    if (monthly < 0) {
      alert('O valor deve ser positivo.');
      return;
    }
    onAdd({
      name: name.trim(),
      monthlyValue: monthly,
      annualValue: monthly * 12
    });
    setName('');
    setMonthlyValue('');
  };

  const handleAddAnnual = () => {
    if (!name.trim() || !annualValue) {
      alert('Insira um nome e valor válidos.');
      return;
    }
    const annual = parseFloat(annualValue);
    if (annual < 0) {
      alert('O valor deve ser positivo.');
      return;
    }
    onAdd({
      name: name.trim(),
      monthlyValue: annual / 12,
      annualValue: annual
    });
    setName('');
    setAnnualValue('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900">Despesas Extras</h2>
      </div>

      <div className="space-y-4 mb-6">
        {expenses.map((expense) => (
          <div
            key={expense.name}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <div>
              <p className="font-medium text-slate-900">{expense.name}</p>
              <p className="text-sm text-slate-600">
                {expense.monthlyValue.toFixed(2)} € / mês | {expense.annualValue.toFixed(2)} € / ano
              </p>
            </div>
            <button
              onClick={() => onRemove(expense.name)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-slate-500 py-4">Nenhuma despesa extra cadastrada</p>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-200">
        <input
          type="text"
          placeholder="Nome da despesa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Valor mensal (€)"
              value={monthlyValue}
              onChange={(e) => setMonthlyValue(e.target.value)}
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={handleAddMonthly}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Mensal
            </button>
          </div>

          <div>
            <input
              type="number"
              placeholder="Valor anual (€)"
              value={annualValue}
              onChange={(e) => setAnnualValue(e.target.value)}
              min="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              onClick={handleAddAnnual}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Anual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraExpenses;
