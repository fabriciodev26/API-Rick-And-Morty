import { Layout } from "@/layouts/Layout";
import { Characters } from "@/pages/Characters";
import { Episodes } from "@/pages/Episodes";
import { Home } from "@/pages/Home";
import { Locations } from "@/pages/Locations";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  const url = "https://rickandmortyapi.com/api";
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters url={url} />} />
        <Route path="episodes" element={<Episodes url={url} />} />
        <Route path="locations" element={<Locations url={url} />} />
      </Route>
    </Routes>
  );
};
