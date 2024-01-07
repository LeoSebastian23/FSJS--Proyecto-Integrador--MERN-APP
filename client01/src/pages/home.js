import { useProducts } from "../context/productsContext"
import { Link } from "react-router-dom"
import { ProductsCard } from "../components/ProductsCard"

export function Home() {
  const {release} = useProducts()

  if(release.lenght === 0) return (
    <div className="flex flex-col justyfy-center items-center">
      <h1 className="font-semibold text-2xl text-white">No hay publicaciones aun</h1>
    </div>
  )

  return (
    <div className="text-center my-8 flex flex-col items-center">
      <h1 className="font-semibold text-5xl text-slate-50" > GALERIA DE PUBLICACIONES </h1>
      <Link to='/catalogo' className="relative text-slate-200 my-8 px-8 py-2 rounded-xl font-semibold text-xl bg-slate-700 isolation-auto z-10 border-2 border-amber-400 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-amber-400 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 hover:text-slate-800 hover:duration-700"
      > Ingresar Publicación</Link>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
    {
      release.map(product => (
        <ProductsCard products={product} key={product._id}/>
      ))
    }
    </div>
    </div>
  )
}
