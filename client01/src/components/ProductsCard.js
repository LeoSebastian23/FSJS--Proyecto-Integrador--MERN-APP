import toast from "react-hot-toast";
import { useProducts } from "../context/productsContext";
import {useNavigate} from 'react-router-dom'


export function ProductsCard({ products }) {
  const { deleteProduct} = useProducts();
  const navigate = useNavigate()
   
  const handleDelete = (_id) => { 
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Estas seguro que quieres eliminar? <strong>{_id}</strong>
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                deleteProduct(_id);
                toast.dismiss(t._id);
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-600 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };
  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black
    hover:bg-zinc-600 hover:cursor-pointer"
    onClick={() => navigate(`/products/${products._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{products.titulo}</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(products._id)}
            }
          >
            Borrar
          </button>
        </div>
        <h3 className="font-bold">{products.categoria}</h3>
        <p>{products.descripcion}</p>
        {products.imagen && <img src={products.imagen.url}/>}
        <p>${products.precio}</p>
      </div>
    </div>
  );
}
