import SideNav from "@/components/adminComponents/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-y-hidden md:relative">
      <div className="w-full flex-none md:w-64 md:sticky md:top-0 md:h-screen">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto p-2 md:p-8 ">
        {children}
      </div>
    </div>
  );
}
