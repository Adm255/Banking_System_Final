import { ArrowRight, ChevronRight, Lock, Mail, MapPin, Shield, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

// --- SHARED LOCATION CONFIG (Consensus) ---
const REGIONAL_HIERARCHY = {
    'KIGALI': { label: 'Kigali City', districts: [{ id: 1, name: 'Gasabo' }, { id: 2, name: 'Kicukiro' }, { id: 3, name: 'Nyarugenge' }] },
    'NORTH':  { label: 'Northern Prov', districts: [{ id: 4, name: 'Musanze' }, { id: 5, name: 'Burera' }, { id: 6, name: 'Gicumbi' }] },
    'EAST':   { label: 'Eastern Prov',  districts: [{ id: 7, name: 'Rwamagana' }, { id: 8, name: 'Kayonza' }, { id: 9, name: 'Nyagatare' }] },
    'SOUTH':  { label: 'Southern Prov', districts: [{ id: 10, name: 'Huye' }, { id: 11, name: 'Nyanza' }] },
    'WEST':   { label: 'Western Prov',  districts: [{ id: 12, name: 'Rubavu' }, { id: 13, name: 'Rusizi' }] }
};

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'USER', location: null
    });
    const [parentRegion, setParentRegion] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.location || !formData.location.id) {
            toast.error("Please select a valid District.");
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', formData); // Ensure your backend has this endpoint
            toast.success("Account Created! Please Login.");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden font-sans">
            
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-lg relative z-10">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4 shadow-lg shadow-blue-500/40">
                        <User size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">Create Account</h1>
                    <p className="text-slate-400 text-sm">Join the secure banking network</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input type="text" placeholder="First Name" required
                                className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 outline-none transition"
                                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                            <input type="text" placeholder="Last Name" required
                                className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 outline-none transition"
                                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <input type="email" placeholder="Email Address" required
                            className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 outline-none transition"
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                        <input type="password" placeholder="Create Password" required
                            className="w-full pl-10 p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 outline-none transition"
                            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    {/* --- LOCATION REQUIREMENT (PROVINCE -> DISTRICT) --- */}
                    <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl space-y-3">
                        <h3 className="text-xs font-bold text-blue-400 uppercase flex items-center gap-2">
                            <MapPin size={14} /> Location Verification
                        </h3>
                        
                        {/* Parent */}
                        <select 
                            className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none cursor-pointer"
                            onChange={(e) => {
                                setParentRegion(e.target.value);
                                setFormData({ ...formData, location: null }); // Reset child
                            }}
                        >
                            <option value="">-- Select Province --</option>
                            {Object.entries(REGIONAL_HIERARCHY).map(([key, data]) => (
                                <option key={key} value={key}>{data.label}</option>
                            ))}
                        </select>

                        {/* Child */}
                        <div className="relative">
                            <select 
                                className={`w-full p-2.5 rounded-lg text-sm outline-none appearance-none transition border
                                    ${!parentRegion 
                                        ? 'bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed' 
                                        : 'bg-slate-800 border-blue-500/50 text-white cursor-pointer hover:border-blue-500'}`}
                                disabled={!parentRegion}
                                onChange={(e) => setFormData({ ...formData, location: { id: e.target.value } })}
                            >
                                <option value="">
                                    {!parentRegion ? 'Select Province First...' : '-- Select District --'}
                                </option>
                                {parentRegion && REGIONAL_HIERARCHY[parentRegion].districts.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-3 pointer-events-none">
                                {!parentRegion ? <Shield size={14} className="text-slate-600"/> : <ChevronRight size={14} className="text-blue-400 rotate-90"/>}
                            </div>
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-4 rounded-xl font-bold transition shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 mt-2">
                        {loading ? 'Creating Profile...' : 'Sign Up Now'} <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition">
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}