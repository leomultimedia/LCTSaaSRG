'use client';
import React, { useState } from 'react';
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';

const plans = [
  { id: 'starter', name: 'Starter', price: 29, forms: 5, period: 'Monthly', features: ['5 Dynamic Forms', 'Basic Analytics', 'Standard Webhooks'] },
  { id: 'pro', name: 'Professional', price: 79, forms: 10, period: 'Monthly', features: ['10 Dynamic Forms', 'Full Funnel Mapping', 'Multi-tenant Support'] },
  { id: 'business', name: 'Business', price: 199, forms: 50, period: 'Monthly', features: ['50 Dynamic Forms', 'Priority CRM Sync', 'LiteLLM Suggestions'] },
  { id: 'unlimited', name: 'Enterprise', price: 499, forms: 'Unlimited', period: 'Monthly', features: ['Unlimited Surveys', 'Custom Domain', '24/7 Priority Support'], popular: true },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  return (
    <main className="dark min-h-screen bg-slate-950 p-8 pt-20 text-white font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
             Choose Your Power Plan
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Scale your research methodology effortlessly. From early-stage customer discovery back-ends to global-scale enterprise assessments.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
             <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
                <button className="px-6 py-2 rounded-full bg-blue-600 text-sm font-bold shadow-lg shadow-blue-500/20">Monthly</button>
                <button className="px-6 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-white transition">Yearly (-20%)</button>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={`group relative rounded-3xl border ${plan.popular ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/50' : 'border-white/10 bg-white/5'} p-8 backdrop-blur-3xl transition hover:scale-105 duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-[10px] font-black uppercase px-4 py-1 rounded-full flex items-center gap-1">
                  <StarIcon className="h-3 w-3" /> Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">${plan.price}</span>
                <span className="text-xs text-slate-500">/{plan.period.toLowerCase()}</span>
              </div>
              <p className="mt-2 text-xs text-blue-400 font-mono uppercase tracking-widest">{plan.forms} Forms Included</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckIcon className={`h-5 w-5 ${plan.popular ? 'text-blue-400' : 'text-slate-500'}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setSelectedPlan(plan.id)}
                className={`mt-10 w-full rounded-2xl py-4 font-bold text-sm transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30' : 'bg-white/10 hover:bg-white/20'}`}
              >
                {selectedPlan === plan.id ? 'Active Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl border border-white/5 bg-white/2 p-12 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Enterprise Custom Settings</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm">
                 Need 500+ forms? Bespoke 3-month or 6-month quarterly billing? Our system admin panel allows granular configuration for high-traffic Dubai enterprise clusters.
              </p>
              <button className="px-10 py-4 rounded-full border border-blue-500/30 text-blue-400 text-sm font-bold hover:bg-blue-500/10 transition">
                 Speak with Admin
              </button>
           </div>
        </section>
      </div>
    </main>
  );
}
