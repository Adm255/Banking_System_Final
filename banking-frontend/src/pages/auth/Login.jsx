import { ArrowLeft, CheckCircle, Key, Lock, Mail, ShieldCheck, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the type (admin/customer) passed from the Welcome screen. Default to customer.
    const loginType = location.state?.type || 'customer';
    const isAdmin = loginType === 'admin';

    // Theme Config (Blue for Customer, Red for Admin)
    const theme = {
        bg: isAdmin ? 'from-slate-900 via-red-950 to-slate-900' : 'from-slate-900 via-blue-950 to-slate-900',
        accent: isAdmin ? 'text-red-500' : 'text-blue-500',
        button: isAdmin ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700',
        iconBg: isAdmin ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500',
        ring: isAdmin ? 'focus:ring-red-500' : 'focus:ring-blue-500',
        title: isAdmin ? 'Admin Portal' : 'MyBanking'
    };

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/login', { email, password });
            setStep(2);
            setError('');
        } catch (err) {
            setError('Invalid Email or Password');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/verify-2fa', { email, code });
            
            // SECURITY CHECK: Did a user try to log in to the Admin portal?
            const role = res.data.role; // 'ADMIN' or 'USER'
            
            if (isAdmin && role !== 'ADMIN') {
                setError("Access Denied: You are not an Administrator.");
                return;
            }

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', res.data.userId); 

            if (role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/customer/dashboard');
            }
        } catch (err) {
            setError('Invalid Verification Code');
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bg}`}>
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-slate-200 relative overflow-hidden">
                
                {/* Back Button */}
                <button onClick={() => navigate('/')} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
                    <ArrowLeft size={20} />
                </button>

                <div className="text-center mb-8 mt-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${theme.iconBg}`}>
                        {isAdmin ? <ShieldCheck size={32} /> : <Wallet size={32} />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{theme.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">Please authenticate to continue</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm mb-6 text-center animate-pulse">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <>
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    className={`w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 ${theme.ring} outline-none transition-all`}
                                    placeholder="Email Address" 
                                    value={email} onChange={e => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="password"
                                    className={`w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 ${theme.ring} outline-none transition-all`} 
                                    placeholder="Password" 
                                    value={password} onChange={e => setPassword(e.target.value)} 
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={() => navigate('/forgot-password')} className={`text-sm ${theme.accent} hover:underline font-medium`}>
                                    Forgot Password?
                                </button>
                            </div>

                            <button className={`w-full ${theme.button} text-white p-3 rounded-lg font-semibold shadow-lg transition-all`}>
                                Continue Securely
                            </button>
                        </form>

                        {/* --- NEW REGISTRATION LINK --- */}
                        {!isAdmin && (
                            <div className="mt-6 text-center pt-4 border-t border-gray-100">
                                <p className="text-gray-500 text-sm">
                                    New to Banking Corp?{' '}
                                    <button 
                                        type="button" 
                                        onClick={() => navigate('/register')} 
                                        className={`font-bold hover:underline transition ${theme.accent}`}
                                    >
                                        Create an account
                                    </button>
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                            <p className="text-sm text-gray-800 font-medium">Verification Code Sent</p>
                            <p className="text-xs text-gray-500 mt-1">Check your email inbox</p>
                        </div>
                        <div className="relative group">
                            <Key className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                className={`w-full pl-10 p-3 border border-gray-300 rounded-lg text-center text-xl tracking-[0.5em] font-mono focus:ring-2 ${theme.ring} outline-none transition-all`} 
                                placeholder="XXXXXX" 
                                maxLength={6}
                                value={code} onChange={e => setCode(e.target.value)} 
                            />
                        </div>
                        <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-semibold shadow-lg transition-all flex items-center justify-center gap-2">
                            Verify Identity <CheckCircle size={18} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;