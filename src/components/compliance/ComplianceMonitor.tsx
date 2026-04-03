'use client';
import React from 'react';

export const ComplianceMonitor = () => (
  <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
    <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
      <h3 className="text-white font-bold">Compliance & Audit Trail</h3>
      <div className="flex gap-2 items-center">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED PORT 443</span>
      </div>
    </div>
    <div className="p-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-slate-500">REQ_00{i}</div>
            <div className="text-sm text-slate-200 font-medium">Right to Erasure (GDPR)</div>
          </div>
          <div className="text-xs text-slate-400">Processed: 2026-04-03 12:19</div>
        </div>
      ))}
    </div>
  </div>
);

export default ComplianceMonitor;
