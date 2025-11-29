export interface Property {
  id: string;
  name: string;
  purchaseValue: number;
  saleValue: number;
  rent: number;
  taxPercent: number;
  imiAnnual: number;
  condo: number;
  insurance: number;
}

export interface ExtraExpense {
  name: string;
  monthlyValue: number;
  annualValue: number;
}

export interface PropertyCalculations {
  rent: number;
  taxValue: number;
  imiMonthly: number;
  expenses: number;
  netRent: number;
  netRentAfterExpenses: number;
  annualRent: number;
  annualTax: number;
  annualExpenses: number;
  annualNetRent: number;
  annualNetRentAfterExpenses: number;
}
