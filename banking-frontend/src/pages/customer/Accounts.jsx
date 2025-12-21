import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import CustomerLayout from '../../layouts/CustomerLayout';
import { CreditCard, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            setLoading(false);
            return;
        }

        api.get(`/accounts/user/${userId}`)
            .then(res => {
                setAccounts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading accounts", err);
                setLoading(false);
            });
    }, []);

    return (
        <CustomerLayout>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Accounts</h2>
                    <p className="text-gray-500 text-sm">Manage your banking products</p>
                </div>
                <Link to="/customer/create-account">
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
                        <PlusCircle size={18} /> Open New Account
                    </button>
                </Link>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="animate-pulse bg-gray-200 h-48 rounded-2xl"></div>
                    <div className="animate-pulse bg-gray-200 h-48 rounded-2xl"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accounts.length > 0 ? (
                        accounts.map(acc => (
                            <div key={acc.id} className="relative overflow-hidden bg-slate-900 text-white p-6 rounded-2xl shadow-xl transition transform hover:-translate-y-1">
                                {/* Decorative Circles */}
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

                                <div className="relative z-10 flex justify-between items-start mb-10">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
                                            {acc.accountType}
                                        </span>
                                        <span className="text-lg font-mono tracking-widest mt-1">
                                            **** {acc.accountNumber.slice(-4)}
                                        </span>
                                    </div>
                                    <CreditCard className="text-white/80" />
                                </div>

                                <div className="relative z-10 mt-4">
                                    <span className="text-xs text-slate-400 uppercase">Current Balance</span>
                                    <div className="text-3xl font-bold mt-1">
                                        ${acc.balance.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white p-10 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">No Accounts Found</h3>
                            <p className="text-gray-500 mb-6">You don't have any active bank accounts yet.</p>
                            <Link to="/customer/create-account">
                                <button className="text-blue-600 font-bold hover:underline">
                                    Open your first account &rarr;
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </CustomerLayout>
    );
}