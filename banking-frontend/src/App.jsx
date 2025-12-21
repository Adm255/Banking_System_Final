import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Security
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'; // <--- NEW IMPORT
import Welcome from './pages/auth/Welcome';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EditUser from './pages/admin/EditUser';
// --- NEW ADMIN PAGES ---
import AdminSettings from './pages/admin/AdminSettings';
import AuditLogs from './pages/admin/AuditLogs';
import BankReserves from './pages/admin/BankReserves';

// Customer Pages
import Accounts from './pages/customer/Accounts';
import CreateAccount from './pages/customer/CreateAccount';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Profile from './pages/customer/Profile';
import Transactions from './pages/customer/Transactions';
import Transfer from './pages/customer/Transfer';

function App() {
  return (
    <BrowserRouter>
      {/* Enables the chic dark notifications globally */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <--- NEW ROUTE */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit-user/:id" element={<EditUser />} />
            
            {/* NEW PAGE ROUTES */}
            <Route path="/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/reserves" element={<BankReserves />} />
        </Route>

        {/* CUSTOMER ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/create-account" element={<CreateAccount />} />
            <Route path="/customer/transfer" element={<Transfer />} />
            <Route path="/customer/transactions" element={<Transactions />} />
            <Route path="/customer/accounts" element={<Accounts />} />
            <Route path="/customer/profile" element={<Profile />} />
        </Route>

        {/* CATCH ALL - 404 PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;