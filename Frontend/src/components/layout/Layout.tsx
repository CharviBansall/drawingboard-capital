import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="h-full mt-14 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
