import { ArrowLeft, Server, Settings, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminSettings() {
    const navigate = useNavigate();
    const [maintenance, setMaintenance] = useState(false);
    const [registrations, setRegistrations] = useState(true);

    const handleSave = () => {
        toast.success("System Configuration Saved!", { icon: '⚙️', style: { background: '#333', color: '#fff'} });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
             <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={18} className="mr-2"/> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                     <div className="bg-gray-100 p-3 rounded-xl text-gray-600"><Settings size={24}/></div>
                    <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                        <div>
                            <h3 className="font-bold text-gray-800">Maintenance Mode</h3>
                            <p className="text-sm text-gray-500">Disable customer access for upgrades</p>
                        </div>
                        <button onClick={() => setMaintenance(!maintenance)} className={maintenance ? "text-blue-600" : "text-gray-300"}>
                            {maintenance ? <ToggleRight size={40}/> : <ToggleLeft size={40}/>}
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                        <div>
                            <h3 className="font-bold text-gray-800">Allow New Registrations</h3>
                            <p className="text-sm text-gray-500">Public sign-up availability</p>
                        </div>
                        <button onClick={() => setRegistrations(!registrations)} className={registrations ? "text-green-600" : "text-gray-300"}>
                            {registrations ? <ToggleRight size={40}/> : <ToggleLeft size={40}/>}
                        </button>
                    </div>

                    <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-4">
                        <Server className="text-red-500" />
                        <div>
                            <h3 className="font-bold text-red-700">Server Status: Online</h3>
                            <p className="text-xs text-red-500">Uptime: 99.9% (US-East-1)</p>
                        </div>
                    </div>

                    <button onClick={handleSave} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}