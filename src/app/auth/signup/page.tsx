'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon, CubeTransparentIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup success and redirect to business dashboard
    alert(`Success! Organization '${orgName}' has been provisioned on the InsightFlow cluster.`);
    router.push('/dashboard/business');
  };

  return (
    <main className="dark min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-slate-950 font-sans antialiased">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-6 group transition hover:scale-110">
            <RocketLaunchIcon className="h-10 w-10 text-blue-400 group-hover:text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Join the Intelligence Era</h1>
          <p className="text-slate-500 mt-2">Provision your tenant on World-Class Infrastructure.</p>
        </div>

        <form onSubmit={handleSignup} className="rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur-3xl shadow-2xl space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Organization Name</label>
            <input 
              required
              placeholder="e.g. Acme Dubai Corp"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Corporate Email</label>
            <input 
              required
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-start bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
            <ShieldCheckIcon className="h-5 w-5 text-blue-400 shrink-0" />
            <p className="text-[10px] text-slate-400 leading-relaxed">
              By signing up, you agree to the <span className="text-blue-400">Master Service Agreement</span> and our strict GDPR/ISO compliance protocols.
            </p>
          </div>

          <button type="submit" className="w-full rounded-2xl bg-blue-600 py-4 font-black uppercase tracking-widest text-sm text-white hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition transform active:scale-95">
             Provision Tenant Cluster
          </button>
        </form>

        <div className="mt-12 grid grid-cols-2 gap-4">
           <div className="p-4 rounded-2xl border border-white/5 bg-white/1 text-center">
              <CubeTransparentIcon className="h-5 w-5 text-slate-600 mx-auto mb-2" />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Multi-tenant Cloud</p>
           </div>
           <div className="p-4 rounded-2xl border border-white/5 bg-white/1 text-center">
              <ShieldCheckIcon className="h-5 w-5 text-slate-600 mx-auto mb-2" />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Encrypted Nodes</p>
           </div>
        </div>
      </div>
    </main>
  );
}
