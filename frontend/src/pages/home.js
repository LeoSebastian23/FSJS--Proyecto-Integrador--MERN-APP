import { useState, useEffect } from "react";
import { useProducts } from "../context/productsContext";
import { Link } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard";
import { VscEmptyWindow } from "react-icons/vsc";
import { RingLoader } from "react-spinners"; // Loader importado de react-spinners

export function Home() {
  const { release, fetchProducts } = useProducts(); // Asegúrate de tener una función fetchProducts en el context para cargar datos
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchProducts(); // Carga los datos
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); // Cambia el estado de loading una vez los datos se han cargado o si ocurre un error
      }
    };
    
    loadData();
  }, [fetchProducts]);

  const render = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center mt-4">
          <RingLoader size={50} color="#FBBF24" /> {/* Loader con color amber */}
          <h1 className="font-semibold text-2xl text-white mt-4">
            Cargando imágenes...
          </h1>
        </div>
      );
    }

    if (release.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="font-semibold text-2xl text-white">
            No hay publicaciones aún
          </h1>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {release.map((product) => (
          <ProductsCard products={product} key={product._id} />
        ))}
      </div>
    );
  };

  return (
    <div className="text-center my-8 flex flex-col items-center">
      <h1 className="font-light text-5xl text-slate-50 shadow-1">FOTOGALERIA</h1>
      <p className="font-light text-2xl mt-4 text-slate-200 shadow-1">
        Utiliza este espacio para compartir tu publicación con todo el mundo.
      </p>
      <Link
        to="/catalogo"
        className="relative text-slate-200 font-light my-8 px-8 py-2 rounded-xl text-xl bg-slate-700 isolation-auto z-10 border-2 border-amber-400 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-400 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 hover:text-slate-800 hover:duration-700"
      >
        Ingresar Publicación
      </Link>
      <h1 className="font-light text-2xl text-slate-50">
        PUBLICACIONES ({release.length})
      </h1>
      {render()}
    </div>
  );
}

