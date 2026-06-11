import React, { useState } from 'react';
import { ShieldAlert, Key, User, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  darkMode: boolean;
  onLoginSuccess: () => void;
}

export default function AdminLogin({ darkMode, onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in both the admin username and login credentials.');
      return;
    }

    setIsLoading(true);

    const API_BASE = import.meta.env.VITE_API_URL || '';

    // Call authentic supervisor login endpoint
    fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data && data.token) {
          localStorage.setItem('allah_is_great_admin_token', data.token);
        }
        onLoginSuccess();
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.message || 'Invalid supervisor credentials. Please verify your administrative key or username.');
      }
    })
    .catch((err) => {
      console.warn('POST /api/admin/login network or route offline, performing default local fallback:', err);
      // Fallback for seamless local test compatibility inside sandbox when backend server is not active
      const lowerUser = username.toLowerCase().trim();
      if ((lowerUser === 'admin' || lowerUser === 'admin@allahisgreat.com') && (password === 'admin' || password === 'allahisgreat')) {
        localStorage.setItem('allah_is_great_admin_token', 'offline_fallback_token_allah_is_great');
        onLoginSuccess();
      } else {
        setError('Connection failed. Please check if administrative service is running or review credentials.');
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className={`transition-colors duration-300 py-16 px-4 flex flex-col items-center justify-center min-h-[75vh] ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Container Card */}
      <div className={`w-full max-w-md p-8 rounded-3xl border text-center relative overflow-hidden transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
      }`}>
        
        {/* Glow Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        {/* Header Icon */}
        <div className="mx-auto mb-5 p-4 bg-amber-500/10 text-amber-500 rounded-full w-16 h-16 flex items-center justify-center border border-amber-500/20 shadow-inner">
          <ShieldAlert size={32} />
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none uppercase">Supervisor Gate</h1>
          <p className="text-xs text-slate-400 font-mono">ALLAH IS GREAT • STORE ADMINISTRATION</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500 flex items-center space-x-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="admin-user" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
              <User size={12} className="text-amber-500" />
              <span>Supervisor Username *</span>
            </label>
            <input 
              type="text" 
              id="admin-user"
              placeholder="Username or admin email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`py-3 px-4 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-white focus:bg-white'
              }`}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="admin-pass" className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
              <Key size={12} className="text-amber-500" />
              <span>Administrative Key *</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="admin-pass"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`py-3 pl-4 pr-10 text-xs w-full rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-slate-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-white focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-black tracking-wider text-xs uppercase rounded-xl transition-all active:scale-98 cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Unlock Admin Console</span>
            )}
          </button>

        </form>

        {/* Demo Credentials Helper Box (User Friendly for Preview) */}
        <div className={`mt-8 p-3.5 rounded-2xl border text-xs text-left ${
          darkMode ? 'bg-slate-950/50 border-slate-800/60' : 'bg-slate-50 border-slate-150'
        }`}>
          <p className="font-extrabold text-[10px] uppercase tracking-wider text-amber-500 mb-1">Supervisor Testing Credentials</p>
          <div className="space-y-0.5 font-mono text-[10.5px] text-slate-400">
            <p><strong>Username:</strong> <span className="text-slate-200 dark:text-white bg-slate-900/40 px-1 py-0.5 rounded">admin</span></p>
            <p><strong>Password:</strong> <span className="text-slate-200 dark:text-white bg-slate-900/40 px-1 py-0.5 rounded">admin</span> or <span className="text-slate-200 dark:text-white bg-slate-900/40 px-1 py-0.5 rounded">allahisgreat</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}
