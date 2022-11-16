import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./layouts";
import { About, ErrorPage, Home, Product } from "./pages";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}
