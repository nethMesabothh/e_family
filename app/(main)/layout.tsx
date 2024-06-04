import { Header } from "@/components/headers/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
