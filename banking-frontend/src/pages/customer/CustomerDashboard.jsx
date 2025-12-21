import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CreditCard,
  FileText,
  MoreHorizontal,
  Send,
  User,
  Wallet
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function CustomerDashboard() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState({ firstName: 'Client' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                
                // 1. Fetch User Name
                const userRes = await api.get(`/users/${userId}`);
                setUser(userRes.data);

                // 2. Fetch Accounts
                const accRes = await api.get(`/accounts/user/${userId}`);
                setAccounts(accRes.data);

                // 3. Fetch Recent Transactions (Mocking it via the first account for now)
                if (accRes.data.length > 0) {
                    const transRes = await api.get(`/transactions/account/${accRes.data[0].id}`);
                    setTransactions(transRes.data.slice(0, 5)); // Only show top 5
                }
            } catch (err) {
                console.error("Dashboard Load Error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to format currency
    const fmt = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            
            {/* --- HEADER --- */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.firstName}</h1>
                    <p className="text-gray-500 text-sm mt-1">Here is your financial overview</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition bg-white rounded-full shadow-sm border border-gray-100">
                        <Bell size={20} />
                    </button>
                    <button onClick={() => navigate('/customer/profile')} className="p-2 text-gray-400 hover:text-blue-600 transition bg-white rounded-full shadow-sm border border-gray-100">
                        <User size={20} />
                    </button>
                </div>
            </div>

            {/* --- 1. ACCOUNT CARDS (The "Chic" Cards) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts.length > 0 ? accounts.map((acc, index) => (
                    <div key={acc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                        {/* Decorative Gradient Blob */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-50 to-indigo-50' : 'from-green-50 to-emerald-50'} rounded-bl-full -mr-10 -mt-10 opacity-50`}></div>
                        
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {acc.accountType === 'SAVINGS' ? <Wallet size={24} /> : <CreditCard size={24} />}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                        </div>

                        <div className="relative z-10">
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{acc.accountType} Account</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{fmt(acc.balance)}</h3>
                            <p className="text-gray-400 text-sm mt-4 font-mono">**** **** **** {acc.accountNumber.slice(-4)}</p>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-3 text-center p-10 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-400">No accounts yet.</p>
                        <button onClick={() => navigate('/customer/create-account')} className="mt-2 text-blue-600 font-bold hover:underline">Open one now</button>
                    </div>
                )}
            </div>

            {/* --- 2. QUICK ACTIONS (The "Chic" Bar) --- */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-around md:justify-start md:gap-12 items-center">
                <button onClick={() => navigate('/customer/transfer')} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Send size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600">Transfer</span>
                </button>

                <button onClick={() => navigate('/customer/transactions')} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <FileText size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-purple-600">Statements</span>
                </button>

                <button onClick={() => navigate('/customer/accounts')} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                        <Wallet size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-orange-600">Pay Bills</span>
                </button>
            </div>

            {/* --- 3. RECENT TRANSACTIONS (The Clean List) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Transactions */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Recent Activity</h3>
                        <button onClick={() => navigate('/customer/transactions')} className="text-sm text-blue-600 hover:underline">View All</button>
                    </div>

                    <div className="space-y-4">
                        {transactions.length > 0 ? transactions.map(t => (
                            <div key={t.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        t.type === 'DEPOSIT' || t.targetAccountId ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {t.type === 'DEPOSIT' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {t.type === 'TRANSFER' ? 'Transfer' : t.type}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(t.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <span className={`font-bold ${
                                    t.type === 'DEPOSIT' || (t.targetAccountId && t.amount > 0) ? 'text-green-600' : 'text-gray-900'
                                }`}>
                                    {t.type === 'DEPOSIT' ? '+' : '-'}{fmt(t.amount)}
                                </span>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-400">No recent transactions found.</div>
                        )}
                    </div>
                </div>

                {/* Right: Notifications / Ads */}
                <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                            <Bell size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Security Alert</h3>
                        <p className="text-slate-300 text-sm mb-6">
                            Your account is protected with 2FA. Review your recent logins to ensure safety.
                        </p>
                        <button onClick={() => navigate('/customer/profile')} className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-blue-50 transition">
                            Review Security
                        </button>
                    </div>
                    
                    {/* Background Circles Decoration */}
                    <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-50"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-40"></div>
                </div>
            </div>
        </div>
    );
}