import { useProducts } from "../context/productsContext"
import { Link } from "react-router-dom"
import { ProductsCard } from "../components/ProductsCard"

export function Home() {
  const {release} = useProducts()

  if(release.lenght === 0) return (
    <div className="flex flex-col justyfy-center items-center">
      <h1>No hay publicaciones aun</h1>
    </div>
  )

  return (
    <div className="text-white">

      <Link to='/catalogo'>Ingresar Producto</Link>
    <div className="grid grid-cols-3 gap-2">
    {
      release.map(product => (
        <ProductsCard products={product} key={product._id}/>
      ))
    }
    </div>
    </div>
  )
}
