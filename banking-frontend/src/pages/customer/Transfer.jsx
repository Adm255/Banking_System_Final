import { ArrowRight, CheckCircle, Send, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function Transfer() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    
    const [sourceAccountId, setSourceAccountId] = useState('');
    const [targetAccountId, setTargetAccountId] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const res = await api.get(`/accounts/user/${userId}`);
                setAccounts(res.data);
                if (res.data.length > 0) setSourceAccountId(res.data[0].id);
            } catch (err) {
                toast.error("Failed to load accounts.");
            }
        };
        fetchAccounts();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (sourceAccountId === targetAccountId) {
            toast.error("Cannot transfer to the same account!");
            setLoading(false);
            return;
        }

        try {
            await api.post(`/accounts/transfer?fromId=${sourceAccountId}&toId=${targetAccountId}&amount=${amount}`);
            
            
            toast.success(`Successfully sent $${amount}`, {
                style: { background: '#1e293b', color: '#fff' },
                icon: '💸',
                duration: 3000
            });
            
        
            setTimeout(() => navigate('/customer/dashboard'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Transfer Failed. Check balance.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                
                {/* ------------------- */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Send className="text-blue-600" /> Transfer Money
                    </h2>

                    <form onSubmit={handleTransfer} className="space-y-6">
                        
                        {/* ------------- */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">From Account</label>
                            <div className="relative">
                                <select 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-gray-700"
                                    value={sourceAccountId}
                                    onChange={(e) => setSourceAccountId(e.target.value)}
                                >
                                    {accounts.map(acc => (
                                        <option key={acc.id} value={acc.id}>
                                            {acc.accountType} (****{acc.accountNumber.slice(-4)}) - ${acc.balance}
                                        </option>
                                    ))}
                                </select>
                                <Wallet className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        {/* ------------ */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Recipient Account ID</label>
                            <div className="relative">
                                <input 
                                    type="number"
                                    placeholder="Enter Destination Account ID"
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg"
                                    value={targetAccountId}
                                    onChange={(e) => setTargetAccountId(e.target.value)}
                                    required
                                />
                                <div className="absolute right-4 top-4 bg-blue-50 text-blue-600 p-1 rounded-md">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* --------------- */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">$</span>
                                <input 
                                    type="number" 
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-4 text-4xl font-bold text-gray-900 border-b-2 border-gray-100 focus:border-blue-600 outline-none transition-colors placeholder-gray-200"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        {/* ---------- */}
                        <button 
                            disabled={loading || !amount || !targetAccountId}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Send Funds Now'}
                            {!loading && <Send size={20} />}
                        </button>

                    </form>
                </div>
            </div>

            {/* ------------ */}
            <p className="text-center text-gray-400 text-xs mt-6 flex items-center justify-center gap-1">
                <CheckCircle size={12} /> Secure 256-bit Encrypted Transaction
            </p>
        </div>
    );
}