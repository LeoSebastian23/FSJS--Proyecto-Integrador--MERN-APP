import { useState, useEffect } from "react";
import { useProducts } from "../context/productsContext";
import { Link } from "react-router-dom";
import { ProductsCard } from "../components/ProductsCard";
//import { VscEmptyWindow } from "react-icons/vsc";
import { MoonLoader } from "react-spinners"; // Loader importado de react-spinners

export function Home() {
  const { release, getProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [slowLoading, setSlowLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Si pasan más de 3 segundos, mostrar el mensaje de espera
        const timeout = setTimeout(() => setSlowLoading(true), 3000);

        await getProducts();
        clearTimeout(timeout);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
        setSlowLoading(false);
      }
    };

    loadData();
  }, [getProducts]);

  const render = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center mt-4">
          <MoonLoader size={50} color="#FBBF24" />
          <h1 className="font-semibold text-2xl text-white mt-4">
            Cargando imágenes...
          </h1>
          {slowLoading && (
            <p className="text-gray-300 mt-2 text-sm">
              Esperando conexión con el servidor... Puede tardar un momento.
            </p>
          )}
        </div>
      );
    }

    // Ahora solo mostramos "No hay publicaciones aún" si la carga ya terminó
    if (!loading && release.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center mt-4">
        <MoonLoader size={50} color="#FBBF24" />
        <h1 className="font-semibold text-2xl text-white mt-4">
          Cargando imágenes...
        </h1>
        {slowLoading && (
          <p className="text-gray-300 mt-2 text-sm">
            Esperando conexión con el servidor... Puede tardar un momento.
          </p>
        )}
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



