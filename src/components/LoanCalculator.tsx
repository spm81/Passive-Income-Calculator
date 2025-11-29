import { useState } from 'react';
import { Calculator, Percent } from 'lucide-react';
import { Property, ExtraExpense } from '../types';
import { calculateWithExtraExpenses } from '../utils/calculations';

interface LoanCalculatorProps {
  properties: Property[];
  extraExpenses: ExtraExpense[];
}

const LoanCalculator = ({ properties, extraExpenses }: LoanCalculatorProps) => {
  const [loanPayment, setLoanPayment] = useState('');
  const [calculated, setCalculated] = useState(false);

  const totals = calculateWithExtraExpenses(properties, extraExpenses);

  const handleCalculate = () => {
    const payment = parseFloat(loanPayment);
    if (isNaN(payment) || payment <= 0) {
      alert('Insira um valor válido de prestação mensal.');
      return;
    }
    if (totals.monthlyNetRent <= 0) {
      alert('Calcule primeiro a renda líquida mensal total.');
      return;
    }
    setCalculated(true);
  };

  const payment = parseFloat(loanPayment) || 0;
  const effortRate = totals.monthlyNetRent > 0 ? (payment / totals.monthlyNetRent) * 100 : 0;
  const remainingMonthly = totals.monthlyNetRent - payment;
  const remainingAnnual = remainingMonthly * 12;
  const finalMonthly = totals.finalMonthlyNetRent - payment;
  const finalAnnual = finalMonthly * 12;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900">Cálculo de Empréstimo</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prestação Mensal (€)
          </label>
          <input
            type="number"
            placeholder="Digite o valor da prestação"
            value={loanPayment}
            onChange={(e) => {
              setLoanPayment(e.target.value);
              setCalculated(false);
            }}
            min="0"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular Taxa de Esforço
        </button>

        {calculated && payment > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Taxa de Esforço</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{effortRate.toFixed(2)}%</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Renda após Empréstimo</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Mensal:</span>
                  <span className="font-bold text-green-600">{remainingMonthly.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Anual:</span>
                  <span className="font-bold text-green-600">{remainingAnnual.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Renda Final (após todas despesas)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Mensal:</span>
                  <span className="font-bold text-emerald-600">{finalMonthly.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Anual:</span>
                  <span className="font-bold text-emerald-600">{finalAnnual.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
