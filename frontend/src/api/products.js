const BACKEND_URL = 'https://backend-mern-app-0kdp.onrender.com'; // Dirección de tu backend en producción

export const getProductsRequests =  async() => await axios.get(`${BACKEND_URL}/products`)

export const createProductsRequests = async (product) => {
  const form = new FormData()

  for(let key in product){
    form.append(key, product[key])
  }

  return await axios.post(`${BACKEND_URL}/products`, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const deleteProductRequests = async id => await axios.delete(`${BACKEND_URL}/products/${id}`)

export const getProductRequest = async(id) => await axios.get(`${BACKEND_URL}/products/${id}`)

export const updateProductRequest = async (id, product) => await axios.put(`${BACKEND_URL}/products/${id}`, product)
