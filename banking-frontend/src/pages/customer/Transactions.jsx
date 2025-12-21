import { ArrowDownLeft, ArrowUpRight, Filter, Search } from 'lucide-react';
import CustomerLayout from '../../layouts/CustomerLayout';

export default function Transactions() {
    
    const transactions = [
        { id: 1, type: 'sent', name: 'Netflix Subscription', date: 'Oct 24, 2025', amount: 15.00, status: 'Completed' },
        { id: 2, type: 'received', name: 'Salary Deposit', date: 'Oct 23, 2025', amount: 2450.00, status: 'Completed' },
        { id: 3, type: 'sent', name: 'Jean Paul', date: 'Oct 21, 2025', amount: 50.00, status: 'Pending' },
        { id: 4, type: 'sent', name: 'Electric Bill', date: 'Oct 20, 2025', amount: 30.00, status: 'Completed' },
        { id: 5, type: 'received', name: 'Refund - Amazon', date: 'Oct 19, 2025', amount: 120.50, status: 'Completed' },
    ];

    return (
        <CustomerLayout>
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
                    <p className="text-gray-500 text-sm">View all your incoming and outgoing transfers.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow-sm">
                        <ArrowDownLeft size={16} /> Export CSV
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* ------------- */}
                <div className="p-4 border-b border-gray-50">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="w-full pl-10 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-4">Transaction</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${
                                            tx.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {tx.type === 'received' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                        </div>
                                        <span className="font-semibold text-gray-800">{tx.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-500">{tx.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className={`p-4 text-right font-bold ${
                                    tx.type === 'received' ? 'text-green-600' : 'text-gray-900'
                                }`}>
                                    {tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CustomerLayout>
    );
}