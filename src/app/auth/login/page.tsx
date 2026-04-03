'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon, ShieldCheckIcon, CubeTransparentIcon, UserGroupIcon, IdentificationIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Success! Authentication cluster granted access for ${role === 'admin' ? 'Enterprise Principal' : 'Regional Delegate'}.`);
    router.push('/');
  };

  return (
    <main className="dark min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-slate-950 font-sans antialiased">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-6 group transition hover:scale-110">
            <CubeTransparentIcon className="h-10 w-10 text-blue-400 group-hover:text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Enterprise Sovereignty Access</h1>
          <p className="text-slate-500 mt-2 font-medium">Log in to your local research cluster.</p>
        </div>

        <div className="mb-10 flex gap-2 bg-white/5 p-1 rounded-3xl border border-white/10">
          <button 
            onClick={() => setRole('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-xl ${role === 'admin' ? 'bg-blue-600 shadow-blue-500/20 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <ShieldCheckIcon className="h-4 w-4" /> Enterprise Admin
          </button>
          <button 
            onClick={() => setRole('user')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-xl ${role === 'user' ? 'bg-blue-600 shadow-blue-500/20 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <UserGroupIcon className="h-4 w-4" /> Regional Delegate
          </button>
        </div>

        <form onSubmit={handleLogin} className="rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur-3xl shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><IdentificationIcon className="h-20 w-20 text-blue-400" /></div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Corporate Identity (SSO/AD)</label>
            <input 
              required
              placeholder="id.node@acme.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none transition shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Cluster Key (Encrypted)</label>
            <input 
              required
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none transition shadow-inner"
            />
          </div>

          <button type="submit" className="w-full rounded-2xl bg-blue-600 py-4 font-black uppercase tracking-widest text-sm text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition transform active:scale-95">
             Authenticate Cluster Access
          </button>

          <div className="pt-6 border-t border-white/5 text-center">
             <button type="button" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-blue-400 flex items-center justify-center mx-auto gap-2 group">
                <GlobeAltIcon className="h-4 w-4 group-hover:animate-spin" /> Active Directory (AD) / Azure Sync
             </button>
          </div>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-600 uppercase font-black tracking-widest">
           Sovereign Node Proxy: <span className="text-white">Active</span> • ISO/IEC 27001 Protocol
        </p>
      </div>
    </main>
  );
}
