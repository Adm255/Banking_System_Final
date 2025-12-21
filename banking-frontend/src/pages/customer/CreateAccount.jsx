import { CreditCard, PlusCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import CustomerLayout from '../../layouts/CustomerLayout';

export default function CreateAccount() {
    const navigate = useNavigate();
    const [type, setType] = useState('SAVINGS');
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const randomNum = "BK-" + Math.floor(100000 + Math.random() * 900000);

        try {
            await api.post(`/accounts?userId=${userId}`, {
                accountNumber: randomNum,
                balance: parseFloat(balance),
                accountType: type
            });
            alert("Account Created Successfully!");
            navigate('/customer/dashboard'); 
        } catch (error) {
            alert("Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <CustomerLayout>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
                <header className="text-center mb-8">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <PlusCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Open New Account</h2>
                    <p className="text-gray-500 text-sm">Start your savings journey today</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* ...... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <select 
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                                value={type} onChange={(e) => setType(e.target.value)}
                            >
                                <option value="SAVINGS">Savings Account</option>
                                <option value="CURRENT">Current Account</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Initial Deposit ($)</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="number" 
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Min: 100"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </CustomerLayout>
    );
}