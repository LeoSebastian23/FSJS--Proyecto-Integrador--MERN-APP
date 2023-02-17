import { Home, Catalogo, NotFound } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from './context/productsContext'
import {Toaster} from "react-hot-toast";
function App() {
  return (
    <div className="bg-neutral-700 min-h-screen flex item-center">
      <div className="px-10 container m-auto">
        <ProductsProvider >
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/catalogo" element={<Catalogo />} />{" "}
            <Route path="/products/:id" element={<Catalogo />} />{" "}
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>{" "}
        </ProductsProvider >
        <Toaster></Toaster>
      </div>
    </div>
  );
}

export default App;
