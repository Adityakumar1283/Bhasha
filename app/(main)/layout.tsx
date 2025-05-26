import {Sidebar} from "@/components/sidebar";
import MobHeader from "@/components/MobHeader";
type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
    <MobHeader/>
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
        <div className="bg-red-500 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
