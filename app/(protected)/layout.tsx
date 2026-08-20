import { Sidebar } from "@/components/navigation/Sidebar";
import { TopBar } from "@/components/navigation/TopBar";
import { MobileNav } from "@/components/navigation/MobileNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Sidebar />
      <div className="flex-1 md:ml-64 pb-16 md:pb-0 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
