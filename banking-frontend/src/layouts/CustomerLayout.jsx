import { ArrowRightLeft, CreditCard, History, LogOut, PlusCircle, User, Wallet } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CustomerLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-2xl z-10">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold text-blue-400 tracking-wide flex items-center gap-2">
                        MyBank
                    </h1>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {/* 1. Dashboard */}
                    <Link to="/customer/dashboard">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/dashboard') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <Wallet size={20} /> Dashboard
                        </button>
                    </Link>

                    {/* 2. My Accounts (Added this!) */}
                    <Link to="/customer/accounts">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/accounts') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <CreditCard size={20} /> My Accounts
                        </button>
                    </Link>

                    {/* 3. Open Account */}
                    <Link to="/customer/create-account">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/create-account') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <PlusCircle size={20} /> Open Account
                        </button>
                    </Link>

                    {/* 4. Transfer Money */}
                    <Link to="/customer/transfer">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/transfer') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <ArrowRightLeft size={20} /> Transfer Money
                        </button>
                    </Link>

                    {/* 5. Transactions */}
                    <Link to="/customer/transactions">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/transactions') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <History size={20} /> Transactions
                        </button>
                    </Link>

                    {/* 6. Profile */}
                    <Link to="/customer/profile">
                        <button className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
                            isActive('/customer/profile') 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                        }`}>
                            <User size={20} /> Profile
                        </button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="ml-64 flex-1 p-8 w-full">
                {children}
            </main>
        </div>
    );
};

export default CustomerLayout;