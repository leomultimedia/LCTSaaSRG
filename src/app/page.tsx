import MethodologyBuilder from '@/components/methodology/MethodologyBuilder';
import MethodologyCanvas from '@/components/methodology/MethodologyCanvas';
import ComplianceMonitor from '@/components/compliance/ComplianceMonitor';
import RealtimeTraffic from '@/components/dashboard/RealtimeTraffic';

export default function Home() {
  return (
    <main className="dark min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-8 text-white space-y-12 antialiased">

      <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            InsightFlow
          </h1>
          <p className="text-slate-400 mt-2">Next-Gen Enterprise SaaS Assessment Command Center</p>
        </div>
        <div className="flex gap-4">
          <a href="/assessment/demo" className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition">
            Preview Assessment Engine
          </a>
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-emerald-400 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <RealtimeTraffic />
         <ComplianceMonitor />
      </div>

      <section>
        <MethodologyBuilder />
      </section>

      <section>
        <MethodologyCanvas />
      </section>

      <section>
        <ComplianceMonitor />
      </section>
      
    </main>
  );
}
