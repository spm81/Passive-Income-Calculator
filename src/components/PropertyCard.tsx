import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, Home } from 'lucide-react';
import { Property } from '../types';
import { calculateProperty } from '../utils/calculations';

interface PropertyCardProps {
  property: Property;
  onUpdate: (id: string, field: keyof Property, value: string | number) => void;
  onRemove: (id: string) => void;
}

const PropertyCard = ({ property, onUpdate, onRemove }: PropertyCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const calc = calculateProperty(property);

  const handleChange = (field: keyof Property, value: string) => {
    if (field === 'name') {
      onUpdate(property.id, field, value);
    } else {
      onUpdate(property.id, field, parseFloat(value) || 0);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              value={property.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-transparent text-white font-semibold text-lg border-none outline-none focus:bg-white/10 px-2 py-1 rounded"
            />
          </div>
          <button
            onClick={() => onRemove(property.id)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Valor de Compra (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.purchaseValue}
              onChange={(e) => handleChange('purchaseValue', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Valor de Venda (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.saleValue}
              onChange={(e) => handleChange('saleValue', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Renda Mensal (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.rent}
              onChange={(e) => handleChange('rent', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Imposto (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={property.taxPercent}
              onChange={(e) => handleChange('taxPercent', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              IMI Anual (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.imiAnnual}
              onChange={(e) => handleChange('imiAnnual', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Condomínio (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.condo}
              onChange={(e) => handleChange('condo', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Seguro (€)
            </label>
            <input
              type="number"
              min="0"
              value={property.insurance}
              onChange={(e) => handleChange('insurance', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-slate-700 font-medium"
        >\n          <span>Ver Detalhes</span>\n          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {expanded && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-slate-900 mb-3">Valores Mensais</h4>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Renda:</span>
                <span className="font-semibold text-slate-900">{calc.rent.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Imposto:</span>
                <span className="font-semibold text-red-600">-{calc.taxValue.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">IMI Mensal:</span>
                <span className="font-semibold text-slate-900">{calc.imiMonthly.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Despesas:</span>
                <span className="font-semibold text-red-600">-{calc.expenses.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-blue-200">
                <span className="text-slate-700 font-medium">Renda Líquida:</span>
                <span className="font-bold text-green-600">{calc.netRentAfterExpenses.toFixed(2)} €</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-slate-900 mb-3">Valores Anuais</h4>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Renda:</span>
                <span className="font-semibold text-slate-900">{calc.annualRent.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Imposto:</span>
                <span className="font-semibold text-red-600">-{calc.annualTax.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Despesas:</span>
                <span className="font-semibold text-red-600">-{calc.annualExpenses.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-slate-300">
                <span className="text-slate-700 font-medium">Renda Líquida:</span>
                <span className="font-bold text-green-600">{calc.annualNetRentAfterExpenses.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
