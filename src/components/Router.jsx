import { Layout } from "@/layouts/Layout";
import { CharacterDetails } from "@/pages/CharacterDetails";
import { Characters } from "@/pages/Characters";
import { EpisodeDetails } from "@/pages/EpisodeDetails";
import { Episodes } from "@/pages/Episodes";
import { Home } from "@/pages/Home";
import { LocationDetails } from "@/pages/LocationDetails";
import { Locations } from "@/pages/Locations";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  const url = "https://rickandmortyapi.com/api";
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home url={url} />} />
        <Route path="characters" element={<Characters url={url} />} />
        <Route
          path="characters/:characterId"
          element={<CharacterDetails url={url} />}
        />
        <Route path="episodes" element={<Episodes url={url} />} />
        <Route
          path="episodes/:episodeId"
          element={<EpisodeDetails url={url} />}
        />
        <Route path="locations" element={<Locations url={url} />} />
        <Route
          path="locations/:locationId"
          element={<LocationDetails url={url} />}
        />
      </Route>
    </Routes>
  );
};
