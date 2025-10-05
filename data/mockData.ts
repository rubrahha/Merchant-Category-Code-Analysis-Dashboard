
import { Transaction, MccMap } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { transaction_id: 't001', merchant_name: 'Whole Foods', amount: 85.60, date: '2023-10-01', customer_id: 'c1' },
  { transaction_id: 't002', merchant_name: 'Shell', amount: 55.20, date: '2023-10-02', customer_id: 'c2' },
  { transaction_id: 't003', merchant_name: 'Starbucks', amount: 7.80, date: '2023-10-02', customer_id: 'c1' },
  { transaction_id: 't004', merchant_name: 'Amazon Prime', amount: 14.99, date: '2023-10-03', customer_id: 'c3' },
  { transaction_id: 't005', merchant_name: 'The Cheesecake Factory', amount: 120.50, date: '2023-10-04', customer_id: 'c2' },
  { transaction_id: 't006', merchant_name: 'Kroger', amount: 150.10, date: '2023-10-05', customer_id: 'c3' },
  { transaction_id: 't007', merchant_name: 'Delta Airlines', amount: 450.00, date: '2023-10-06', customer_id: 'c1' },
  { transaction_id: 't008', merchant_name: 'Walmart Supercenter', amount: 210.30, date: '2023-11-01', customer_id: 'c2' },
  { transaction_id: 't009', merchant_name: 'ExxonMobil', amount: 62.00, date: '2023-11-03', customer_id: 'c1' },
  { transaction_id: 't010', merchant_name: 'Netflix', amount: 19.99, date: '2023-11-05', customer_id: 'c3' },
  { transaction_id: 't011', merchant_name: 'Chipotle', amount: 25.40, date: '2023-11-07', customer_id: 'c2' },
  { transaction_id: 't012', merchant_name: 'Safeway', amount: 95.75, date: '2023-11-10', customer_id: 'c1' },
  { transaction_id: 't013', merchant_name: 'United Airlines', amount: 320.00, date: '2023-11-15', customer_id: 'c3' },
  { transaction_id: 't014', merchant_name: 'Best Buy', amount: 299.99, date: '2023-12-01', customer_id: 'c1' },
  { transaction_id: 't015', merchant_name: 'Home Depot', amount: 180.25, date: '2023-12-05', customer_id: 'c2' },
  { transaction_id: 't016', merchant_name: 'Target', amount: 112.50, date: '2023-12-10', customer_id: 'c3' },
  { transaction_id: 't017', merchant_name: 'Costco', amount: 350.00, date: '2023-12-15', customer_id: 'c1' },
  { transaction_id: 't018', merchant_name: "McDonald's", amount: 12.75, date: '2023-12-20', customer_id: 'c2' },
  { transaction_id: 't018', merchant_name: "McDonald's", amount: 12.75, date: '2023-12-20', customer_id: 'c2' }, // Duplicate for cleaning
];

export const MCC_REFERENCE: MccMap = {
  'groceries': { mcc: '5411', description: 'Grocery Stores, Supermarkets' },
  'gas': { mcc: '5541', description: 'Service Stations' },
  'dining': { mcc: '5812', description: 'Eating Places, Restaurants' },
  'subscription': { mcc: '5968', description: 'Direct Marketing - Subscription' },
  'travel': { mcc: '4511', description: 'Airlines' },
  'electronics': { mcc: '5732', description: 'Electronics Stores' },
  'home_improvement': { mcc: '5200', description: 'Home Supply Warehouse Stores' },
  'department_store': { mcc: '5311', description: 'Department Stores' },
  'fast_food': { mcc: '5814', description: 'Fast Food Restaurants' },
};

// Simplified mapping for simulation
export const MERCHANT_TO_CATEGORY: { [key: string]: keyof typeof MCC_REFERENCE } = {
  'whole foods': 'groceries',
  'kroger': 'groceries',
  'safeway': 'groceries',
  'costco': 'groceries',
  'shell': 'gas',
  'exxonmobil': 'gas',
  'starbucks': 'dining',
  'the cheesecake factory': 'dining',
  'chipotle': 'dining',
  'amazon prime': 'subscription',
  'netflix': 'subscription',
  'delta airlines': 'travel',
  'united airlines': 'travel',
  'best buy': 'electronics',
  'home depot': 'home_improvement',
  'walmart supercenter': 'department_store',
  'target': 'department_store',
  "mcdonald's": 'fast_food',
};
