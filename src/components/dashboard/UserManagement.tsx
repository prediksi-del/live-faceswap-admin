import React from 'react';
import { ShieldCheck, MoreVertical, Ban } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const users = [
    { id: "1", name: "Rayan Developer", email: "rayan@rayanxweb.id", status: "Active", plan: "Premium" },
    { id: "2", name: "Ahmad Jamal", email: "ajm@controlpanel.net", status: "Active", plan: "Free Tier" },
    { id: "3", name: "User Dummy 03", email: "dummy@gmail.com", status: "Suspended", plan: "Free Tier" },
  ];

  return (
    <div className="w-full glass-panel border border-slate-900 rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/50 border-b border-slate-900 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            <th className="p-4">Nama Pengguna</th>
            <th className="p-4">Email</th>
            <th className="p-4">Paket</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-xs text-slate-300 divide-y divide-slate-900/60">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-white/[0.02] transition">
              <td className="p-4 font-semibold text-white">{u.name}</td>
              <td className="p-4 font-mono text-slate-400">{u.email}</td>
              <td className="p-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.plan === 'Premium' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-800 text-slate-400'}`}>
                  {u.plan}
                </span>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${u.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  {u.status}
                </span>
              </td>
              <td className="p-4 text-right flex justify-end gap-2">
                <button title="Suspend User" className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition">
                  <Ban className="w-3.5 h-3.5" />
                </button>
                <button title="More Options" className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
