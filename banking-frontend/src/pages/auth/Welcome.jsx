import { motion } from 'framer-motion';
import { ArrowRight, Github, Globe, Linkedin, ShieldCheck, Wallet } from 'lucide-react'; // <--- Added Icons
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();

    const handleNavigate = (type) => {
        navigate('/login', { state: { type } });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            
            {/* 1. Animated Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-[120px]"
                ></motion.div>
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"
                ></motion.div>
            </div>

            {/* 2. Main Content */}
            <div className="z-10 text-center mb-16 max-w-2xl">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                        Banking <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Reimagined</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-light">
                        Experience the future of finance with our secure, role-based ecosystem.
                    </p>
                </motion.div>
            </div>

            {/* 3. The Interactive Cards */}
            <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4 mb-12">
                
                {/* Customer Card */}
                <motion.div 
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => handleNavigate('customer')}
                    className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                        <Wallet className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Personal Banking</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Manage your savings, execute secure transfers, and track your financial health in real-time.
                    </p>
                    <div className="flex items-center text-blue-400 font-bold group-hover:translate-x-2 transition-transform duration-300">
                        Access Portal <ArrowRight className="ml-2" size={20} />
                    </div>
                </motion.div>

                {/* Admin Card */}
                <motion.div 
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => handleNavigate('admin')}
                    className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl cursor-pointer hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-300 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                        <ShieldCheck className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Corporate Staff</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Administrative controls, user management oversight, and system-wide analytics.
                    </p>
                    <div className="flex items-center text-indigo-400 font-bold group-hover:translate-x-2 transition-transform duration-300">
                        Staff Login <ArrowRight className="ml-2" size={20} />
                    </div>
                </motion.div>

            </div>

            {/* 4. NEW SOCIAL FOOTER */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }}
                className="z-10 mt-auto pb-8 flex flex-col items-center gap-4"
            >
                <div className="flex gap-6">
                    <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                        <Github size={20} />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                        <Linkedin size={20} />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                        <Globe size={20} />
                    </a>
                </div>
                <p className="text-slate-600 text-xs">
                    © 2025 Secure Banking Systems • Designed by Adam
                </p>
            </motion.div>
        </div>
    );
}