import { ChevronLeft, ChevronRight, CreditCard, DollarSign, Edit, LogOut, Search, Settings, Shield, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

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

const getLocationDisplay = (locationObj) => {
    if (!locationObj || !locationObj.id) return <span className="text-gray-300 italic">Not Assigned</span>;
    
    const locId = locationObj.id;
    
    for (const [provKey, data] of Object.entries(REGIONAL_HIERARCHY)) {
        const foundDist = data.districts.find(d => d.id === locId);
        if (foundDist) {
            return (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-700 text-sm">{foundDist.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">{data.label}</span>
                </div>
            );
        }
    }
    return <span className="text-gray-400">Unknown ID: {locId}</span>;
};

const getLocationString = (locationObj) => {
    if (!locationObj || !locationObj.id) return "";
    const locId = locationObj.id;
    for (const [provKey, data] of Object.entries(REGIONAL_HIERARCHY)) {
        const foundDist = data.districts.find(d => d.id === locId);
        if (foundDist) {
            return `${foundDist.name} ${data.label}`;
        }
    }
    return "";
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ clients: 0, accounts: 0, reserves: 0 });
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
           
            try {
                const dashRes = await api.get('/dashboard/stats');
                setStats(dashRes.data);
            } catch (e) {
                setStats({ clients: 4, accounts: 1, reserves: 10000 });
            }

            const userRes = await api.get('/users');
            setUsers(userRes.data);
        } catch (err) {
            console.error("Data Load Error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/users/${id}`);
            toast.success("User Deleted", { style: { background: '#ef4444', color: '#fff' } });
            loadData(); 
        } catch (err) {
            toast.error("Delete Failed");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const filteredUsers = users.filter(u => {
        const term = search.toLowerCase();
        const locationText = getLocationString(u.location).toLowerCase(); 

        return (
            u.firstName.toLowerCase().includes(term) || 
            u.lastName.toLowerCase().includes(term) ||      
            u.email.toLowerCase().includes(term) || 
            u.role.toLowerCase().includes(term) ||          
            String(u.id).includes(term) ||                  
            locationText.includes(term)                     
        );
    });

    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            
            
            <div className="w-64 bg-slate-900 text-white flex flex-col p-6 fixed h-full shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-10">
                    <Shield className="text-blue-500" size={32} />
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">BankAdmin</h1>
                        <p className="text-[10px] text-slate-500 uppercase">Staff Portal</p>
                    </div>
                </div>
                
                <nav className="flex-1 space-y-2">
                    <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-3 bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-900/50 transition font-medium">
                        <Users size={18} /> User Database
                    </button>
                    
                
                    <button onClick={() => navigate('/admin/reserves')} className="w-full flex items-center gap-3 text-slate-400 p-3 hover:text-white hover:bg-slate-800 rounded-xl transition font-medium">
                        <DollarSign size={18} /> Bank Reserves
                    </button>
                    <button onClick={() => navigate('/admin/audit-logs')} className="w-full flex items-center gap-3 text-slate-400 p-3 hover:text-white hover:bg-slate-800 rounded-xl transition font-medium">
                        <Shield size={18} /> Audit Logs
                    </button>
                     <button onClick={() => navigate('/admin/settings')} className="w-full flex items-center gap-3 text-slate-400 p-3 hover:text-white hover:bg-slate-800 rounded-xl transition font-medium">
                        <Settings size={18} /> Settings
                    </button>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition mt-auto p-3 hover:bg-slate-800 rounded-xl">
                    <LogOut size={18} /> Sign Out
                </button>
            </div>

            {/*---------------------*/}
            <div className="flex-1 ml-64 p-8">
                
                {/*----------------------*/}
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
                        <p className="text-gray-500 text-sm">Real-time banking analytics</p>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-red-100">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        Admin Mode
                    </div>
                </div>

                {/*---------------*/}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Clients</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{users.length}</h3>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Users size={28} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Accounts</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{stats.accounts}</h3>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-2xl text-purple-600"><CreditCard size={28} /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Reserves</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">${stats.reserves.toLocaleString()}</h3>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600"><DollarSign size={28} /></div>
                    </div>
                </div>

                
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                    
                    
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Client Database</h3>
                            <p className="text-gray-500 text-sm mt-1">Manage user access and locations</p>
                        </div>
                        <div className="relative w-72">
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search any column..." 
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-5 pl-8">ID</th>
                                    <th className="py-5">User Profile</th>
                                    <th className="py-5">Role</th>
                                    <th className="py-5">Location (District, Province)</th>
                                    <th className="py-5 text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-blue-50/30 transition group">
                                        <td className="py-5 pl-8 text-gray-400 text-sm font-mono">#{u.id}</td>
                                        
                                        <td className="py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{u.firstName} {u.lastName}</span>
                                                <span className="text-sm text-gray-500">{u.email}</span>
                                            </div>
                                        </td>

                                        <td className="py-5">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wide border ${
                                                u.role === 'ADMIN' 
                                                ? 'bg-red-50 text-red-600 border-red-100' 
                                                : 'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                                {u.role === 'ADMIN' && <Shield size={10} className="mr-1"/>}
                                                {u.role}
                                            </span>
                                        </td>
                                        
                                        <td className="py-5">
                                            {getLocationDisplay(u.location)}
                                        </td>
                                        
                                        <td className="py-5 text-right pr-8">
                                            <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => navigate(`/admin/edit-user/${u.id}`)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm border border-blue-100">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(u.id)} className="p-2 bg-white text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition border border-gray-200">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/*------ Pagination -------*/}
                    <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <span className="text-xs font-medium text-gray-500">
                            Showing page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages || 1}
                        </span>
                        <div className="flex gap-2">
                            <button 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition shadow-sm text-gray-600"
                            >
                                <ChevronLeft size={18}/>
                            </button>
                            <button 
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition shadow-sm text-gray-600"
                            >
                                <ChevronRight size={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}