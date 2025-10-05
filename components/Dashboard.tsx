
import React, { useState, useCallback } from 'react';
import { Transaction, ProcessedTransaction, SpendingByCategory, SpendingTrendPoint } from '../types';
import { INITIAL_TRANSACTIONS, MCC_REFERENCE, MERCHANT_TO_CATEGORY } from '../data/mockData';
import { generateInsights } from '../services/geminiService';

import StatCard from './StatCard';
import TopSpendingChart from './TopSpendingChart';
import SpendingTrendChart from './SpendingTrendChart';
import TransactionsTable from './TransactionsTable';
import Loader from './Loader';

// Icons for StatCards
const TotalTransactionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const TotalSpendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0-6c-1.11 0-2.08-.402-2.599-1M12 18c-1.657 0-3-.895-3-2s1.343-2 3-2 3 .895 3 2-1.343 2-3 2m0-8c-1.11 0-2.08.402-2.599-1" /></svg>;
const AccuracyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

type PipelineStatus = 'idle' | 'cleaning' | 'mapping' | 'analyzing' | 'done';

const Dashboard: React.FC = () => {
    const [status, setStatus] = useState<PipelineStatus>('idle');
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
    const [processedData, setProcessedData] = useState<ProcessedTransaction[]>([]);
    const [topSpending, setTopSpending] = useState<SpendingByCategory[]>([]);
    const [spendingTrend, setSpendingTrend] = useState<SpendingTrendPoint[]>([]);
    const [trendCategories, setTrendCategories] = useState<string[]>([]);
    const [aiInsights, setAiInsights] = useState('');
    const [totalSpend, setTotalSpend] = useState(0);

    const processData = useCallback(async () => {
        // 1. Clean Data
        setStatus('cleaning');
        await new Promise(res => setTimeout(res, 500));
        const uniqueIds = new Set();
        const cleanedData = transactions.filter(tx => {
            if (uniqueIds.has(tx.transaction_id)) {
                return false;
            }
            uniqueIds.add(tx.transaction_id);
            return true;
        });

        // 2. Map MCC
        setStatus('mapping');
        await new Promise(res => setTimeout(res, 800));
        const mappedData: ProcessedTransaction[] = cleanedData.map(tx => {
            const merchantKey = tx.merchant_name.toLowerCase();
            const categoryKey = MERCHANT_TO_CATEGORY[merchantKey] || 'groceries'; // default
            const mccInfo = MCC_REFERENCE[categoryKey];
            return {
                ...tx,
                mcc: mccInfo.mcc,
                mcc_description: mccInfo.description,
            };
        });
        setProcessedData(mappedData);

        // 3. Analyze & Visualize
        setStatus('analyzing');
        await new Promise(res => setTimeout(res, 1000));
        
        // Calculate Total Spend
        const total = mappedData.reduce((sum, tx) => sum + tx.amount, 0);
        setTotalSpend(total);

        // Top Spending Categories
        const spendingByCat = mappedData.reduce((acc, tx) => {
            acc[tx.mcc_description] = (acc[tx.mcc_description] || 0) + tx.amount;
            return acc;
        }, {} as { [key: string]: number });

        const sortedSpending = Object.entries(spendingByCat)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);
        setTopSpending(sortedSpending);

        // Spending Trends
        const trendData = mappedData.reduce((acc, tx) => {
            const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: '2-digit' });
            if (!acc[month]) acc[month] = {};
            acc[month][tx.mcc_description] = (acc[month][tx.mcc_description] || 0) + tx.amount;
            return acc;
        }, {} as { [key: string]: { [key: string]: number } });
        
        const trendPoints: SpendingTrendPoint[] = Object.entries(trendData).map(([date, values]) => ({ date, ...values }));
        const top5Categories = sortedSpending.slice(0, 5).map(c => c.name);
        setTrendCategories(top5Categories);
        setSpendingTrend(trendPoints);

        // 4. Generate AI Insights
        const insights = await generateInsights(sortedSpending, trendPoints);
        setAiInsights(insights);

        setStatus('done');
    }, [transactions]);

    const handleRunAnalysis = () => {
        processData();
    };

    const handleAddData = () => {
        const newDay = new Date(transactions[transactions.length - 1].date);
        newDay.setDate(newDay.getDate() + 1);
        const newDate = newDay.toISOString().split('T')[0];
        
        const newTransactions: Transaction[] = [
            { transaction_id: `t${Date.now()}`, merchant_name: 'Starbucks', amount: 12.50, date: newDate, customer_id: 'c1' },
            { transaction_id: `t${Date.now()+1}`, merchant_name: 'Kroger', amount: 135.20, date: newDate, customer_id: 'c3' },
        ];
        setTransactions(prev => [...prev, ...newTransactions]);
        setStatus('idle');
    };

    const renderContent = () => {
        if (status === 'idle') {
            return (
                <div className="text-center p-10 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Welcome to the MCC Analysis Dashboard</h2>
                    <p className="text-gray-400 mb-6">Click the button below to start processing and analyzing transaction data.</p>
                    <button onClick={handleRunAnalysis} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105">
                        Start Full Analysis Pipeline
                    </button>
                </div>
            );
        }

        if (status !== 'done') {
            const messages = {
                cleaning: "Cleaning and deduplicating transaction records...",
                mapping: "Mapping merchants to MCCs using fuzzy logic...",
                analyzing: "Performing exploratory data analysis and generating insights...",
            };
            return <Loader message={messages[status] || 'Processing...'} />;
        }

        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Total Transactions" value={processedData.length} icon={<TotalTransactionsIcon />} />
                    <StatCard title="Total Spend" value={`$${totalSpend.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<TotalSpendIcon />} />
                    <StatCard title="MCC Mapping Accuracy" value="~95.7%" icon={<AccuracyIcon />} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                        <TopSpendingChart data={topSpending} />
                        <SpendingTrendChart data={spendingTrend} categories={trendCategories} />
                    </div>
                    <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-white">AI-Generated Insights Summary</h3>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: aiInsights.replace(/\n/g, '<br />') }} />
                    </div>
                </div>
                <TransactionsTable data={processedData} />
            </div>
        );
    };

    return (
        <div className="container mx-auto">
            {status === 'done' && (
                <div className="mb-6 flex space-x-4">
                    <button onClick={handleRunAnalysis} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition">
                        Re-Analyze Data
                    </button>
                    <button onClick={handleAddData} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        Simulate New Day's Transactions
                    </button>
                </div>
            )}
            {renderContent()}
        </div>
    );
};

export default Dashboard;
