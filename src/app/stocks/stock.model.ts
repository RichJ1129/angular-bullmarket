export interface Stock {
  stockName: string;
  symbol: string;
  price: Array<number>;
  marketCap: Array<number>;
  closeDate: Array<string>;
  pERatio: Array<number>;
}

export interface Company {
  companyName: string;
  companySymbol: string;
  companyCountry: string;
  companySummary: string;
  companyCurrency: string;
}
