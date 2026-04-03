'use client';
import React from 'react';
import { ArrowDownTrayIcon, ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline';

const reportLogs = [
  { id: 1, type: 'GDPR Export', org: 'CompanyA', user_mac: '00:1A:2B:3C', status: 'Completed', timestamp: '5 mins ago' },
  { id: 2, type: 'UAE Data Audit', org: 'CompanyB', user_mac: '99:8A:7B:6C', status: 'In Progress', timestamp: '12 mins ago' },
  { id: 3, type: 'Media Deletion', org: 'CompanyC', user_mac: 'AA:11:BB:22', status: 'Rights Executed', timestamp: '1 hr ago' },
];

export default function ComplianceDashboard() {
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
            {reportLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition">
                <td className="p-5 font-medium">{log.type}</td>
                <td className="p-5 text-blue-300">{log.org}</td>
                <td className="p-5 font-mono text-xs">{log.user_mac}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${log.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-5 flex gap-3">
                  <button className="text-slate-400 hover:text-white"><ArrowDownTrayIcon className="h-5 w-5" /></button>
                  <button className="text-slate-400 hover:text-rose-400"><TrashIcon className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
