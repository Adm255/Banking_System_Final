import { motion } from 'framer-motion';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">
            
            {/* --------- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 text-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20">
                        <FileQuestion size={48} className="text-blue-400" />
                    </div>
                </motion.div>

                <h1 className="text-8xl font-bold mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">
                    404
                </h1>
                <h2 className="text-2xl font-semibold mb-4 text-slate-300">Page Not Found</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    The transaction you are looking for might have been moved, deleted, or never existed in this ledger.
                </p>

                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>

                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50"
                    >
                        <Home size={18} /> Return Home
                    </button>
                </div>
            </div>
        </div>
    );
}