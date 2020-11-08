export interface Investment {
    userID: string;
    name: string;
    symbol: string;
    shares: number;
    transactionPrice: number;
    transactionType: string;
    assetType: string;
  }