import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
