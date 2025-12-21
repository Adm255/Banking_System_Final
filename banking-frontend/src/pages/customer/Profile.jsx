import { Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import CustomerLayout from '../../layouts/CustomerLayout';

export default function Profile() {
    // Mock data for the demo
    const userProfile = {
        name: "Fresh User",
        email: "fresh@test.com",
        role: "CUSTOMER",
        location: "Kigali, Rwanda",
        phone: "+250 788 123 456",
        joinDate: "Dec 10, 2025"
    };

    return (
        <CustomerLayout>
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                <p className="text-gray-500 text-sm">Manage your personal information.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                
                <div className="px-8 pb-8 relative">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-white rounded-full p-1 absolute -top-12 shadow-md">
                        <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-500">
                            {userProfile.name.charAt(0)}
                        </div>
                    </div>

                    {/* Header Info */}
                    <div className="mt-14 mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">{userProfile.name}</h3>
                        <p className="text-gray-500 flex items-center gap-2 mt-1">
                            <Shield size={16} className="text-green-500" /> 
                            {userProfile.role} Account
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                                <p className="text-gray-800">{userProfile.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Location</p>
                                <p className="text-gray-800">{userProfile.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                                <p className="text-gray-800">{userProfile.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Member Since</p>
                                <p className="text-gray-800">{userProfile.joinDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
}