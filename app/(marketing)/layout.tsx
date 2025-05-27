type Props = {
  children: React.ReactNode;
};
import { Footer } from "./footer";
import {Header }from "./header";
const layout = ({ children, }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header/>
      <main className=" flex-1 flex flex-col items-center justify-center">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default layout;
