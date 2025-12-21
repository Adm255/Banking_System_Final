import { AlertTriangle, ArrowLeft, ChevronRight, Mail, MapPin, Save, Shield, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

// --- CONFIGURATION: HEC MIS STYLE HIERARCHY ---
// Requirement: "Select from top (parent) up to the last (child)"
const REGIONAL_HIERARCHY = {
    'KIGALI': {
        label: 'Kigali City',
        districts: [
            { id: 1, name: 'Gasabo District' },
            { id: 2, name: 'Kicukiro District' },
            { id: 3, name: 'Nyarugenge District' }
        ]
    },
    'NORTH': {
        label: 'Northern Province',
        districts: [
            { id: 4, name: 'Musanze District' },
            { id: 5, name: 'Burera District' },
            { id: 6, name: 'Gicumbi District' }
        ]
    },
    'EAST': {
        label: 'Eastern Province',
        districts: [
            { id: 7, name: 'Rwamagana District' },
            { id: 8, name: 'Kayonza District' },
            { id: 9, name: 'Nyagatare District' }
        ]
    },
    'SOUTH': {
        label: 'Southern Province',
        districts: [
            { id: 10, name: 'Huye District' },
            { id: 11, name: 'Nyanza District' }
        ]
    },
    'WEST': {
        label: 'Western Province',
        districts: [
            { id: 12, name: 'Rubavu District' },
            { id: 13, name: 'Rusizi District' }
        ]
    }
};

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', role: 'USER', location: null
    });

    const [parentRegion, setParentRegion] = useState('');

    useEffect(() => {
        api.get(`/users/${id}`)
            .then(res => {
                setUser(res.data);
                
                // --- AUTO-DETECT PARENT ---
                // If user has a location ID, find which Parent it belongs to.
                if (res.data.location) {
                    const existingLocId = res.data.location.id;
                    let foundParent = '';
                    
                    // Search through our config to find the matching parent
                    Object.entries(REGIONAL_HIERARCHY).forEach(([key, region]) => {
                        if (region.districts.some(d => d.id === existingLocId)) {
                            foundParent = key;
                        }
                    });

                    // If we found where the ID belongs, set the Parent Dropdown
                    if (foundParent) {
                        setParentRegion(foundParent);
                    } else {
                        // Safety: If ID exists in DB but not in our list (e.g. ID 99)
                        // We leave Parent blank so the user is forced to re-select valid data.
                        setParentRegion('');
                    }
                }
            })
            .catch(err => toast.error("Could not load user data"));
    }, [id]);

    const handleParentChange = (e) => {
        const newParent = e.target.value;
        setParentRegion(newParent);
        
        // --- LOGIC: RESET CHILD ---
        // If Parent changes, the old Child ID is now invalid.
        // We must clear it to force the user to pick a new, valid Child.
        setUser(prev => ({ ...prev, location: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/users/${id}`, user);
            toast.success("User Updated Successfully!", {
                style: { background: '#1e293b', color: '#fff' }, duration: 2000
            });
            setTimeout(() => navigate('/admin/dashboard'), 1500);
        } catch (err) {
            toast.error("Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100">
                <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-blue-600 transition mb-6">
                    <ArrowLeft size={18} className="mr-2"/> Back
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="text-blue-600" /> Edit User #{id}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Standard Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                            <input className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" 
                                value={user.firstName} onChange={e => setUser({...user, firstName: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                            <input className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" 
                                value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                            <input className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                                value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                        </div>
                    </div>

                    {/* --- LOCATION SECTION (HEC MIS STYLE) --- */}
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 relative">
                        <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <MapPin size={16}/> Regional Assignment
                        </h3>
                        
                        {/* 1. Parent Select */}
                        <div className="mb-4">
                            <label className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">1. Select Province</label>
                            <select 
                                className="w-full p-2.5 border border-blue-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={parentRegion}
                                onChange={handleParentChange}
                            >
                                <option value="">-- Choose Province --</option>
                                {Object.entries(REGIONAL_HIERARCHY).map(([key, data]) => (
                                    <option key={key} value={key}>{data.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* 2. Child Select */}
                        <div className="relative">
                            <label className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">2. Select District</label>
                            <select 
                                className={`w-full p-2.5 border rounded-lg text-sm outline-none appearance-none
                                    ${!parentRegion 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' 
                                        : 'bg-white text-gray-900 cursor-pointer border-blue-200 focus:ring-2 focus:ring-blue-500'}`}
                                disabled={!parentRegion}
                                value={user.location ? user.location.id : ''}
                                onChange={e => setUser({ ...user, location: { id: e.target.value } })}
                            >
                                <option value="">
                                    {!parentRegion ? '🔒 Locked (Select Province First)' : '-- Choose District --'}
                                </option>
                                {parentRegion && REGIONAL_HIERARCHY[parentRegion].districts.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>

                            <div className="absolute right-3 bottom-3 pointer-events-none">
                                {!parentRegion ? <Shield size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-blue-500 rotate-90" />}
                            </div>
                        </div>

                        {/* Explanation for Defense */}
                        <p className="text-[10px] text-blue-400 mt-3 flex items-start gap-1">
                            <AlertTriangle size={10} className="mt-0.5" /> 
                            <span>Note: Changing the Province automatically resets the District to ensure valid hierarchy.</span>
                        </p>
                    </div>
                    {/* ------------------------------------------- */}

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">Role</label>
                        <select className="w-full p-3 border border-gray-200 rounded-lg bg-white outline-none"
                            value={user.role} onChange={e => setUser({...user, role: e.target.value})}>
                            <option value="USER">User (Customer)</option>
                            <option value="ADMIN">Admin (Staff)</option>
                        </select>
                    </div>

                    <button className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 font-bold flex items-center justify-center gap-2">
                        {loading ? 'Saving...' : 'Save Changes'} <Save size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}