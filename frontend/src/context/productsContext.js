import { useState, createContext, useContext, useEffect } from "react";
import {
  createProductsRequests,
  deleteProductRequests,
  getProductRequest,
  getProductsRequests,
  updateProductRequest,
} from "../api/products";

const productContext = createContext(); // asignamos createContext a una variable

export const useProducts = () => {
  const context = useContext(productContext);
  return context;
}; // Funcione que genera el contexto y lo retorna

export const ProductsProvider = ({ children }) => {
  const [release, setRelease] = useState([]); // Creamos los productos

  const getProducts = async () => {
    try {
      const res = await getProductsRequests(); //realizamos la peticion a la api
      setRelease(res.data); // lo guardamos en Release
    } catch (error) {
      console.log(error);
    }
  };

  const createProducts = async (product) => {
    const res = await createProductsRequests(product);
    setRelease([...release, res.data]);
  };

  const deleteProduct = async (id) => {
    await deleteProductRequests(id);
    setRelease(release.filter((release) => release._id !== id));
  };

  const getProduct = async (id) => {
    const res = await getProductRequest(id);
    return res.data;
  };

  const updateProducts = async (id, product) => {
    const res = await updateProductRequest(id, product);
    console.log(res);
    setRelease(
      release.map((release) => (release._id === id ? res.data : release))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <productContext.Provider
      value={{
        release: release,
        getProducts: getProducts,
        createProducts: createProducts,
        deleteProduct: deleteProduct,
        getProduct: getProduct,
        updateProducts: updateProducts,
      }}
    >
      {children}{" "}
    </productContext.Provider>
  );
};
