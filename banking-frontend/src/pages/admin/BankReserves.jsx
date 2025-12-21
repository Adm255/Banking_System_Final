import { ArrowLeft, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BankReserves() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
             <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={18} className="mr-2"/> Back to Dashboard
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Chart Mockup */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <DollarSign className="text-green-600"/> Liquidity Status
                    </h2>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-bold text-gray-600">Cash Reserves (USD)</span>
                                <span className="text-sm font-bold text-gray-900">$500,000</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-bold text-gray-600">Digital Assets (RWF)</span>
                                <span className="text-sm font-bold text-gray-900">24M RWF</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Card */}
                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
                    <div>
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Total Valuation</p>
                        <h1 className="text-5xl font-bold mt-2">$1.2M</h1>
                        <div className="flex items-center gap-2 text-green-400 mt-4 text-sm font-bold bg-green-900/30 w-fit px-3 py-1 rounded-full">
                            <TrendingUp size={16} /> +12.5% this month
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm mt-8">
                        *Data synced with Central Bank API
                    </p>
                </div>
            </div>
        </div>
    );
}