import { ArrowLeft, ArrowRight, CheckCircle, Key, Lock, Mail, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: New Password
    const [loading, setLoading] = useState(false);
    
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // STEP 1: Request Reset
    const handleRequestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulation for Demo (or connect to real backend)
        try {
            // await api.post('/auth/forgot-password', { email }); 
            // ^ Uncomment above if backend is ready. For now, we simulate success:
            
            setTimeout(() => {
                setLoading(false);
                setStep(2);
                toast.success(`Reset code sent to ${email}`, { icon: '📩' });
            }, 1500);
        } catch (err) {
            toast.error("User not found");
            setLoading(false);
        }
    };

    // STEP 2: Confirm Reset
    const handleResetConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // await api.post('/auth/reset-password', { email, otp, newPassword });
            
            setTimeout(() => {
                setLoading(false);
                toast.success("Password Updated Successfully!", {
                    style: { background: '#10b981', color: '#fff' },
                    duration: 3000
                });
                navigate('/login');
            }, 1500);
        } catch (err) {
            toast.error("Invalid Code or Error");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">
            
            {/* Background Decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/30 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-slate-100">
                
                <button onClick={() => navigate('/login')} className="flex items-center text-slate-400 hover:text-blue-600 mb-6 transition group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform"/> Back to Login
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <ShieldAlert size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Recovery Center</h2>
                    <p className="text-slate-500 text-sm mt-2">
                        {step === 1 ? "Enter your email to receive a secure reset code." : "Create a new strong password."}
                    </p>
                </div>

                {step === 1 ? (
                    // --- STEP 1 FORM: EMAIL ---
                    <form onSubmit={handleRequestReset} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Registered Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="email" required
                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    placeholder="name@example.com"
                                    value={email} onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                            {loading ? 'Sending Code...' : 'Send Reset Link'} <ArrowRight size={18} />
                        </button>
                    </form>
                ) : (
                    // --- STEP 2 FORM: CODE + NEW PASSWORD ---
                    <form onSubmit={handleResetConfirm} className="space-y-4">
                         <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-lg mb-4 text-center border border-blue-100">
                            Code sent to <strong>{email}</strong>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Verification Code</label>
                            <div className="relative">
                                <Key className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="text" required placeholder="XXXXXX" maxLength={6}
                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none tracking-widest font-mono"
                                    value={otp} onChange={e => setOtp(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="password" required placeholder="••••••••"
                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold transition shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 mt-4">
                            {loading ? 'Updating...' : 'Reset Password'} <CheckCircle size={18} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}