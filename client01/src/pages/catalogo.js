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
    imagen: "",
  });

  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const producto = await getProduct(params.id);
        setProduct({
          titulo: producto.titulo,
          descripcion: producto.descripcion,
        });
      }
    })();
  }, [params.id, getProduct]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 shadow-black">
        <header className="flex justify-between items-center  py-4 text-white">
          <h3 className="text-3xl font-bold text-gray-200 mb-4">
            Nueva Publicación
          </h3>
          <Link to="/" className="text-gray-400 text-md font-bold hover:text-gray-100">
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
              console.log("Se creo");
            }
            navigate("/");
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <label
                htmlFor="titulo"
                className=" flextext-md font-semibold text-gray-200"
              >
                {/* Titulo */}
              </label>
              <Field
                name="titulo"
                placeholder="Titulo"
                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full mb-4 rounded-lg focus:bg-gray-600 focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm pb-5"
                name="titulo"
              />

              <label
                htmlFor="descripcion"
                className="text-md font-semibold text-gray-200"
              >
                {/* Descripcion */}
              </label>
              <Field
                name="descripcion"
                placeholder="Descripcion"
                component="textarea"
                className="px-3 py-2 focus:outline-none bg-gray-600 text-white w-full 00 mb-4 rounded-lg focus:bg-gray-600 focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm pb-5"
                name="descripcion"
              />
              <label for="file" class="custum-file-upload">
                <div class="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div class="text">
                  <span>Click to upload imagen</span>
                  <input
                    id="file"
                    type="file"
                    className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                    onChange={(e) => setFieldValue("imagen", e.target.files[0])}
                  ></input>
                </div>
              </label>

              {/* <label
                htmlFor="descripcion"
                className="text-sm block font-bold text-gray-400 "
              >
                Descripcion
              </label>
              
              <input
                type="file"
                name="imagen"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange = {(e) => setFieldValue('imagen',e.target.files[0])}
              /> */}

              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Añadir publicación
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
