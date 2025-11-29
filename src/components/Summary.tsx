import { TrendingUp, DollarSign, FileText, PiggyBank } from 'lucide-react';
import { Property, ExtraExpense } from '../types';
import { calculateWithExtraExpenses } from '../utils/calculations';

interface SummaryProps {
  properties: Property[];
  extraExpenses: ExtraExpense[];
}

const Summary = ({ properties, extraExpenses }: SummaryProps) => {
  const totals = calculateWithExtraExpenses(properties, extraExpenses);

  const StatCard = ({
    icon: Icon,
    label,
    monthly,
    annual,
    color
  }: {
    icon: typeof TrendingUp;
    label: string;
    monthly: number;
    annual: number;
    color: string;
  }) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-lg">{label}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{monthly.toFixed(2)} €</p>
        <p className="text-white/80 text-sm">Mensal</p>
        <p className="text-lg font-semibold mt-2">{annual.toFixed(2)} €</p>
        <p className="text-white/80 text-sm">Anual</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        Resumo Geral
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={DollarSign}
          label="Rendas Totais"
          monthly={totals.monthlyRent}
          annual={totals.annualRent}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          icon={FileText}
          label="Impostos"
          monthly={totals.monthlyTax}
          annual={totals.annualTax}
          color="from-red-500 to-red-600"
        />
        <StatCard
          icon={FileText}
          label="Despesas Totais"
          monthly={totals.totalMonthlyExpenses}
          annual={totals.totalAnnualExpenses}
          color="from-orange-500 to-orange-600"
        />
        <StatCard
          icon={PiggyBank}
          label="Renda Líquida Final"
          monthly={totals.finalMonthlyNetRent}
          annual={totals.finalAnnualNetRent}
          color="from-green-500 to-green-600"
        />
      </div>

      {extraExpenses.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Despesas Extras Incluídas</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600">Despesas Extras Mensais:</p>
              <p className="font-bold text-slate-900">{totals.extraMonthly.toFixed(2)} €</p>
            </div>
            <div>
              <p className="text-slate-600">Despesas Extras Anuais:</p>
              <p className="font-bold text-slate-900">{totals.extraAnnual.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
