import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { UserManagement } from '@/components/dashboard/UserManagement';

export default function UsersAdminPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex">
      <Sidebar currentTab="users" setCurrentTab={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Database User Registry</h3>
          <UserManagement />
        </main>
      </div>
    </div>
  );
}
