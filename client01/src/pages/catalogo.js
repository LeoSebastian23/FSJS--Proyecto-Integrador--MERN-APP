import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProducts } from "../context/productsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Catalogo() {
  const { createProducts, getProduct, updateProducts } = useProducts();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    titulo: "",
    descripcion: "",
    imagen: ""
  });

  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const producto = await getProduct(params.id);
        setProduct({
          titulo: producto.titulo,
          descripcion: producto.descripcion
        })
      }
    })();
  }, [params.id, getProduct]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nueva Publicacion</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            {" "}
            Volver
          </Link>
        </header>

        <Formik
          initialValues={product}
          enableReinitialize
          validationSchema={Yup.object({
            titulo: Yup.string().required("El titulo es requerido"),
            descripcion: Yup.string().required("La descripcion es requerido"),
          })}
          onSubmit={async (values, actions) => {
           
            if (params.id) {
              await updateProducts(params.id, values);
              console.log("Se actualizo");
            } else {
              await createProducts(values);
              console.log("Solo se creo");
            }
            navigate("/");
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="titulo"
                className="text-sm block font-bold text-gray-400"
              >
                Titulo
              </label>
              <Field
                name="titulo"
                placeholder="titulo"
                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="titulo"
              />

              <label
                htmlFor="descripcion"
                className="text-sm block font-bold text-gray-400"
              >
                Descripcion
              </label>
              <Field
                name="descripcion"
                placeholder="descripcion"
                component="textarea"
                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="descripcion"
              />
              <label
                htmlFor="descripcion"
                className="text-sm block font-bold text-gray-400"
              >
                Descripcion
              </label>
              
              <input
                type="file"
                name="imagen"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange = {(e) => setFieldValue('imagen',e.target.files[0])}
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white focus:outline-none disabled:bg-indigo-400 "
              >
                Guardar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
