import toast from "react-hot-toast";
import { useProducts } from "../context/productsContext";
import { useNavigate } from "react-router-dom";

export function ProductsCard({ products }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const handleDelete = (_id) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center justify-center">
          <p className="text-white font-semibold text-xl m-4">
            Estas seguro que quieres eliminar la publicación? {" "}
          </p>{" "}
          {/* <strong> {_id} </strong> */}
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                deleteProduct(_id);
                toast.dismiss(t._id);
              }}
            >
              Eliminar{" "}
            </button>{" "}
            <button
              className="bg-slate-700 hover:bg-slate-600 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar{" "}
            </button>{" "}
          </div>{" "}
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

    <div className="px-4 py-7 my-10 bg-zinc-700 flex justify-center text-white rounded-sm shadow-md shadow-black hover:bg-zinc-500 hover:cursor-pointer m-8"
       onClick={() => navigate(`/products/${products._id}`)}>
      <div className="cardIMG">
        {" "}
        {products.imagen && <img src={products.imagen.url} alt="" />}
        <div className="cardIMG__content">
          <p className="cardIMG__title"> {products.titulo}</p>{" "}
          <p className="cardIMG__description">
          {products.descripcion}{" "}
          </p>{" "}
          <button
                    className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(products._id)}
                    }
                  >
                    Borrar
                  </button>
        </div>{" "}
      </div>
    </div>
  );
}
