import { ArrowLeft, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuditLogs() {
    const navigate = useNavigate();
    
    const logs = [
        { id: 101, action: 'User Login', user: 'admin@banking.com', ip: '192.168.1.1', time: '10 mins ago', status: 'Success' },
        { id: 102, action: 'Update Profile', user: 'fresh@test.com', ip: '45.12.33.1', time: '1 hour ago', status: 'Success' },
        { id: 103, action: 'Failed Login', user: 'unknown@hacker.com', ip: '102.33.12.1', time: '2 hours ago', status: 'Failed' },
        { id: 104, action: 'Delete User', user: 'admin@banking.com', ip: '192.168.1.1', time: '5 hours ago', status: 'Success' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={18} className="mr-2"/> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><Shield size={24}/></div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Security Audit Logs</h2>
                        <p className="text-gray-500 text-sm">Track all system activities and security events</p>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="p-4">Action</th>
                            <th className="p-4">User</th>
                            <th className="p-4">IP Address</th>
                            <th className="p-4">Time</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map(log => (
                            <tr key={log.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-gray-800">{log.action}</td>
                                <td className="p-4 text-gray-600">{log.user}</td>
                                <td className="p-4 font-mono text-xs text-gray-400">{log.ip}</td>
                                <td className="p-4 text-sm text-gray-500 flex items-center gap-1"><Clock size={14}/> {log.time}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${log.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}