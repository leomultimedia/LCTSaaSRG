'use client';
import React from 'react';
import { ArrowDownTrayIcon, ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline';

import { GDPRComplianceService } from '@/application/use_cases/GDPRComplianceService';
import { useState, useEffect } from 'react';

interface AuditLog {
  id: string;
  type: string;
  org: string;
  user_mac: string;
  status: string;
  timestamp: string;
}

const initialLogs: AuditLog[] = [
  { id: 'req_1', type: 'GDPR Export', org: 'ACME Dubai', user_mac: '00:1A:2B:3C', status: 'Completed', timestamp: '5 mins ago' },
  { id: 'req_2', type: 'UAE Data Audit', org: 'Global Retail', user_mac: '99:8A:7B:6C', status: 'In Progress', timestamp: '12 mins ago' },
  { id: 'req_3', type: 'Media Deactivation', org: 'Sovereign Bank', user_mac: 'AA:11:BB:22', status: 'Rights Executed', timestamp: '1 hr ago' },
];

export default function ComplianceDashboard() {
  const [logs, setLogs] = useState<AuditLog[]>(initialLogs);
  const [isProcessing, setIsProcessing] = useState(false);
  const complianceService = new GDPRComplianceService();

  const handleExecuteWipe = async (identifier: string, logId: string) => {
    if (!confirm(`WARING: Permanent Data Erasure for node ${identifier}. Proceed?`)) return;
    
    setIsProcessing(true);
    const success = await complianceService.executeRightToBeForgotten(identifier, 'org_123');
    
    if (success) {
      setLogs(prev => prev.map(l => l.id === logId ? { ...l, status: 'Rights Executed' } : l));
      alert(`GDPR Right to be Forgotten executed for ${identifier}. Submissions wiped.`);
    } else {
      alert("Compliance Node Failure: Database cluster unreachable.");
    }
    setIsProcessing(false);
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Compliance & Privacy Command</h1>
        <ShieldCheckIcon className="h-10 w-10 text-emerald-400 opacity-80" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Live Compliance Log</h3>
          <p className="text-slate-400 text-sm mt-1">Real-time audit trail of all data subject requests and processing events.</p>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-medium">
            <tr>
              <th className="p-5">Request Type</th>
              <th className="p-5">Organization</th>
              <th className="p-5">Identifier (MAC/IP)</th>
              <th className="p-5">Status</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition group">
                <td className="p-5 font-bold tracking-tight">{log.type}</td>
                <td className="p-5 text-blue-400 font-medium">{log.org}</td>
                <td className="p-5 font-mono text-xs text-slate-500">{log.user_mac}</td>
                <td className="p-5">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${log.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : log.status === 'In Progress' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20 animate-pulse' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-5 flex gap-4">
                  <button className="text-slate-500 hover:text-white transition transform active:scale-95"><ArrowDownTrayIcon className="h-5 w-5" /></button>
                  <button 
                    disabled={isProcessing}
                    onClick={() => handleExecuteWipe(log.user_mac, log.id)}
                    className="text-slate-500 hover:text-rose-500 transition transform active:scale-95 disabled:opacity-30"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
