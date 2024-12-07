import axios from 'axios'

export const getProductsRequests =  async() => await axios.get('/products')

export const createProductsRequests = async (product) =>{

const form = new FormData()

for(let key in product){
    form.append(key,product[key])
}

return await axios.post('/products', form, {
    headers:{
        "Content-Type": "multipart/form-data"
    }
 });
}

export const deleteProductRequests = async id => await axios.delete('/products/' + id)

export const getProductRequest = async(id) => await axios.get('/products/' + id)

export const updateProductRequest = async (id, product) => await axios.put(`/products/${id}`, product) 