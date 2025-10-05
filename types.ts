
export interface Transaction {
  transaction_id: string;
  merchant_name: string;
  amount: number;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  customer_id: string;
}

export interface MccMap {
  [key: string]: {
    mcc: string;
    description: string;
  };
}

export interface ProcessedTransaction extends Transaction {
  mcc: string;
  mcc_description: string;
}

export interface SpendingByCategory {
  name: string;
  total: number;
}

export interface SpendingTrendPoint {
    date: string;
    [key: string]: number | string; // e.g. { date: 'Jan', 'Groceries': 4000, 'Dining': 2400 }
}
