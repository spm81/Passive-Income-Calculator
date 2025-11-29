import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Home, Plus, Trash2, Save, Download, Camera } from 'lucide-react';
import PropertyCard from './components/PropertyCard';
import Summary from './components/Summary';
import ExtraExpenses from './components/ExtraExpenses';
import LoanCalculator from './components/LoanCalculator';
import { Property, ExtraExpense } from './types';

function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('properties');
    return saved ? JSON.parse(saved) : [];
  });

  const [extraExpenses, setExtraExpenses] = useState<ExtraExpense[]>(() => {
    const saved = localStorage.getItem('extraExpenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('extraExpenses', JSON.stringify(extraExpenses));
  }, [extraExpenses]);

  const addProperty = () => {
    const newProperty: Property = {
      id: Date.now().toString(),
      name: `Imóvel ${properties.length + 1}`,
      purchaseValue: 0,
      saleValue: 0,
      rent: 0,
      taxPercent: 25,
      imiAnnual: 0,
      condo: 0,
      insurance: 0
    };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id: string, field: keyof Property, value: string | number) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const removeProperty = (id: string) => {
    if (confirm('Tem certeza que deseja remover este imóvel?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const addExtraExpense = (expense: ExtraExpense) => {
    const existing = extraExpenses.find(e => e.name === expense.name);
    if (existing) {
      setExtraExpenses(extraExpenses.map(e =>
        e.name === expense.name ? expense : e
      ));
    } else {
      setExtraExpenses([...extraExpenses, expense]);
    }
  };

  const removeExtraExpense = (name: string) => {
    if (confirm('Tem certeza que deseja remover esta despesa?')) {
      setExtraExpenses(extraExpenses.filter(e => e.name !== name));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Calculadora de Renda Passiva</h1>
          <p className="text-slate-600 text-lg">Gerencie seus investimentos imobiliários</p>
        </header>

        <div className="mb-8">
          <button
            onClick={addProperty}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Adicionar Imóvel
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum imóvel cadastrado</h3>
            <p className="text-slate-600 mb-6">Comece adicionando seu primeiro imóvel</p>
            <button
              onClick={addProperty}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Adicionar Primeiro Imóvel
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onUpdate={updateProperty}
                  onRemove={removeProperty}
                />
              ))}
            </div>

            <Summary properties={properties} extraExpenses={extraExpenses} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <ExtraExpenses
                expenses={extraExpenses}
                onAdd={addExtraExpense}
                onRemove={removeExtraExpense}
              />
              <LoanCalculator properties={properties} extraExpenses={extraExpenses} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
