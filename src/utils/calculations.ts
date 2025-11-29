import { Property, PropertyCalculations, ExtraExpense } from '../types';

export const calculateProperty = (property: Property): PropertyCalculations => {
  const rent = property.rent || 0;
  const taxPercent = property.taxPercent ?? 25;
  const taxValue = rent * (taxPercent / 100);
  const imiMonthly = (property.imiAnnual || 0) / 12;
  const expenses = (property.condo || 0) + (property.insurance || 0) + imiMonthly;
  const netRent = rent - taxValue;
  const netRentAfterExpenses = netRent - expenses;

  return {
    rent,
    taxValue,
    imiMonthly,
    expenses,
    netRent,
    netRentAfterExpenses,
    annualRent: rent * 12,
    annualTax: taxValue * 12,
    annualExpenses: expenses * 12,
    annualNetRent: netRent * 12,
    annualNetRentAfterExpenses: netRentAfterExpenses * 12
  };
};

export const calculateTotals = (properties: Property[]) => {
  const totals = {
    monthlyRent: 0,
    monthlyTax: 0,
    monthlyExpenses: 0,
    monthlyNetRent: 0,
    monthlyNetRentAfterExpenses: 0,
    annualRent: 0,
    annualTax: 0,
    annualExpenses: 0,
    annualNetRent: 0,
    annualNetRentAfterExpenses: 0
  };

  properties.forEach(property => {
    const calc = calculateProperty(property);
    totals.monthlyRent += calc.rent;
    totals.monthlyTax += calc.taxValue;
    totals.monthlyExpenses += calc.expenses;
    totals.monthlyNetRent += calc.netRent;
    totals.monthlyNetRentAfterExpenses += calc.netRentAfterExpenses;
  });

  totals.annualRent = totals.monthlyRent * 12;
  totals.annualTax = totals.monthlyTax * 12;
  totals.annualExpenses = totals.monthlyExpenses * 12;
  totals.annualNetRent = totals.monthlyNetRent * 12;
  totals.annualNetRentAfterExpenses = totals.monthlyNetRentAfterExpenses * 12;

  return totals;
};

export const calculateWithExtraExpenses = (
  properties: Property[],
  extraExpenses: ExtraExpense[]
) => {
  const baseTotals = calculateTotals(properties);

  const extraMonthly = extraExpenses.reduce((sum, e) => sum + e.monthlyValue, 0);
  const extraAnnual = extraExpenses.reduce((sum, e) => sum + e.annualValue, 0);

  return {
    ...baseTotals,
    extraMonthly,
    extraAnnual,
    totalMonthlyExpenses: baseTotals.monthlyExpenses + extraMonthly,
    totalAnnualExpenses: baseTotals.annualExpenses + extraAnnual,
    finalMonthlyNetRent: baseTotals.monthlyNetRent - extraMonthly,
    finalAnnualNetRent: baseTotals.annualNetRent - extraAnnual
  };
};
